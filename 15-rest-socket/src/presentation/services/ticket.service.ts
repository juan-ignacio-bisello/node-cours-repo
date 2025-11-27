import { UuidAdapter } from "../../config/uuidAdapter";
import { Ticket } from '../../domain/interfaces/ticket';



export class TicketService {

    public readonly ticket: Ticket[] = [
        { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: true },
        { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: true },
        { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 7, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 8, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 9, createAt: new Date(), done: true },
        { id: UuidAdapter.v4(), number: 10, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 11, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 12, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 13, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 14, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 15, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 16, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 17, createAt: new Date(), done: false },
    ];

    private readonly workingOnTickets: Ticket[] = []

    public get pendingTickets(): Ticket[] {
        return this.ticket.filter( ticket => !ticket.handleAtDest );
    }

    public get lastWorkingOnTickets():Ticket[] {
        return this.workingOnTickets.slice(0,4);
    }

    public lastTicketNumber(): number {
        return this.ticket.length > 0 ? this.ticket.at(-1)!.number : 0;
    }

    public createTicket() {
        const ticket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber() + 1 ,
            createAt: new Date(),
            done:  true
        }

        this.ticket.push( ticket );

        return ticket;
    }

    public drawTicket( desk: string ) {
        const ticket = this.ticket.find( t => !t.handleAtDest );
        if ( !ticket ) return { status: 'error', message: 'No hay tickets pendientes'};

        ticket.handleAtDest = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({...ticket});

        return { status: 'ok', ticket }
    }

    public onFinishTicket( id: string ) {
        const ticket = this.ticket.find( t => t.id === id );
        if ( !ticket ) return { status: 'error', message: 'Ticket no encontrado'};

        ticket.done = true;
        
        return { status: 'ok', ticket }
    }
}