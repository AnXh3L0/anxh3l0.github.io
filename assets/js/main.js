// Mobile menu

const menuTrigger = document.querySelector(".trigger");
const menu = document.querySelector("nav");
const mobileQuery = getComputedStyle(document.body).getPropertyValue(
  "--phoneWidth"
);
const isMobile = () => window.matchMedia(mobileQuery).matches;
const isMobileMenu = () => {
  menuTrigger && menuTrigger.classList.toggle("hidden", !isMobile());
  menu && menu.classList.toggle("hidden", isMobile());
};

isMobileMenu();

menuTrigger &&
  menuTrigger.addEventListener(
    "click",
    () => menu && menu.classList.toggle("hidden")
  );

window.addEventListener("resize", isMobileMenu);

// Toggle theme

const getTheme = window.localStorage && window.localStorage.getItem("theme");
const themeToggle = document.querySelector(".theme-toggle");
const isDark = getTheme === "dark";
var metaThemeColor = document.querySelector("meta[name=theme-color]");

if (getTheme !== null) {
  document.body.classList.toggle("dark-theme", isDark);
  isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  window.localStorage &&
    window.localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  document.body.classList.contains("dark-theme")
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa");
});

// Hire me box

// Check if the user already closed the notification
if (window.sessionStorage.getItem("hidden")) {
  document.getElementsByClassName("alert")[0].style.display = "none";
}

document.addEventListener("click", function (event) {
  if (!event.target.matches("button")) return;
  window.sessionStorage.setItem("hidden", true);
  document.getElementsByClassName("alert")[0].style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", function (event) {
    if (!event.target.matches("button")) return;
    document.getElementsByClassName("alert")[0].style.display = "none";
  });
});

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
    var div = document.createElement("div");
    div.setAttribute("data-id", videoId);
    var thumbNode = document.createElement("img");
    thumbNode.alt = videoTitle;
    thumbNode.src = "//i.ytimg.com/vi/ID/hqdefault.jpg".replace("ID", videoId);
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

document.addEventListener("DOMContentLoaded", initBBBVideos);
