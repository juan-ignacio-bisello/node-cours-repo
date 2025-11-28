import { WebSocketServer, WebSocket } from 'ws';
import { Server } from 'http';


interface Options {
    server: Server;
    path: string;
}

export class WssService {
    private static _intance: WssService;
    private wss: WebSocketServer;

    private constructor( options: Options) {
        const { server, path = '/ws' } = options;

        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static get instance(): WssService {
      if ( !WssService._intance ) {
        throw 'WssService is not inicialized';
      }

      return WssService._intance;
    }

    static iniWss( options: Options ) {
      WssService._intance = new WssService( options );
    }

    public sendMessage( type: string, payload: Object ) {
      this.wss.clients.forEach( client => {
        if ( client.readyState === WebSocket.OPEN ) {
          client.send( JSON.stringify({ type, payload }) );
        }
      })
    }

    public start() {
      this.wss.on('connection', ( ws: WebSocket ) => {

        console.log('Cliente connected');

        ws.on('close', () => console.log('Client disconnected'));
      })
    }

}