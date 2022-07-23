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
        });

      if (videoPlayer) {
        vjs.src({
          src: movieSource,
          type: "video/mp4",
        });

        vjs.on("timeupdate", () => {
          currentTime = vjs.currentTime();
        });
      }
    })();
  });

  // Interval after 1 hour to update the video source
  setInterval(() => {
    vjs.pause();
    console.log("Update video source");
    updateVideoSource();
  }, 3600000);

  // Update the video source
  const updateVideoSource = async () => {
    await crawlerAPI
      .fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`)
      .then((r) => {
        vjs.src({
          src: r.url,
          type: "video/mp4",
        });
        // convert the current time to the new video source
        vjs.load();
        vjs.currentTime(currentTime);
        vjs.play();
      });
  };
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
