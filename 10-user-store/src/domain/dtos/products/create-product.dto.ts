

export class CreateProductDto {

    private constructor (
        public readonly name: string,
        private readonly available: boolean,
        private readonly price: number,
        private readonly description: string,
        private readonly user: string,
        private readonly category: string,
    ) {}

    static create( props: { [key: string]: any } ):[string?, CreateProductDto?] {

        const { 
            name, 
            available = false,
            price,
            description,
            user,
            category,
        } = props;
        let availableBoolean = available;

        if ( !name ) return ['Missing name'];
        if ( !user ) return ['Missing user'];
        if ( !category ) return ['Missing category'];
        if ( typeof available !== 'boolean' ) {
            availableBoolean = ( available === 'true' );
        }

        return [undefined, new CreateProductDto( 
            name, 
            availableBoolean, 
            price,
            description,
            user,
            category
        ) ];
    }
}