'use strict';

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
  var url = new URL(location.href);
  var id = url.searchParams.get('id');

  if (!id) {
    return;
  }

  var videoSrc1 = "https://video-wshls.langlive.com/live/".concat(id, "Y/playlist.m3u8");
  var videoSrc2 = "https://video-tx.lv-play.com/live/".concat(id, "Y.m3u8");
  var v = document.querySelector('video');
  fetch(videoSrc1).then(function () {
    playVideo(v, videoSrc1);
  }).catch(function () {
    playVideo(v, videoSrc2);
  });
  document.getElementById('input').value = id;
  document.getElementById('change-btn').addEventListener('click', function () {
    var value = document.getElementById('input').value;

    if (value) {
      url.searchParams.set('id', value);
      window.location = url.toString();
    }
  });
})();