import { Router } from "express";
import { TicketController } from "./constroller";



export class TicketRoutes {

    static get routes() {

        const router = Router();
        const ticketController = new TicketController();


        router.get('/', ticketController.getTickets);
        router.get('/last', ticketController.getLastTicketsNumber );
        router.get('/pending', ticketController.PendingTickets );
        
        router.post('/', ticketController.CreateTicket );
        
        router.get('/draw/:desk', ticketController.drawTickets );
        router.put('/done/:ticketId', ticketController.ticketsFinished );

        router.get('/working-on', ticketController.workingOn );


        return router;
    }
}