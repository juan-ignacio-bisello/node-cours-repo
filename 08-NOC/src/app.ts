import { PrismaClient } from '@prisma/client';
import { Server } from './presentation/server';



( async() =>{
    main();
})();

async function main() {
    Server.start();

    // const prisma = new PrismaClient();

    // const newLog = await prisma.logModel.create({
    //     data: {
    //         level: 'LOW',
    //         message: 'Este es un log de prueba desde Prisma',
    //         origin: 'App.ts'
    //     }
    // });

    // const log = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });


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