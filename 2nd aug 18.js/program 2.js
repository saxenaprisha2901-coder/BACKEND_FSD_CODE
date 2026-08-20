// Step 1: Import modules
const EventEmitter = require("events");
const http = require("http");

// Step 2: Create custom Button
class Button extends EventEmitter {
    click() {
        console.log("Button clicked!");
        this.emit("click");
    }
}

// Step 3: Create custom InputBox
class InputBox extends EventEmitter {
    type(text) {
        console.log(`User typed: ${text}`);
        this.emit("input", text);
    }
}

// Step 4: Create objects
const btn = new Button();
const input = new InputBox();

// Step 5: Event listeners
btn.on("click", () => {
    console.log("Handling button click event...");
});

input.on("input", (value) => {
    console.log(`Handling input event, value = ${value}`);
});

// Step 6: Trigger events
btn.click();
input.type("Hello Node.js!");

// Step 7: Create HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>Hello from Node.js Server!</h1>
        <p>Server is running successfully.</p>
    `);
});

// Step 8: Start server
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});