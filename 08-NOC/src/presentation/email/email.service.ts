import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.config';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachements?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }

    });

    async sendEmail( options: SendMailOptions):Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            })

            console.log(sentInformation);

            return true;
        } catch (error) {
            
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to:string | string[] ) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h1>Logs del servidor</h1>
            <p>Adjunto encontrarás los logs generados por el servidor.</p>
        `;
        const attachements:Attachment[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({
            to, subject, htmlBody, attachements
        });
    }
}