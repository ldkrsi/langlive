'use strict';

const id = (new URLSearchParams(window.location.search)).get('id');
const videoSrc1 = `https://video-wshls.langlive.com/live/${id}Y/playlist.m3u8`;
const videoSrc2 = `https://video-tx.lv-play.com/live/${id}Y.m3u8`;


function playVideo(video, src) {
	const Hls = window.Hls;
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

	const v = document.querySelector('video');
	fetch(videoSrc1).then((response) => {
		playVideo(v, videoSrc1);
	}).catch(() => {
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