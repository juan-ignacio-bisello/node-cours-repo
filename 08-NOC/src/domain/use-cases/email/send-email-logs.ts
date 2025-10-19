import { send } from 'process';
import { EmailService } from '../../../presentation/email/email.service';
import { LogRepository } from '../../repository/log.repository';
import { LogEntity, LogLevel } from '../../entities/log.entity';


interface SendLogsEmailUseCase {
    execute( to: string | string[] ): Promise<boolean>;
}

export class SendEmailLogs implements SendLogsEmailUseCase {

    constructor(
        private readonly EmailService: EmailService,
        private readonly logRepository: LogRepository,
    ) {}

    async execute(to: string | string[]): Promise<boolean> {
        
        try {
            const send = await this.EmailService.sendEmailWithFileSystemLogs( to );

            if ( !send ) {
                throw new Error('Error sending email with logs');
            }

            const log = new LogEntity({
                message: 'Email with logs sent successfully',
                origin: 'send-email-logs.ts',
                level: LogLevel.low,
            })

            this.logRepository.saveLog( log );

        } catch (error) {
            
            const log = new LogEntity({
                message: 'Error sending email with logs: ' + (error as Error).message,
                origin: 'send-email-logs.ts',
                level: LogLevel.high,
            })

            this.logRepository.saveLog( log );

            return false;
        }

        return true;
    }
}