import sendGridMail from '@sendgrid/mail';




const mailService = async ({ from, to, subject, text, html}) => {
  try {
    sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
      let msg = {
        from: 'gajay3954@gmail.com', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
      }

      let info =await sendGridMail.send(msg)
      if(!info){
        return {
          result:"error",
          message:"Error while sending mail"
        }
      }
      return info;
  } catch(err){
    console.log(JSON.stringify(err.response.body))
    return {
      result:"error",
      message:"Error while sending mail"
    }
  }
        // let transporter = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: process.env.SMTP_PORT,
        //     secure: false, // true for 465, false for other ports
        //     auth: {
        //         user: process.env.MAIL_USER, // generated ethereal user
        //         pass: process.env.MAIL_PASSWORD, // generated ethereal password
        //     },
        // });

        // send mail with defined transport object
    // let info = await transporter.sendMail({
    //     from: `File Share <${from}>`, // sender address
    //     to: to, // list of receivers
    //     subject: subject, // Subject line
    //     text: text, // plain text body
    //     html: html, // html body
    // });
        
}

export default mailService;