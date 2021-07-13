// Embeds

function embedIframe(div) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    "https://www.youtube-nocookie.com/embed/" +
      div.dataset.id +
      "?autoplay=1&rel=0"
  );
  iframe.setAttribute("title", div.dataset.title);
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("allowfullscreen", "1");
  iframe.setAttribute("modestbranding", "1");
  iframe.setAttribute(
    "allow",
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  );
  div.parentNode.replaceChild(iframe, div);
}

function initYouTubeVideos() {
  var playerElements = document.getElementsByClassName("youtube-player");
  for (var n = 0; n < playerElements.length; n++) {
    var videoId = playerElements[n].dataset.id;
    var videoTitle = playerElements[n].dataset.title;
    var thumbImage = playerElements[n].dataset.thumb;
    var div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    div.setAttribute("data-thumb", thumbImage);
    var thumbNode = document.createElement("img");
    thumbNode.setAttribute("loading", "lazy");
    thumbNode.alt = videoTitle;
    thumbNode.src = "/img/thumbs/image".replace("image", thumbImage);
    div.appendChild(thumbNode);
    var playButton = document.createElement("div");
    playButton.setAttribute("class", "play");
    div.appendChild(playButton);
    div.onclick = function () {
      embedIframe(this);
    };
    playerElements[n].appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", initYouTubeVideos);

function embedVideo(div) {
  var iframe = document.createElement("iframe");
  iframe.setAttribute(
    "src",
    "https://" +
      div.dataset.domain +
      "/playback/presentation/2.0/playback.html" +
      "?meetingId=" +
      div.dataset.id +
      "&t=" +
      div.dataset.timestamp
  );
  div.parentNode.replaceChild(iframe, div);
}

function initBBBVideos() {
  var playerElements = document.getElementsByClassName("player");
  for (var n = 0; n < playerElements.length; n++) {
    var domain = playerElements[n].dataset.domain;
    var videoId = playerElements[n].dataset.id;
    var videoTitle = playerElements[n].dataset.title;
    var thumbImage = playerElements[n].dataset.thumb;
    var timestamp = playerElements[n].dataset.timestamp;
    var div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    div.setAttribute("data-domain", domain);
    div.setAttribute("data-thumb", thumbImage);
    div.setAttribute("data-timestamp", timestamp);
    var thumbNode = document.createElement("img");
    thumbNode.setAttribute("loading", "lazy");
    thumbNode.alt = videoTitle;
    thumbNode.src = "/img/thumbs/image".replace("image", thumbImage);
    div.appendChild(thumbNode);
    var playButton = document.createElement("div");
    playButton.setAttribute("class", "play");
    div.appendChild(playButton);
    div.onclick = function () {
      embedVideo(this);
    };
    playerElements[n].appendChild(div);
  }
}

function changeCSS() {
  var yt = document.getElementsByClassName("youtube-player");
  var bbb = document.getElementsByClassName("player");
  var links = document.getElementsByClassName("nojs-video");
  for (var i=0;i<yt.length;i+=1){
    yt[i].style.display = 'block';
  }
  for (var j=0;j<bbb.length;j+=1){
    bbb[j].style.display = 'block';
  }
  for (var k=0;k<links.length;k+=1){
    links[k].style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", initBBBVideos);
document.addEventListener("DOMContentLoaded", changeCSS);