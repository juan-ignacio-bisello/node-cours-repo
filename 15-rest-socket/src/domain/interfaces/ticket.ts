

export interface Ticket {
    id: string,
    number: number,
    createAt: Date,
    handleAtDest?: string,
    handleAt?: Date,
    done: boolean,
}