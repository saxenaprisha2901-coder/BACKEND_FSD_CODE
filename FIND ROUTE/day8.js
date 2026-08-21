//Practicing routing using http module 
import  http from "http";
const server = http.createServer((req, res) => {
    if(req.url === "/") {
        res.writeHead(200, {"Content-Type": "text/html"});
        if(req.url === "/") {
            res.end("<h1>Welcome to the Home Page</h1>");
        }
        else if(req.url === "/about") {
            res.end("<h1>Welcome to the About Page</h1>");
        }
        else if(req.url === "/contact") {
            res.end("<h1>Welcome to the Contact Page</h1>");
        }
        else{
            res.writeHead(404, {"Content-Type": "text/html"});
            res.end("<h1>404 Not Found</h1>");
        }
    }
});
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});