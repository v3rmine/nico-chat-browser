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
  var token = parser.search.split("token")[1];
  //var token = parser.search.split("&chan_name=")[0].split("token=")[1];
  //var channelName = parser.search.split('&chan_name=').pop();

  chat(token);
}

function chat(token) {
    var oauth = token;

    // You have to run .setup() before anything besides .listen()
    TAPIC.setup(oauth, function (username) {

      // By default, TAPIC refreshes API information every 5 seconds, which is the minimum.
      // Setting the refresh rate is optional.
      TAPIC.setRefreshRate(10);

      // This is also required for a lot of things to work
      TAPIC.joinChannel(username, function () {
            tests();
        });
    });

    // EventListeners
    TAPIC.listen('raw', function (e) {
      // You really don't NEED to see raw messages. But you can if you want.
      // You can also manually parse the raw messages if you don't trust TAPIC.js
      // writeChat( '* ' + e );
        console.info(e);
    });
    TAPIC.listen('message', function (e) {
      var output = (e.action ? '<span style="color: ' + e.color + ';">' : ':&nbsp;&nbsp;') +
        e.text +
        (e.action ? '</span>' : '' );
        // e.emotes is the emotes, e.g. '25:0-4,12-16/1902:6-10'
        // https://github.com/justintv/Twitch-API/blob/master/IRC.md#privmsg
        // e.badges is an array of badges: https://discuss.dev.twitch.tv/t/beta-badge-api/6388
      writeChat( output );
    });
    TAPIC.listen('echoChat', function (e) {
      var output = '<strong style="color: ' + TAPIC.getColor() + ';">' + TAPIC.getDisplayName() +
        '</strong> : ' + e;
      writeChat( output );
    });
}

// This is for the webpage's chat, it doesn't have anything directly to do with TAPIC.js
function writeChat(msg) {
  document.getElementById('chat').innerHTML += msg + '<br>';
  document.getElementById('chat').scrollTop = Number.MAX_SAFE_INTEGER;
}
