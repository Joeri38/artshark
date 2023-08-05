const nodemailer = require('nodemailer')



async function sendMail(){

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'joeri.lenaerts36@gmail.com',
          pass: 'csbcgezyjpkekuah'
        }
    });

    // Send mail
    const info = await transporter.sendMail({
        from: '"phoenix" <joeri.lenaerts36@gmail.com>', // sender address
        to: "orders.artsharkbe@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?" + 
        "dear user", // plain text body
        //html: "<b>Hello world?</b>", // html body
    });
    
}

sendMail();
console.log("mail sent");