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
console.log(list)
if(list === null) {
    console.log("list is null...");
}
list.addEventListener('click', function(ev) {
    if(ev.target.tagName == 'LI') {
        ev.target.classList.toggle('checked'); // 點下去之後變成 "checked"
    }
}, false);

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
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
}


var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '720',
        width: '1080',
        videoId: 'HqmpIQ9l-uA',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    console.log(event.target.getVideoData().title);
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}
