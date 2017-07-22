var engine = Random.engines.mt19937().autoSeed();

// // https://stackoverflow.com/a/901144
// function getParamsByName(name, url) {
//   if (!url) url = window.location.href;
//   name = name.replace(/[\[\]]/g, "\\$&");
//   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
//       results = regex.exec(url);
//   if (!results) return null;
//   if (!results[2]) return '';
//   return decodeURIComponent(results[2].replace(/\+/g, " "));
// }

function register() {
  window.location = 'https://api.twitch.tv/kraken/oauth2/authorize?response_type=token&client_id=cx94gjhz4ful945h0a3b4hbntiscia&redirect_uri=http://nico.kuro.ml&scope=chat_login';
}

function check() {
  var parser = document.createElement('a');
  parser.href = window.location.href;

  if (parser.hash.indexOf('#access_token=') > -1 && parser.hash.indexOf('&scope=chat_login') > -1) {
    generate();
  } else {
  }
}

function generate() {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var hash = parser.hash.replace('#access_token=','')
  hash = hash.replace('&scope=chat_login','')

  window.location = 'http://nico.kuro.ml/chat?token='+hash;
}

function load() {
  var parser = document.createElement('a');
  parser.href = window.location.href;
  var token = parser.search.split("token=")[1];

  chat(token);
}

function chat(token) {
    var oauth = token;

    TAPIC.setup(oauth, function (username) {

      // By default, TAPIC refreshes API information every 5 seconds, which is the minimum.
      TAPIC.setRefreshRate(5);

       TAPIC.joinChannel(username, function () {
             tests();
         });
    });

    TAPIC.listen('message', function (e) {
      output = e.text //like nico nico
      writeChat( output, e.color );
    });
}

// This is for the webpage's chat, it doesn't have anything directly to do with TAPIC.js
function writeChat(msg, color) {
  $(function () {
    //vertical = 20 + Math.floor((Math.random() * 25) + 0) * Math.round(Math.random()) * 2 - 1; //ver 2
    vertical = Random.integer(20, 80)(engine);
    //size = Math.floor((Math.random() * (70 - 40)) + 40);
    size = Random.integer(30, 70)(engine);
    var rez = $('<div class="popup" style="top:'+ vertical +'vh;font-size:'+ size +'px;color:'+ color +';">'+ msg +'</div>');
    $('#chat').append(rez);
    setTimeout( function() { rez.remove(); }, 60000);
  });
}

$("body").css("overflow", "hidden");
