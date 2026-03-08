const http = require('http');
const fs = require('fs');

const PORT = 5000;

const server = http.createServer((req, res) => {

    if (req.url === "/") {
        fs.readFile("./public/index.html", (err, data) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    else if (req.url === "/bookings") {
        fs.readFile("./trains.json", (err, data) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
        });
    }

    else if (req.url === "/addBooking" && req.method === "POST") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const newBooking = JSON.parse(body);

            fs.readFile("./trains.json", (err, data) => {

                const jsonData = JSON.parse(data);
                jsonData.bookings.push(newBooking);

                fs.writeFile("./trains.json", JSON.stringify(jsonData, null, 2), () => {
                    res.writeHead(200);
                    res.end("Booking Added Successfully");
                });

            });
        });
    }

    else {
        res.writeHead(404);
        res.end("Page Not Found");
    }

});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
