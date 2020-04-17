'use strict';

var id = new URLSearchParams(window.location.search).get('id');
var videoSrc1 = "https://video-wshls.langlive.com/live/".concat(id, "Y/playlist.m3u8");
var videoSrc2 = "https://video-tx.lv-play.com/live/".concat(id, "Y.m3u8");

function playVideo(video, src) {
  var Hls = window.Hls;

  if (Hls.isSupported()) {
    var hls = new Hls({
      liveBackBufferLength: 120,
      maxBufferLength: 10
    });
    hls.loadSource(src);
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
}

(function () {
  if (!id) {
    return;
  }

  var v = document.querySelector('video');
  fetch(videoSrc1).then(function (response) {
    playVideo(v, videoSrc1);
  }).catch(function () {
    playVideo(v, videoSrc2);
  });
})();
/*
fetch('https://video-wshls.langlive.com/live/2028726Y/playlist.m3u8').then((response) => {
	console.log(response.status);
});

fetch('https://video-wshls.langlive.com/live/3794774Y/playlist.m3u8').then((response) => {
	console.log(response.status);
}).catch(() => {
	console.log('error');
});*/