const express = require('express')
const { userInfo } = require('os')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)
io.on('connection', (socket) => {

     // give the actual name in the  terminal ...e.g govinda
    const username = socket.handshake.query.username;
    console.log(`${username} is connected`);

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})



