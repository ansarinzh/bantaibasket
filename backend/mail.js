// const mailer = require("nodemailer");



// const getEmailData = (to, name,) => {
//     let data = null;
//             data = {
//                 from: "John Ahn <bantaibasket@gmail.com>",
//                 to,
//                 subject: `Hello ${name}`,
//                 html: Hello()
//             }    
//     return data;
// }


// const sendEmail = (to, name, type) => {

//     const smtpTransport = mailer.createTransport({
//         service: "Gmail",
//         auth: {
//             user: "",
//             pass: ""
//         }
//     })

//     const mail = getEmailData(to, name, type)

//     smtpTransport.sendMail(mail, function(error, response) {
//         if(error) {
//             console.log(error)
//         } else {
//             console.log( " email sent successfully")
//         }
//         smtpTransport.close();
//     })


// }

// module.exports = { sendEmail }