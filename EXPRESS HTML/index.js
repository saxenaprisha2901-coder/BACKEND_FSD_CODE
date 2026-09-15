import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the HTML file.');
            return;
        }
        else{
            res.send(data);
        }
    });
});
app.get('/about', (req, res) => {})
app.get('/contact', (req, res) => {})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 