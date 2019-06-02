document.addEventListener('DOMContentLoaded',function () {
//  alert("javascript");
  const outputYou = document.querySelector('.output-you');
const outputBot = document.querySelector('.output-bot');
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 const recognition = new SpeechRecognition();
 recognition.lang = 'en-US';
recognition.interimResults = false;
const socket = io();

 document.querySelector('button').addEventListener('click', () => {
   //console.log(recognition.lang);
   //alert(recognition.lang);
  recognition.start();
});
recognition.addEventListener('result', (e) => {
  //alert("message recorded")
  let last = e.results.length - 1;
  let text = e.results[last][0].transcript;
  socket.emit('chat message', text);
outputYou.textContent = text;
  //alert(text);
//alert( 'Confidence: ' + e.results[0][0].confidence);
  // We will use the Socket.IO here later…
});
function synthVoice(text) {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  synth.speak(utterance);
}
socket.on('bot reply', function(replyText) {
  synthVoice(replyText);
  if(replyText == '') replyText = '(No answer...)';
    outputBot.textContent = replyText;
});


});
