'use strict';

function playVideo(video, src) {
	const Hls = window.Hls;
	if (Hls.isSupported()) {
		var hls = new Hls({
			liveBackBufferLength: 30,
			maxBufferLength: 6,
			liveSyncDuration: 1,
			liveMaxLatencyDuration: 6,
			liveDurationInfinity: true
		});
		hls.loadSource(src);
		hls.attachMedia(video);
		hls.on(Hls.Events.MANIFEST_PARSED, function () {
			video.play();
		});
	} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
		video.src = src;
		video.addEventListener('loadedmetadata', function () {
			video.play();
		});
	}
}

(function () {
	const url = new URL(location.href);
	const id = url.searchParams.get('id');

	if (!id) {
		return;
	}
	document.getElementById('input').value = id;

	const videoSrc1 = `https://video-wshls.langlive.com/live/${id}Y/playlist.m3u8`;
	const videoSrc2 = `https://video-tx.lv-play.com/live/${id}Y.m3u8`;

	const v = document.querySelector('video');
	fetch(videoSrc1).then(() => {
		playVideo(v, videoSrc1);
	}).catch(() => {
		playVideo(v, videoSrc2);
	});
})();
