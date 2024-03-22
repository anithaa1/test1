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
const jwt=require("jsonwebtoken")
const path = require('path');
//const { refreshToken } = require('../../model');
const filePath = path.join(__dirname, '..', 'views', 'forgot.html');

const auth = {};

//register
auth.register = async (req, res, next) => {
  try {
 
    const { firstName,lastName,email, password,phoneNumber,dob } = req.body;
    console.log("vgy",req.body);
    const emailExist = await authService.checkUser(email)
    console.log("exist",emailExist);
 // if no user exist
 if (emailExist) {
  return res.status(401).json({ status: 'Error', message: rescodes?.emailExist });

}else{
 // Generate access token for the new user
        const user = { email: email };
        const accessToken = Token.generateAccessToken(user);
//Create a new user record with hashed password
        const hashedPassword = await hash.encryptPassword(password);
        
      const newUser = await authService.createUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        phoneNumber: phoneNumber,
        dob: dob ,
        accessToken: accessToken,
       // refreshToken:refreshToken
      })

     //return res.status(201).json({ status: 'Success', message: 'User registered successfully' });
     res.response = { code: 201,data: { status: 'success',message: rescodes?.regSuc } } 
     return next();                   
                 
              }} catch (error) {
           console.error('Error occurred during user registration:', error);
                 
    //return res.status(500).json({ status: 'Error', message: 'An error occurred during user registration' });
    res.response = { code: 500, data: { status: 'Error', message: rescodes?.wentWrong  } };
    return next();
             
               }
          };    
          auth.loginUser = async (req, res, next) => {
            try {
              const { email, password } = req.body;
              console.log("req.body", req.body);
              
              // Check if the user exists
              const userExist = await authService.checkUser(email);
          
              // If user doesn't exist
              if (!userExist) {
                res.response = {
                  code: 401,
                  data: { status: 'Error', message: rescodes?.emailNExist },
                };
                return next();
              }
          
              // If the user is not active
              if (!userExist.isActive) {
              res.response = {
                  code: 404,
                  data: { status: 'Error', message: rescodes?.inActiveUsr },
                };
                return next();
              }
          
              // Check if the password is valid
              const isPasswordValid = await hash.decryptPassword(password, userExist.password);
              console.log("isPasswordValid", isPasswordValid);
              
              if (!isPasswordValid) {
                res.response = {
                  code: 401,
                  data: { status: 'Error', message: rescodes?.checkCred },
                };
                return next();
              }
          
              // Generate a refresh token
              const user = { email: userExist.email };
              const refreshToken = Token.generateRefreshToken(user, config?.app?.REFRESH_TOKEN);
              console.log("refreshToken", refreshToken);
          
              // Save the refresh token
              const refService = await authService.saveRefreshToken(refreshToken);
          
              res.response = {
                code: 200,
                data: {
                  status: 'Ok',
                  message: rescodes?.loginSuc,
                  refreshToken: refreshToken, 
                },
              };
              return next();
            } catch (err) {
              console.error('Error occurred during user login:', err);
              res.response = {
                code: 500,
                data: { status: 'Error', message: rescodes?.wentWrong },
              };
              return next();
            }
          };
          
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
   if (!data ) {     res.response = { code: 400, data: { status: 'Error', message: rescodes?.invalidToken } };
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
    if (!datas ) {     res.response = { code: 400, data: { status: 'Error', message: rescodes?.invalidToken } };
    return next();
  }
const email = datas;
const getUser = await authService.checkUser(email)
getUser.isActive = false;
getUser.accessToken = null;
// getUser.refreshtoken = null;
  var data = await getUser.save();
  console.log("out",data);
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
