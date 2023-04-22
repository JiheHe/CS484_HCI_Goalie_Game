var host = "cpsc484-04.yale.internal:8888";

$(document).ready(function () {
   frames.start();
});


var frames = {
   socket: null,

   start: function () {
      console.log("started a new frame at " + (new Date()).getSeconds());
      var url = "ws://" + host + "/frames";
      frames.socket = new WebSocket(url);
      frames.socket.onmessage = function (event) {
      // frames.show(JSON.parse(event.data));
      }
   },

   show: function (frame) {
      console.log(frame);
   },

   myprint: function() {
      console.log("shared successfully");
   }
};
