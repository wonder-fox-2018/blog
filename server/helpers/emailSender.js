const nodemailer = require('nodemailer')

const mailInit = (cb) => {
  const transporter = nodemailer.createTransport({
    service: String(process.env.EMAIL_SENDER_PLATFORM),
    auth: {
      user: String(process.env.EMAIL_SENDER),
      pass: String(process.env.EMAIL_PW)
    }
  })
  cb(transporter)
}


module.exports = {

  sendVerification(targetEmail, fname, VerifyToken) {
    mailInit(transporter => {
      const message = {
        from: String(process.env.EMAIL_SENDER),
        to: targetEmail,
        subject: "Verify your account Blogtivate",
        text: `Hey ${fname}, let's verify your email to use our blog web app`,
        html: `<p><a href=${String(process.env.URL_CALLBACK_VERIFY)}/${VerifyToken}> Verify your email </a></p>`
      }

      transporter.sendMail(message, function (err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      })
    })
  },
  sendWellcomeEmail(targetEmail, fname) {
    mailInit(transporter => {
      const message = {
        from: String(process.env.EMAIL_SENDER),
        to: targetEmail,
        subject: "Welcome to Blogtivate Blog web app",
        text: `Thank's ${fname} for joining on Blogtivate blog web app:)`
      }

      transporter.sendMail(message, function (err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info)
        }
      })
    })
  }
}
