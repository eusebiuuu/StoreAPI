const app = require('./app');
const http = require('http');
const populateDB = require('./services/populate.mongo');
const { connectToMongoDB } = require('./services/connect.mongo');
require('dotenv').config();

const PORT = process.env.port || 8000;
const server = http.createServer(app);

async function startServer() {
    await connectToMongoDB();
    await populateDB();
    server.listen(PORT, () => {
        console.log(`The server is listening on port ${PORT}...`);
    });
}

startServer();