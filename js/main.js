'use strict';

var video = document.querySelector('video');
var videoSrc = "https://video-wshls.langlive.com/live/".concat(new URLSearchParams(window.location.search).get('id'), "Y/playlist.m3u8");
var Hls = window.Hls;

if (Hls.isSupported()) {
  var hls = new Hls({
    liveBackBufferLength: 120,
    maxBufferLength: 10
  });
  hls.loadSource(videoSrc);
  hls.attachMedia(video);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    video.play();
  });
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = videoSrc;
  video.addEventListener('loadedmetadata', function () {
    video.play();
  });
}