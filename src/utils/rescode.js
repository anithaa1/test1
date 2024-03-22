const rescodes = {
    wentWrong: {
      codes: 'wentWrong',
      value: 'Something Went Wrong',
      html: 'Something Went Wrong',
    },
    success: {
      codes: 'success',
      value: 'Success!',
      html: 'Success!',
    },
    error: {
      codes: 'error',
      value: 'Error!',
      html: 'Error!',
    },
    notFound: {
      codes: 'notFound',
      value: 'Page not Found',
      html: 'Page not Found',
    },
    reqFields: {
      codes: 'reqFields',
      value: 'Required fields not present',
      html: 'Required fields not present',
    },
    checkCred: {
      codes: 'checkCred',
      value: 'Incorrect Credentials.',
      html: 'Incorrect Credentials.',
    },
    passNM: {
      codes: 'passNM',
      value: 'Password Not Match',
      html: 'Password Not Match',
    },
    planC: {
      codes: 'planC',
      value: 'Plan Created Successfully',
      html: 'Plan Created Successfully',
    },
    recordNM: {
      codes: 'recordNM',
      value: 'Records do not match. Please try again.',
      html: 'Records do not match.\nPlease try again.',
    },
    userC: {
      codes: 'userC',
      value: 'User added successfully',
      html: 'User added successfully',
    },
    userNC: {
      codes: 'userNC',
      value: 'User Not Created',
      html: 'User Not Created',
    },
    planNC: {
      codes: 'planNC',
      value: 'Plan Not Created',
      html: 'Plan Not Created',
    },
    Inactive: {
      codes: 'Inactive',
      value: 'Cant Send Email. Your Account is Inactive. Kindly contact the Administrator.',
      html: 'Cant Send Email\nYour Account is Inactive. Kindly contact the Administrator.',
    },
    mailSentF: {
      codes: 'mailSentF',
      value: 'Email sent successfully. Please check your Inbox for instructions.',
      html: 'Email sent successfully\nEmail sent successfully. Please check your Inbox for instructions.',
    },
    passwordReset: {
      codes: 'passwordReset',
      value: 'Password reset successfully. Please check your email to set a new password.',
      html: 'Password reset successfully.<br>Please check your email to set a new password.'
    },
    passRS: {
      codes: 'passRS',
      value: 'Password Reset Successfully',
      html: 'Password Reset Successfully',
    },
    pageInval: {
      codes: 'pageInval',
      value: 'PageId is Invalid',
      html: 'PageId is Invalid',
    },
    logout: {
      codes: 'logout',
      value: 'Logout Successfully.',
      html: 'Logout Successfully.',
    },
    tokenAldel: {
      codes: 'tokenAldel',
      value: 'Token already deleted.',
      html: 'Token already deleted.',
    },
    regSuc: {
      codes: 'regSuc',
      value: 'register Successfully.',
      html: 'register Successfully.',
    },
    loginSuc: {
      codes: 'loginSuc',
      value: 'Login Successfully.',
      html: 'Login Successfully.',
    },
    
    noPlan: {
      codes: 'noPlan',
      value: 'No Plan Available',
      html: 'No Plan Available',
    },
    unauthUser: {
      codes: 'unauthUser',
      value: 'Unauthorized User',
      html: 'Unauthorized User',
    },
    noUser: {
      codes: 'noUser',
      value: 'Active/no Exist User',
      html: 'Active/no Exist User',
    },
    profUpdateS: {
      codes: 'profUpdateS',
      value: 'User Profile Updated Successfully',
      html: 'User Profile Updated Successfully',
    },
    planExist: {
      codes: 'planExist',
      value: 'Plan name already exists',
      html: 'Plan name already exists',
    },
    planComExist: {
      codes: 'planComExist',
      value: 'The selected combination already has an existing plan. Please choose a different combination',
      html: 'The selected combination already\nhas an existing plan\nPlease choose a different combination',
    },
    inCorrectPass: {
      codes: 'inCorrectPass',
      value: 'Login Password entered is incorrect',
      html: 'Login Password entered is\nincorrect',
    },
    noCards: {
      codes: 'noCards',
      value: 'No Cards available for particular user',
      html: 'No Cards available for particular user',
    },
    noSupType: {
      codes: 'noSupType',
      value: 'No Support Type available',
      html: 'No Support Type available',
    },
    someSupType: {
      codes: 'someSupType',
      value: 'Some Support Types not available',
      html: 'Some Support Types not available',
    },
    noPlanType: {
      codes: 'noPlanType',
      value: 'No Plan Type available',
      html: 'No Plan Type available',
    },
    noOrg: {
      codes: 'noOrg',
      value: 'No Organization exist/active',
      html: 'No Organization exist/active',
    },
    noPlanOrg: {
      codes: 'noPlanOrg',
      value: 'No Active Plan for given organization',
      html: 'No Active Plan for given organization',
    },
    inActPlan: {
      codes: 'inActPlan',
      value: 'No Active Plan/Plan Exist',
      html: 'No Active Plan/Plan Exist',
    },
    checkDates: {
      codes: 'checkDates',
      value: 'Plan Start Date & End Date are not matching mentioned Plans',
      html: 'Plan Start Date & End Date are not matching mentioned Plans',
    },
    orgPlanExist: {
      codes: 'orgPlanExist',
      value: 'Plan Already Exist for Organization',
      html: 'Plan Already Exist for Organization',
    },
    orgPlanNA: {
      codes: 'orgPlanNA',
      value: 'No Active/Expired Plan found for given Organisation',
      html: 'No Active/Expired Plan found for given Organisation',
    },
    noBlockOrg: {
      codes: 'noBlockOrg',
      value: 'No Blocked Plan found for given Organisation',
      html: 'No Blocked Plan found for given Organisation',
    },
    cronSus: {
      codes: 'cronSus',
      value: 'Cron set Successfully at 12.05 AM IST Everyday',
      html: 'Cron set Successfully at 12.05 AM IST Everyday',
    },
    noPlanCafirm: {
      codes: 'noPlanCafirm',
      value: 'No Plan found for given organization',
      html: 'No Plan found for given organization',
    },
    inActUpgPlan: {
      codes: 'inActUpgPlan',
      value: 'No Active Plan/Plan Exist for Upgrade',
      html: 'No Active Plan/Plan Exist for Upgrade',
    },
    samePlan: {
      codes: 'samePlan',
      value: 'Current Plan & Upgrade Plan are Same',
      html: 'Current Plan & Upgrade Plan are Same',
    },
    payModeNF: {
      codes: 'payModeNF',
      value: 'Payment mode not found',
      html: 'Payment mode not found',
    },
    noPlanAvl: {
      codes: 'noPlanAvl',
      value: 'No Plan Exist for given organization',
      html: 'No Plan Exist for given organization',
    },
    noPlanEx: {
      codes: 'noPlanEx',
      value: 'Blocked/No Plan Exist for given organization. Also,Please check firm end-date.',
      html: 'Blocked/No Plan Exist for given organization. Also,Please check firm end-date.',
    },
    sameDate: {
      codes: 'sameDate',
      value: 'Current End-Date & New End-Date are Same',
      html: 'Current End-Date & New End-Date are Same',
    },
    moduleNExist: {
      codes: 'moduleNExist',
      value: 'No Such Module Exist',
      html: 'No Such Module Exist',
    },
    emailNExist: {
      codes: 'emailNExist',
      value: 'No Such Email Exist',
      html: 'No Such Email Exist',
    },
    emailExist: {
      codes: 'emailExist',
      value: 'Email Already Exist',
      html: 'Email Already Exist',
    },
    roleNExist: {
      codes: 'roleNExist',
      value: 'No Such Role Exist',
      html: 'No Such Role Exist',
    },
    groupNExist: {
      codes: 'groupNExist',
      value: 'No Such Group Exist',
      html: 'No Such Group Exist',
    },
    featureCombExist: {
      codes: 'featureCombExist',
      value: 'Same features already exist in diffent roles',
      html: 'Same features already exist in different roles',
    },
    roleCreated: {
      codes: 'roleCreated',
      value: 'The Role Created Successfully',
      html: 'The Role Created Successfully',
    },
    featureExist: {
      codes: 'featureExist',
      value: 'Features Already Exist',
      html: 'Features Already Exist',
    },
    featuresAdd: {
      codes: 'featuresAdd',
      value: 'Features Added Successfully',
      html: 'Features Added Successfully',
    },
    moduleExist: {
      codes: 'moduleExist',
      value: 'Modules Already Exist',
      html: 'Modules Already Exist',
    },
    groupExist: {
      codes: 'groupExist',
      value: 'Group Already Exist',
      html: 'Group Already Exist',
    },
    modulesAdd: {
      codes: 'modulesAdd',
      value: 'Modules Added Successfully',
      html: 'Modules Added Successfully',
    },
    groupAdd: {
      codes: 'groupAdd',
      value: 'Group Added Successfully',
      html: 'Group Added Successfully',
    },
    featureNExist: {
      codes: 'featureNExist',
      value: 'Some Features not found',
      html: 'Some Features not found',
    },
    featureMapMod: {
      codes: 'featureMapMod',
      value: 'Features Successfully Mapped',
      html: 'Features Successfully Mapped',
    },
    featureNMapMod: {
      codes: 'featureNMapMod',
      value: 'Features Not Mapped',
      html: 'Features Not Mapped',
    },
    noModules: {
      codes: 'noModules',
      value: 'No Modules Found',
      html: 'No Modules Found',
    },
    noFeatures: {
      codes: 'noFeatures',
      value: 'No Active/Exist Features Found',
      html: 'No Active/Exist Features Found',
    },
    noGroup: {
      codes: 'noGroup',
      value: 'No Group Found',
      html: 'No Group Found',
    },
    featureNUMod: {
      codes: 'featureNUMod',
      value: 'No Features not under Respective Module',
      html: 'No Features not under Respective Module',
    },
    accessDenied: {
      codes: 'accessDenied',
      value: 'Permission Denied to Access',
      html: 'Permission Denied to Access',
    },
    noActiveUser: {
      codes: 'noActiveUser',
      value: 'No Active users found',
      html: 'No Active users found',
    },
    roleUpdate: {
      codes: 'roleUpdate',
      value: 'Role Updated Successfully.',
      html: 'Role Updated Successfully.',
    },
    emailNExist: {
      codes: 'emailNExist',
      value: 'No Such Email Exist',
      html: 'No Such Email Exist',
    },
    emailExist: {
      codes: 'emailExist',
      value: 'Email Already Exist',
      html: 'Email Already Exist',
    },
    updateUsr: {
      codes: 'updateUsr',
      value: 'User Updated Successfully',
      html: 'User Updated Successfully',
    },
    deleteUsr: {
      codes: 'deleteUsr',
      value: 'User deleted successfully',
      html: 'User deleted successfully',
    },
    unAuth: {
      codes: 'unAuth',
      value: 'Unauthorized User',
      html: 'Unauthorized User',
    },
    inValid: {
      codes: 'inValid',
      value: 'Invite is InValid, Please contact your Admin',
      html: 'Invite is InValid, Please contact your Admin',
    },
    //This Email address is not associated with any account. Try again!
    invald:{
      codes: 'invald',
      value: 'This Email address is not associated with any account. Try again!',
      html: 'This Email address is not associated with any account. Try again!'
    },
    updateUsrStatus: {
      codes: 'updateUsrStatus',
      value: 'Userstatus Updated Successfully',
      html: 'Userstatus Updated Successfully',
    },
    resetMail: {
      codes: 'resendMail',
      value: 'Reset Mail Sent Successfully',
      html: 'Reset Mail Sent Successfully',
    },
    resendMail: {
      codes: 'resendMail',
      value: 'Resend Mail Sent Successfully',
      html: 'Resend Mail Sent Successfully',
    },
    invalidToken:{
      codes: 'invalidToken',
      value: 'Invalid Token. Please login again.',
      html: 'Invalid Token. Please login again.'
    },
    inActiveUsr: {
      codes: 'inActiveUsr',
      value: 'Your account is currently inactive.Please contact administrator.',
      html: 'Your account is currently inactive.Please contact administrator.',
    },
    roleDelete: {
      codes: 'roleDelete',
      value: 'Roles Delete Successfully',
      html: 'Roles Delete Successfully',
    },
    adminChange: {
      codes: 'adminChange',
      value: 'Admin Changed Successfully',
      html: 'Admin Changed Successfully',
    },
    inCorrectAdmPass: {
      codes: 'inCorrectAdmPass',
      value: 'Incorrect Admin Password.',
      html: 'Incorrect Admin Password.',
    },
    userNameExist: {
      codes: 'userNameExist',
      value: 'Username Already Exist.',
      html: 'Username Already Exist.',
    },
  };
  module.exports = rescodes;
  