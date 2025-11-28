import { UuidAdapter } from "../../config/uuidAdapter";
import { Ticket } from '../../domain/interfaces/ticket';
import { WssService } from './wss.service';



export class TicketService {

    constructor () {}

    public ticket: Ticket[] = [
        { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: true },
        { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: true },
        { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
        { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false },
    ];

    private readonly workingOnTickets: Ticket[] = []

    private get wssService() {
        return WssService.instance;
    }

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

        this.onTicketNumberChanged();

        return ticket;
    }

    public drawTicket( desk: string ) {
        const ticket = this.ticket.find( t => !t.handleAtDest );
        if ( !ticket ) return { status: 'error', message: 'No hay tickets pendientes'};

        ticket.handleAtDest = desk;
        ticket.handleAt = new Date();

        this.workingOnTickets.unshift({...ticket});
        this.onTicketNumberChanged();
        this.onWorkingOnChanged();

        return { status: 'ok', ticket }
    }

    public onFinishTicket( id: string ) {
        const ticket = this.ticket.find( t => t.id === id );
        if ( !ticket ) return { status: 'error', message: 'Ticket no encontrado'};

        this.ticket.map( ticket => {
            if ( ticket.id === id ) {
                ticket.done = true;
            }
        })
        ticket.done = true;
        
        return { status: 'ok', ticket }
    }

    private onTicketNumberChanged () {
        this.wssService.sendMessage('on-ticket-count-changed', this.pendingTickets.length );
    }

    private onWorkingOnChanged() {
        this.wssService.sendMessage('on-working-changed', this.lastWorkingOnTickets );
    }
}