import SocketServer from "./socket.server";

class Application {
    private socketServer = new SocketServer()

    start(){
        this.socketServer.start()
    }
}

// Application
const app = new Application();
app.start()