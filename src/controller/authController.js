const authService = require('../services/authServices');
const config = require('../config/var');
const logger = require('../config/logger');
//const { v4: uuidv4 } = require('uuid');
const rescodes = require('../utils/rescode');
const Token = require('../middleware/token');
const hash = require("../middleware/hashPassword")
const { smtpTransport } = require('../utils/email')
const handlebars = require('handlebars')
const fs = require('fs')
const jwt = require("jsonwebtoken")
const path = require('path');
//const { refreshToken } = require('../../model');
const filePath = path.join(__dirname, '..', 'views', 'forgot.html');

const auth = {};

//register


auth.register = async (req, res, role) => {
  console.log("Role:", role);
  try {
    const { firstName, lastName, email, password, phoneNumber, dob } = req.body;
    console.log("Request Body:", req.body);

    // Check if the email already exists
    const emailExist = await authService.checkUser(email);
    console.log("Does email exist:", emailExist);

    // If user exists, return error
    if (emailExist) {
      return res.status(401).json({ status: 'Error', message: 'Email already exists' });
    } else {
      // Generate access token for the new user
      const user = { email };
      const accessToken = Token.generateAccessToken(user);

      // Create a new user record with hashed password
      const hashedPassword = await hash.encryptPassword(password);

      const newUser = await authService.createUser({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phoneNumber,
        dob,
        accessToken,
        role
      });

      // Return success response
      return res.status(201).json({ status: 'Success', message: 'User registered successfully' });
    }
  } catch (error) {
    console.error('Error occurred during user registration:', error);
    // Return error response
    return res.status(500).json({ status: 'Error', message: 'An error occurred during user registration' });
  }
};



auth.loginUser = async (req, res, role) => {
  console.log("Role:", role);
  try {
    const { email, password } = req.body;
    console.log("Request Body:", req.body);

    // Check if the user exists
    const userExist = await authService.checkUser(email);
    console.log("userExist", userExist);

    // If user doesn't exist
    if (!userExist) {
      return res.status(401).json({ status: 'Error', message: 'Email is not registered' });
    }

    // We will check if the user is logging in via the correct role
    if (userExist.role !== role) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
        success: false,
      });
    }

    // If the user's account is inactive
    if (!userExist.isActive) {
      return res.status(500).json({ status: 'Error', message: 'Your account is currently inactive' });
    }

    // Check if the password is valid
    const isPasswordValid = await hash.decryptPassword(password, userExist.password);
    console.log("isPasswordValid", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(500).json({ status: 'Error', message: 'Incorrect credentials' });
    }

    let refreshToken = ''; // Declare refreshToken variable
    if (isPasswordValid) {
      const tokenPayload = {
        id: userExist.id,
        role: userExist.role,
        name: `${userExist.firstName} ${userExist.lastName}`,
        email: userExist.email,
      };

      refreshToken = Token.generateRefreshToken(tokenPayload, config.app.REFRESH_TOKEN);
      console.log("Refresh Token:", refreshToken);
    }

    // Construct the response object
    const result = {
      name: `${userExist.firstName} ${userExist.lastName}`,
      role: userExist.role,
      email: userExist.email,
      token: `Bearer ${refreshToken}`,
      expiresIn: "5 days", // Assuming 5 days for expiration
    };

    // Send the response
    return res.status(200).json({ status: 'Success', data: result });
  } catch (error) {
    console.error('Error occurred during user login:', error);
    return res.status(500).json({ status: 'Error', message: 'Something went wrong' });
  }
};





auth.getuser = async (req, res, next) => {
  const userId = req.id
  let user;
  try {
    user = await db.user.findById(userId, "password")

  } catch (err) {
    console.log(err)
    return err
  }
  if (!user) {
    res.response = {
      code: 404,
      data: { status: 'Error', message: "user not found" },
    };
    return res.status(200).json({ user });
  }


}

const readHTMLFile = (path, callback) => {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      throw err;
    } else {
      callback(null, html);
    }
  });
}
auth.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req?.body || {};
    // Check if user exists
    const userExist = await authService.checkUser(email);

    // If user is inactive
    if (!userExist || !userExist.isActive) {
      res.response = {
        code: 404,
        data: { status: 'Error', message: rescodes?.inActiveUsr },
      };
      return next();
    }
    // Update reset code with user Id
    readHTMLFile(filePath, function (err, html) {
      if (err) {
        console.error(err);
        res.response = {
          code: 500,
          data: { status: 'Error', message: rescodes?.wentWrong },
        };
        return next();
      }

      const template = handlebars.compile(html);
      const replacements = {
        link: `${process.env.BASEURL}/#/reset-password?token=${Token}`,//token
        firstname: userExist.firstname,
        lastname: userExist.lastname,
      };
      const htmlToSend = template(replacements);
      const mailOptions = {
        to: req.body.email,
        from: "anitha@gmail.com",
        subject: "Please Change or reset your password.",
        html: htmlToSend
      };
      smtpTransport.sendMail(mailOptions).then(response => {
        console.log("Email sent successfully", response)
        res.response = {
          code: 200,
          data: { status: 'Success', message: rescodes?.resetMail },
        };
        return next();
      }).catch(error => {
        console.error(error);
        res.response = {
          code: 400,
          data: { status: 'Error', message: rescodes?.invald },
        };
        return next();
      });
    });
  } catch (err) {
    console.error(err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.wentWrong },
    };
    return next();
  }
};

//
// API to reset password
auth.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    console.log("req.body", req.body);
    // Verify token

    // Verify token
    const data = await Token.verifyAccessToken(token);
    console.log("Verifying token: ", data);
    if (!data) {
      res.response = { code: 400, data: { status: 'Error', message: rescodes?.invalidToken } };
      return next();
    }
    const email = data; // Extract email from token payload
    // Encrypt new password
    const hashedPassword = await hash.encryptPassword(newPassword);
    console.log("hased password", hashedPassword);
    const getUser = await authService.checkUser(email)
    getUser.password = hashedPassword
    await getUser.save()
    res.response = { code: 200, data: { status: 'Success', message: rescodes?.passwordReset } };
    return next();
  } catch (error) {
    console.error('Error occurred during password reset:', error);
    res.response = { code: 500, data: { status: 'Error', message: rescodes?.wentWrong } };
    return next();
  }
};
//logout
auth.logOut = async (req, res, next) => {
  const { token } = req.body;
  console.log("token", token);
  if (!token) {
    res.response = {
      code: 400,
      data: { status: 'Error', message: rescodes?.reqFields },
    };
    return next();
  }

  try {
    const datas = await Token.verifyAccessToken(token);
    if (!datas) {
      res.response = { code: 400, data: { status: 'Error', message: rescodes?.invalidToken } };
      return next();
    }
    const email = datas;
    const getUser = await authService.checkUser(email)
    getUser.isActive = false;
    getUser.accessToken = null;
    // getUser.refreshtoken = null;
    var data = await getUser.save();
    console.log("out", data);
    res.response = {
      code: 200,
      data: { status: 'Ok', message: rescodes?.logout },
    };
    return next();

  } catch (err) {
    console.error('Error occurred during logout:', err);
    res.response = {
      code: 500,
      data: { status: 'Error', message: rescodes?.wentWrong },
    };
    return next();
  }
};


module.exports = auth;
