const nodemailer = require('nodemailer')

async function sendMail(){

    // Create transporter
    /*const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: 'joeri.lenaerts36@gmail.com',
          pass: 'csbcgezyjpkekuah'
        }
    });*/

    // Create transporter
    const transporter = nodemailer.createTransport({
        host: "send.one.com",
        port: 465,
        secure: true,
        auth: {
          user: 'orders@artshark.be',
          pass: `a6!7CqYgRhy@FG6` // does not work here
        }
    });

    // Send mail
    const info = await transporter.sendMail({
        from: 'Artshark <orders@artshark.be>',
        to: "joeri.lenaerts36@gmail.com", 
        subject: "Custom!!",
        text: "Hello world?" + 
        "dear user", 
    });
    
}

sendMail();
console.log("mail sent");