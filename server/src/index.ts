import express from 'express'
const server = express();
const PORT = 5000;

server.use(express.json());
server.listen(PORT,()=>{
    console.log("backend live on port ",PORT)
})
