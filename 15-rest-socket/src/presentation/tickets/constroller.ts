import { Request, Response } from "express";
import { TicketService } from '../services/ticket.service';


export class TicketController {

    constructor(
        private readonly ticketService = new TicketService(), 
    ) {}

    public getTickets = async ( req: Request, res: Response ) => {
        res.json( this.ticketService.ticket );
    }
    
    public getLastTicketsNumber = async ( req: Request, res: Response ) => {
        res.json(this.ticketService.lastTicketNumber() );

    }
    
    public PendingTickets = async ( req: Request, res: Response ) => {
        res.json( this.ticketService.pendingTickets );
    }
    
    public CreateTicket = async ( req: Request, res: Response ) => {
        res.status(201).json( this.ticketService.createTicket());
    }
    
    public drawTickets = async ( req: Request, res: Response ) => {
        const { desk } = req.params;
        res.json( this.ticketService.drawTicket( desk ) );
    }
    
    public ticketsFinished = async ( req: Request, res: Response ) => {
        const { ticketId } = req.params;

        res.json( this.ticketService.onFinishTicket( ticketId ) );
    }
    
    public workingOn = async ( req: Request, res: Response ) => {
        res.json( this.ticketService.lastWorkingOnTickets );
    }
}