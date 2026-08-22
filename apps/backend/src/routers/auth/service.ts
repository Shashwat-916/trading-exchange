import nodemailer from 'nodemailer'
import { SMTP_HOST, SMTP_USER, SMTP_PASS, SMTP_PORT } from '@repo/config'


if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_PORT) {
    throw new Error('Missing SMTP credentials')
}


/**
 * 1st create transport to sendEmail nodemailer.CreateTransport {} 
 * 2nd verfiy it for connection  
 * 3rd then using that createTransport sendEmail service create 
 */

export const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) == 465,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    }
})

transporter.verify().then(() => { console.log('SMTP connected Successfully') }).catch((error) => { console.error(error) })


export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
    try {
        const information = await transporter.sendMail({
            from: `Exchange App <${SMTP_USER}>`,
            to: to,
            subject: subject,
            html: htmlContent
        })

        console.log(`Email sent successfully ${to} with message ID ${information.messageId}`)

    } catch (e) {
        console.error(e)
    }
}
