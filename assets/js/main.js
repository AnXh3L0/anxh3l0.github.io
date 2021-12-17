// Embeds

function embedIframe(div) {
  let iframe = document.createElement("iframe");
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
  let playerElements = document.getElementsByClassName("youtube-player");
  for (let n = 0; n < playerElements.length; n++) {
    let videoId = playerElements[n].dataset.id;
    let videoTitle = playerElements[n].dataset.title;
    let videoLang = playerElements[n].dataset.lang;
    let thumbImage = playerElements[n].dataset.thumb;
    let div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    div.setAttribute("data-thumb", thumbImage);
    div.setAttribute("data-lang", videoLang);
    let thumbNode = document.createElement("img");
    thumbNode.setAttribute("loading", "lazy");
    thumbNode.alt = videoTitle;
    thumbNode.src = "/img/thumbs/" + thumbImage;
    div.appendChild(thumbNode);
    let thumbLang = document.createElement("div");
    thumbLang.innerText = "Audio language in " + videoLang;
    thumbLang.setAttribute("class", "language");
    div.appendChild(thumbLang);
    let playButton = document.createElement("button");
    playButton.setAttribute("class", "play");
    playButton.setAttribute("type", "button");
    playButton.setAttribute("aria-label", "Play video");
    div.appendChild(playButton);
    div.onclick = function () {
      embedIframe(this);
    };
    playerElements[n].appendChild(div);
  }
}

document.addEventListener("DOMContentLoaded", initYouTubeVideos);

function embedVideo(div) {
  let iframe = document.createElement("iframe");
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
  let playerElements = document.getElementsByClassName("player");
  for (let n = 0; n < playerElements.length; n++) {
    let domain = playerElements[n].dataset.domain;
    let videoId = playerElements[n].dataset.id;
    let videoTitle = playerElements[n].dataset.title;
    let videoLang = playerElements[n].dataset.lang;
    let thumbImage = playerElements[n].dataset.thumb;
    let timestamp = playerElements[n].dataset.timestamp;
    let div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    div.setAttribute("data-domain", domain);
    div.setAttribute("data-thumb", thumbImage);
    div.setAttribute("data-lang", videoLang);
    div.setAttribute("data-timestamp", timestamp);
    let thumbNode = document.createElement("img");
    thumbNode.setAttribute("loading", "lazy");
    thumbNode.alt = videoTitle;
    thumbNode.src = "/img/thumbs/" + thumbImage;
    div.appendChild(thumbNode);
    let thumbLang = document.createElement("div");
    thumbLang.innerText = "Audio language in " + videoLang;
    thumbLang.setAttribute("class", "language");
    div.appendChild(thumbLang);
    let playButton = document.createElement("button");
    playButton.setAttribute("class", "play");
    playButton.setAttribute("type", "button");
    playButton.setAttribute("aria-label", "Play video");
    div.appendChild(playButton);
    div.onclick = function () {
      embedVideo(this);
    };
    playerElements[n].appendChild(div);
  }
}

function changeCSS() {
  let yt = document.getElementsByClassName("youtube-player");
  let bbb = document.getElementsByClassName("player");
  let links = document.getElementsByClassName("nojs-video");
  for (let i=0;i<yt.length;i+=1){
    yt[i].style.display = 'block';
  }
  for (let j=0;j<bbb.length;j+=1){
    bbb[j].style.display = 'block';
  }
  for (let k=0;k<links.length;k+=1){
    links[k].style.display = 'none';
  }
}

document.addEventListener("DOMContentLoaded", initBBBVideos);
document.addEventListener("DOMContentLoaded", changeCSS);

document.querySelectorAll('.play').forEach(item => {
  item.addEventListener('keyup', event => {
    event.preventDefault();
    if (event.keyCode == 13) {
      event.click();
    }
  });
});