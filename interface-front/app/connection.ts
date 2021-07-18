import { io, Socket, SocketOptions } from "socket.io-client";
import { Receiver } from "./types";

export default class Connection {
    static socket: Socket = null
    static socketOpts: Partial<SocketOptions> = {}
    static socketUrl: string = "http://localhost:1027"
    static lastData: Object
    static connection: Connection = null
    static broadcastTo: Array<Receiver> = []

    private constructor() { }

    static getOrCreateConnection(): Connection {
        if (!this.connection) {
            this.connection = new Connection()
            this.connect()
        }
        return this.connection
    }

    private static connect(): void {
        this.socket = io(this.socketUrl, this.socketOpts)
        this.socket.on("connect", this.connectHandler)
        this.socket.on("data", this.dataHandler)
    }

    private static connectHandler(): void { }

    private static dataHandler(data): void {
        Connection.lastData = data
        Connection.broadcastTo.forEach(bs => bs.receiveData(Connection.lastData))        
    }

    public static connectReceiver(rec: Receiver): void {
        this.broadcastTo.push(rec);
    }
}
