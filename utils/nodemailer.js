const nodemailer = require("nodemailer"); 

const transporter = nodemailer.createTransport({ 
  service: 'gmail', 
  auth: { 
    user: 'teamrealme333@gmail.com', 
    pass: '@T3amrealme33', 
  },
});

const sendVerificationMail = async (email, confirmationCode) => { 
  // send mail with defined transport object
  let info = await transporter.sendMail({ 
    from: 'BarterIT <no-reply@barterit.com>', 
    to: email, 
    subject: "Account Verification", 
    //text: "", 
    html: `<p>You have to verify your account before logging in to BarterIT</p>
    <p>Click the link to verify</p>
    <a href="${process.env.DOMAIN2}/auth/signup/verify/${confirmationCode}">${process.env.DOMAIN2}/auth/signup/verify/${confirmationCode}</a>`
  });
  
  return info;
}

const sendPasswordResetMail = async (email, link, firstName) => {
  let info = await transporter.sendMail({ 
    from: 'BarterIT <no-reply@barterit.com>', 
    to: email, 
    subject: "Password Reset", 
    //text: "", 
    html: `<p>Hello, ${firstName}</p>
    <p>You have requested to reset your password in BarterIT</p>
    <p>Kindly click the link if you wish to continue</p>
    <a href="${link}">${link}</a>`
  });

  return info;
}

module.exports = { sendVerificationMail, sendPasswordResetMail };