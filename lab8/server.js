const http = require('http');
const EventEmitter = require('events');
const fs = require('fs');

class TrainEmitter extends EventEmitter {}
const trainEmitter = new TrainEmitter();

const PORT = 5001;
let eventLogs = [];

trainEmitter.on('newListener', (event) => {
    console.log(`New listener added for event: ${event}`);
});

trainEmitter.once('firstBooking', (name) => {
    const msg = `First ticket booked by ${name}!`;
    console.log(msg);
    eventLogs.push(msg);
});

trainEmitter.on('ticketBooked', (name, train) => {
    const msg = `Ticket booked by ${name} for ${train}`;
    console.log(msg);
    eventLogs.push(msg);
});

trainEmitter.on('paymentSuccess', (name, amount) => {
    const msg = `Payment of $${amount} successful for ${name}`;
    console.log(msg);
    eventLogs.push(msg);
});

console.log("Registered Events:", trainEmitter.eventNames());
console.log("TicketBooked Listener Count:", trainEmitter.listenerCount('ticketBooked'));
console.log("Listeners for ticketBooked:", trainEmitter.listeners('ticketBooked'));

const trains = [
    { name: "Rajdhani Express", price: 50 },
    { name: "Shatabdi Express", price: 20 },
    { name: "Duronto Express", price: 80 },
    { name: "Garib Rath", price: 20 },
    { name: "Vande Bharat", price: 100 }
];

const server = http.createServer((req, res) => {

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;

    if (path === "/train.png") {
        res.writeHead(200, {"Content-Type":"image/png"});
        res.end(fs.readFileSync("train.png"));
    }

    else if (path === "/") {
        res.writeHead(200, {"Content-Type":"text/html"});

        res.end(`
        <html>
        <head>
        <title>Train Booking</title>

        <style>

        body{
        font-family:Arial;
        background-image:url('/train.png');
        background-size:cover;
        background-position:center;
        background-repeat:no-repeat;
        background-color:rgba(0,0,0,0.5);
        background-blend-mode:overlay;
        color:white;
        text-align:center;
        padding:40px;
        }

        .box{
        background:rgba(255,255,255,0.9);
        backdrop-filter:blur(6px);
        color:black;
        padding:30px;
        border-radius:12px;
        display:inline-block;
        width:320px;
        box-shadow:0 0 15px rgba(0,0,0,0.4);
        }

        input,select{
        width:100%;
        padding:10px;
        margin:10px 0;
        border-radius:5px;
        border:1px solid #ccc;
        }

        button{
        padding:12px;
        background:#2a5298;
        color:white;
        border:none;
        width:100%;
        border-radius:5px;
        cursor:pointer;
        font-weight:bold;
        }

        button:hover{
        background:#1e3c72;
        }

        </style>

        </head>

        <body>

        <h1>Train Booking System</h1>

        <div class="box">

        <form action="/book" method="GET">

        <input name="name" placeholder="Passenger Name" required>

        <select name="train">
        ${trains.map(t=>`<option value="${t.name}|${t.price}">
        ${t.name} - $${t.price}
        </option>`).join("")}
        </select>

        <button type="submit">Book Ticket</button>

        </form>

        </div>

        </body>
        </html>
        `);
    }

    else if (path === "/book") {

        eventLogs = [];

        const name = parsedUrl.searchParams.get("name");
        const trainData = parsedUrl.searchParams.get("train");

        const trainName = trainData.split("|")[0];
        const price = trainData.split("|")[1];

        trainEmitter.emit('firstBooking', name);
        trainEmitter.emit('ticketBooked', name, trainName);
        trainEmitter.emit('paymentSuccess', name, price);

        res.writeHead(200, {"Content-Type":"text/html"});

        res.end(`
        <html>
        <head>
        <title>Booking Success</title>

        <style>

        body{
        font-family:Arial;
        background:#111;
        color:white;
        text-align:center;
        padding:50px;
        }

        .box{
        background:#222;
        padding:30px;
        border-radius:10px;
        display:inline-block;
        }

        li{
        margin:10px 0;
        }

        a{
        color:#00f2ff;
        }

        </style>

        </head>

        <body>

        <div class="box">

        <h2>Booking Successful</h2>

        <ul>
        ${eventLogs.map(e=>`<li>${e}</li>`).join("")}
        </ul>

        <br>

        <a href="/">Book Another Ticket</a>

        </div>

        </body>
        </html>
        `);
    }

    else{
        res.writeHead(404);
        res.end("Page Not Found");
    }

});

server.listen(PORT, ()=>{
    console.log("Server running at http://localhost:"+PORT);
});