import exprees from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path: string;
}

export class Server {

    private app = exprees();
    private readonly port: number;
    private readonly publicPath: string;


    constructor ( options: Options ) {
        const { port, public_path = 'public' } = options;

        this.port = port;
        this.publicPath = public_path;
    }

    async start() {

        this.app.use( exprees.static( this.publicPath ) );

        this.app.get( '/*', ( req, res ) => {
            console.log('Request received:', req.url );
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile( indexPath );
            return;
        } )

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }
}