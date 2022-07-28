<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  import wendale from "../assets/wendale.jpg";
  let vjs = null;
  let videoPlayer = null;
  let movieSource = "";
  let videoTrack = null;
  let currentTime = null;
  // import videojs css
  import "video.js/dist/video-js.css";
  // import videojs
  import videojs from "video.js";
  const options = {
    autoplay: true,
    controls: true,
    fluid: true,
    poster: wendale,
    type: "application/x-mpegURL",
  };

  onMount(() => {
    (async () => {
      vjs = videojs(videoPlayer, options, () => {
        console.log("Player ready!");
      });
      await crawlerAPI
        .fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`)
        .then((r) => {
          movieSource = r.url;
          videoTrack = r.subs[0];
        });

      if (videoPlayer) {
        vjs.src({
          src: movieSource,
        });
        vjs.addRemoteTextTrack(
          {
            kind: "captions",
            src: videoTrack.url,
            mode: "showing",
            label: videoTrack.label,
          },
          false
        );
      }
    })();
    vjs.on("waiting", function () {
      this.addClass("vjs-custom-waiting");
    });
    vjs.on("playing", function () {
      this.removeClass("vjs-custom-waiting");
    });
  });

  // Interval after 1 hour to update the video source
  // setInterval(() => {
  //   vjs.pause();
  //   console.log("Update video source");
  //   updateVideoSource();
  // }, 3600000);

  // Update the video source
  // const updateVideoSource = async () => {
  //   await crawlerAPI
  //     .fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`)
  //     .then((r) => {
  //       vjs.src({
  //         src: r.url,
  //         type: "video/mp4",
  //       });
  //       // convert the current time to the new video source
  //       vjs.load();
  //       vjs.currentTime(currentTime);
  //       vjs.play();
  //     });
  // };
</script>

<div class="inner">
  <!-- svelte-ignore a11y-missing-attribute -->
  <video-js
    bind:this={videoPlayer}
    width="600"
    height="300"
    class="vjs-default-skin"
    controls
  />
  <center />
</div>

<style>
  .video-js.vjs-paused:not(.vjs-has-started) .vjs-loading-spinner {
    display: block;
    visibility: visible;
  }

  .video-js.vjs-paused:not(.vjs-has-started) .vjs-loading-spinner,
  .video-js.vjs-paused:not(.vjs-has-started) .vjs-loading-spinner {
    -webkit-animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8)
        infinite,
      vjs-spinner-fade 1.1s linear infinite;
    animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
      vjs-spinner-fade 1.1s linear infinite;
  }
</style>
