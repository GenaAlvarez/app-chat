import express from 'express';
import exphbs from 'express-handlebars';
import { Server as socketIo } from 'socket.io';
import viewsRouter from './routes/views.router.js'

const app = express();
const PUERTO = 8080;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use(express.static('./src/public'));
app.use('/', viewsRouter);

const httpServer = app.listen(PUERTO, ()=>{
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

const io = new socketIo(httpServer);

let messages = [];

io.on('connection', (socket)=>{
    console.log('un cliente se conecto');

    socket.on("message", (data)=>{
        // recibo la data del cliente y lo voy a pushear al array que declaramos arriba
        messages.push(data);
        // utiliamos el metodo emit que nos permite emitir eventos desde el cliente hacia el servidor
        io.emit("messagesLogs", messages);
    });
});

