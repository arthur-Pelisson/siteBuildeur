import nodeMail from "nodemailer";
import fs from "fs";
import { Attachment } from "nodemailer/lib/mailer";
import { getMailAdmin } from "../../Components/settingsAdmin/settingsAdmin.service";
import Bcrypt from "../bcrypt";

class sendMail {
    nodemailer: typeof nodeMail;
    transporter: nodeMail.Transporter;
    private _mail: string;
    private _password: string;
    private _urlclient = process.env.CORS;
    private _service: string;
    private _mailRecever: string;
    body: string = "";
    subject: string = "";
    attachments: Attachment[] = [];

    constructor(nodeMailer: typeof nodeMail) {
        this.nodemailer = nodeMailer;
        this.init();
    }

    

    async init() {
        const mailAdmin = await getMailAdmin();
        // console.log("mailAdmin", mailAdmin);
        if (mailAdmin) {
            let password = await Bcrypt.decryptText(mailAdmin.password);
            this._mail = mailAdmin.email;
            this._password = password;
            this._service = mailAdmin.service;
            this._mailRecever = mailAdmin.emailAdmin;
        }
        this.transporter = this.nodemailer.createTransport({
            service: this._service,
            // host: "smtp-relay.sendinblue.com",
            auth: {
                user: this._mail,
                pass: this._password,
            },
        });
    }

    public getMailRecever():string {
        return this._mailRecever;
    }

    private mailOptions(to: string, subject: string, text: string): nodeMail.SendMailOptions {
        return {
            from: this._mail,
            to: to,
            subject: subject,
            html: text,
            attachments: this.attachments,
        };
    }

    async sendMail(to: string, subject: string, text: string): Promise<boolean> {
        await this.init();
        console.log("service", this._service);
        console.log("mail", this._mail);
        console.log("password", this._password);
        console.log("mailRecever", this._mailRecever);
        console.log("to", to);
        const mail = this.mailOptions(to, subject, text);
        try {
            await this.transporter.sendMail(mail);
            return true;
        } catch (error) {
            console.log("error", error);
            return false;
        }
    }

    templateMail(id: string, config: { token: string; lg?: string }) {
        if (config.lg === undefined || config.lg === "") config.lg = "en";
        switch (id) {
            case "register":
                return this.activateAccount(config?.token, config?.lg);
            case "resetPassword":
                return this.resetPassword(config?.token, config?.lg);
        }
    }

    addAttachment(attachment: Attachment) {
        this.attachments.push(attachment);
    }
    createAttachement(fileName, path, cid) {
        const attachment = 
            {
                filename: fileName,
                path: path,
                cid: cid, // Use a unique CID here
            }
        this.addAttachment(attachment)
    }

    private activateAccount(token: string, lg: string): string[] {

        const languageContent = {
            en: {
                language: "en",
                subject: "Activate Your Account",
                title: "Activate Your Account",
                greeting: "Hello,",
                content: "Please click on the link below to activate your account.",
                activateButton: "Activate Your Account",
                footerText: "If you did not request this activation, please ignore this email.",
                logoUrl: `${process.env.HOST}/imgmail/logo-etoileroyale.png`,
                activationLink: `${this._urlclient}/auth/activation?token=${token}`,
            },
            fr: {
                language: "fr",
                subject: "Activer votre compte",
                title: "Activer votre compte",
                greeting: "Bonjour,",
                content: "Veuillez cliquer sur le lien ci-dessous pour activer votre compte.",
                activateButton: "Activer votre compte",
                footerText: "Si vous n'avez pas demandé cette activation, veuillez ignorer cet e-mail.",
                logoUrl: `${process.env.HOST}/imgmail/logo-etoileroyale.png`,
                activationLink: `${this._urlclient}/auth/activation?token=${token}`,    
            },
        };
        const mailBody = this.generateActivationEmail(lg, "./src/Utils/mails/activation-template-mail.html", languageContent);
        return [mailBody, languageContent[lg].subject];
    }

    private resetPassword(token: string, lg: string): string[] {
        const languageContent = {
            en: {
                Language: "en",
                subject: 'Reset your password',
                title: 'Reset your password',
                greeting: 'Hello,',
                content: 'Please click on the link below to reset your password.',
                resetButton: 'Reset your password',
                footerText: 'If you did not request this reset, please ignore this email.',
                logoUrl: `${process.env.HOST}/imgmail/logo-etoileroyale.png`,
                resetLink: `${this._urlclient}/auth/reset-password?token=${token}`,
                
            },
            fr: {
                Language: "fr",
                subject: 'Réinitialiser votre mot de passe',
                title: 'Réinitialiser votre mot de passe',
                greeting: 'Bonjour,',
                content: 'Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe.',
                resetButton: 'Réinitialiser votre mot de passe',
                footerText: 'Si vous n\'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.',
                logoUrl: `${process.env.HOST}/imgmail/logo-etoileroyale.png`,
                resetLink: `${this._urlclient}/auth/reset-password?token=${token}`,
            },
        };
        const mailBody = this.generateActivationEmail(lg, "./src/Utils/mails/reset-password-template-mail.html", languageContent);
        return [mailBody, languageContent[lg].subject];
    }

    public escapeHtml(text: string) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    public generateEmail(firstName, lastName, email, message, society) {
        firstName = this.escapeHtml(firstName);
        lastName = this.escapeHtml(lastName);
        email = this.escapeHtml(email);
        message = this.escapeHtml(message);
        society = this.escapeHtml(society);
        return `
            <h1>Message de ${firstName} ${lastName}</h1>
            <p>Entreprise: ${society}</p>
            <p>${message}</p>
            <p>Mail de réponse: ${email}</p>
        `;
    }

    private generateActivationEmail(language, templatePath, languageContent) {
        
        const emailTemplatePath = templatePath;
        const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");

        const content = languageContent[language] || languageContent.en;

        const finalEmailBody = Object.keys(content).reduce((template, key) => {
            return template.replace(new RegExp(`{{${key}}}`, "g"), content[key]);
        }, emailTemplate);

        // Replace the activation link dynamically

        return finalEmailBody;
    }
}

export default new sendMail(nodeMail);
