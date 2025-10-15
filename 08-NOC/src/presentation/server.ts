import { checkService } from "../domain/use-cases/checks/check-service";
import { fileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new fileSystemDatasource()
)


export class Server {

    public static start() {
        console.log('Server started...');

        CronService.createJob( 
            '*/5 * * * * *', 
            () => {
                // const url = 'https://www.google.com';
                const url = 'http://localhost:3000/posts';
                new checkService(
                    fileSystemLogRepository,
                    () => console.log(` ${ url } is ok!`),
                    (error) => console.log('Failure callback executed with error:', error)
                ).execute( url);
                // new checkService().execute( 'http://localhost:3000/posts');
            }
        );
    }
}