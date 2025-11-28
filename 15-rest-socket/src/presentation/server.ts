import express, { Router } from 'express';
import path from 'path';

interface Options {
  port: number;
  // routes: Router;
  public_path?: string;
}


export class Server {

  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  // private readonly routes: Router;

  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;

    this.configure();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(this.publicPath));

    this.app.get(/^\/(?!api|ws).*/, (req, res) => {
      const indexPath = path.resolve(process.cwd(), this.publicPath, 'index.html');
      res.sendFile(indexPath);
    });
  }

  
  public setRoutes( router: Router ) {
    this.app.use( router );
  }
  
  async start() {
    
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${ this.port }`);
    });

  }

  public close() {
    this.serverListener?.close();
  }

}
