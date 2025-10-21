import { LogEntity, LogLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface checkServiceUseCase {
    execute( url:string ):Promise<boolean>;
}

type SuccessCallback = ( () => void) | undefined;
type FailureCallback = (( error:string ) => void) | undefined;

export class checkServiceMultiple implements checkServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly successCallback: SuccessCallback,
        private readonly failureCallback: FailureCallback 
    ) {}

    private callLogs( log: LogEntity ) {
        this.logRepository.forEach( repository  => {
            repository.saveLog( log );
        })
    }

    public async execute( url:string ):Promise<boolean> {

        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error('Service is down');
            }
            const log = new LogEntity({ message:`Service ${url} is OK`, level: LogLevel.low, origin: 'check-service.ts' });
            this.callLogs( log );
            this.successCallback && this.successCallback();
            
            return true;
        } catch (error) {
            const errorMensage = `${ url } - ${ error }`;
            const log = new LogEntity({ message: errorMensage, level: LogLevel.high, origin: 'check-service.ts' });
            this.callLogs( log );
            
            this.failureCallback && this.failureCallback( errorMensage );
            return false;
        }

    }
}