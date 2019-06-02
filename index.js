const express = require('express');
const app = express();
const apiai = require('apiai')('db29e26a4e9546f39f2bbc519db59553');

app.use(express.static(__dirname + '/views')); //html
app.use(express.static(__dirname + '/public')); //css,js,images
const server = app.listen(process.env.PORT||5000,function()
{
  console.log("Server started ");
});
app.get('/',(req,res) => {

 alert("deb");
  res.sendFile( 'index.html',{ root: 'views' });
});
const io = require('socket.io')(server);
io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);


    // Get a reply from API.AI
console.log("Get a reply from API.AI");
    let apiaiReq = apiai.textRequest(text, {
      sessionId: 5
    });

    apiaiReq.on('response', (response) => {
      let aiText = response.result.fulfillment.speech;
    console.log('Bot reply: ' + aiText);
      socket.emit('bot reply', aiText); // Send the result back to the browser!
    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
