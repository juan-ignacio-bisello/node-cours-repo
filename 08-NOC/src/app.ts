import { LogModel, MongoDataBase } from './data/mongo';
import { Server } from './presentation/server';



( async() =>{
    main();
})();

async function main() {
    Server.start();

    // console.log( envs );
    // await MongoDataBase.connect();

    // const newLog = await LogModel.create({
    //     message: 'Este es un log de prueba',
    //     level: 'low',
    //     origin: 'App.ts'
    // });

    // await newLog.save();
    // console.log('Log saved:', newLog);

    // const logs = await LogModel.find();
    // console.log('All logs:', logs);
}