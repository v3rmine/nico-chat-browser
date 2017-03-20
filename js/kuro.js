function register() {
  window.location = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=cx94gjhz4ful945h0a3b4hbntiscia&redirect_uri=http://nico.kuro.ml&scope=chat_login';
}

function check() {
  var parser = document.createElement('a');
  parser.href = window.location.href;

  if (parser.hash.indexOf('#access_token=') > -1 && parser.hash.indexOf('&scope=chat_login') > -1) {
    //document.getElementById('url').style.visibility = 'visible';
    generate();
  } else {
    //document.getElementById('url').style.visibility = 'hidden';
  }
}

function generate() {
  //var chanName = document.getElementById('chanID');
  //var chanName = 'creditsToKuromachii'
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var hash = parser.hash.replace('#access_token=','')
  hash = hash.replace('&scope=chat_login','')

  window.location = 'http://nico.kuro.ml/chat?token='+hash;//+'&chan_name='+chanName;
}

function load() {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var token = parser.search.split("token=")[1];
  //var token = parser.search.split("&chan_name=")[0].split("token=")[1];
  //var channelName = parser.search.split('&chan_name=').pop();

  chat(token);
}

function chat(token) {
    var oauth = token;

    TAPIC.setup(oauth, function (username) {

      // By default, TAPIC refreshes API information every 5 seconds, which is the minimum.
      //TAPIC.setRefreshRate(10);

       TAPIC.joinChannel(username, function () {
             tests();
         });
    });

    TAPIC.listen('message', function (e) {
      var chat = new post(e.from, e.text, e.color);
      writeChat( chat.output );
    });
}

// This is for the webpage's chat, it doesn't have anything directly to do with TAPIC.js
function writeChat(msg) {
  document.getElementById('chat').innerHTML += msg;
  document.getElementById('chat').scrollTop = Number.MAX_SAFE_INTEGER;
}

var post = class {
  constructor(username, message, color) {
    this.output = '<p style="color: ' + color + ';"> <strong>' + username + '</strong>: ' + message + '</p>';
  }
};
