
import { Request, Response } from 'express';
import sendMail from '../../Utils/mails/sendMail';

export default {
    sendMail: async (req: Request , res: Response): Promise<Response> => {
        const {firstName, lastName, email, message, society} = req.body;
        if (!firstName || !lastName || !email || !message || !society) return res.status(400).json({fr: "Veuillez remplir tous les champs", en: "Please fill in all fields"});
        const mailBody = sendMail.generateEmail(firstName, lastName, email, message, society);
        const to: string = sendMail.getMailRecever();
        await sendMail.sendMail(to, "Formulaire de contacte site Margaux pelisson", mailBody)
        return res.status(200).json({fr: "email envoyé", en: "email sent"});
    },
}