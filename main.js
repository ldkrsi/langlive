'use strict';

const video = document.querySelector('video');
const videoSrc = `https://video-wshls.langlive.com/live/${(new URLSearchParams(window.location.search)).get('id')}Y/playlist.m3u8`;
const Hls = window.Hls;

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