const fs = require('fs');
const path = require('path');
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars');
const mailList = require("./emails");


const templatePath = path.join(__dirname, "templates");
// handlebars options
const hbsOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: 'templates',
        layoutsDir: 'templates',
        defaultLayout: 'mail',
    },
    "viewPath": templatePath,
    "extName": ".handlebars"
};

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'ar.asatryan94@gmail.com',
            pass: "you've_Really_expected_to_see_here_my_PASSWORD?"
        }
    },
);

transporter.use('compile', hbs(hbsOptions));

for(let i = 0; i <= mailList.length - 1; i++){

    let to = mailList[i];

        const message = {
            from: 'info@memocast.com',
            subject: 'What to watch on MemoCast',
            template: 'mail',
            context: {}
        };
        message.to = to;
        function mailer(err, info) {
            if (err) {
                console.log('Sending to ' + to + ' failed: ' + err);
                return;
            } else {
                console.log('Sent to ' + to + info.response);
            }
        if (i === mailList.length - 1) {
            message.transport.close();
        }
    }
    transporter.sendMail(message, mailer);
}