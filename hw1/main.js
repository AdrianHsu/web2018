var mylist = document.getElementsByTagName("LI");

var i;
for(i = 0; i < mylist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "close";
    span.appendChild(txt);
    mylist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for(i = 0; i < close.length; i ++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if(ev.target.tagName == 'LI') {
        ev.target.classList.toggle('checked'); // 點下去之後變成 "checked"
    }
    console.log(ev.target.tagName);
}, false);

function refreshLI() {
    lis = document.getElementsByTagName("li");
    var i = 0;
    for(i = 0; i < lis.length; i++) {
        lis[i].classList.remove('checked');
    }
    lis[lis.length - 1].classList.add('checked');
}

// https://developers.google.com/youtube/iframe_api_reference#Playback_controls
function newElement() {

    var myurl = document.getElementById("myInput").value;
    var myid = urlToId(myurl);
    currentId = myid;
    player.stopVideo();
    player.loadVideoById(myid);
    setTimeout(addElement, 1000);
}
function addElement() {
    console.log("ya!");
    alert("現在播放：" + currentTitle);
    var li = document.createElement("li");
    var inputValue = currentId + "|" + currentTitle;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("you should write sth!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for(i = 0;  i< close.length; i++) {
        close[i].onclick = function() {
            // close button 的 parent 也就是整個 li 本身
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
    refreshLI();
}
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var currentId = 'HqmpIQ9l-uA';
var currentTitle = '草東沒有派對 No Party For Cao Dong - 大風吹 Simon Says【Official Music Video】';
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720',
        width: '1080',
        videoId: currentId,
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

function urlToId(str) {
    return str.split("v=")[1];
}

function onPlayerReady(event) {
    event.target.playVideo();
    console.log(event.target.getVideoData().title);
    currentTitle = event.target.getVideoData().title;
}

// var done = false;
function onPlayerStateChange(event) {
    if(event.data === YT.PlayerState.ENDED) {
        player.loadVideoById(currentId);
    } else if (event.data === YT.PlayerState.PLAYING) {
        
        currentTitle = event.target.getVideoData().title;
    } else if (event.data === YT.PlayerState.PAUSED) {

    } else if (event.data === YT.PlayerState.BUFFERING) {

    } else if (event.data === YT.PlayerState.CUED) {

    }
    // if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        
    //     done = true;
    // }
}
function stopVideo() {
    player.stopVideo();
}
