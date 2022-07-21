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
      await crawlerAPI
        .fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`)
        .then((r) => {
          movieSource = r.url;
        });

      if (videoPlayer) {
        vjs = videojs(videoPlayer, options, () => {
          console.log("Player ready!");
        });
        vjs.src({
          src: movieSource,
          type: "video/mp4",
        });
      }
    })();
  });
</script>

<div class="inner">
  <!-- svelte-ignore a11y-missing-attribute -->
  <video-js
    bind:this={videoPlayer}
    width="600"
    height="300"
    class="vjs-default-skin"
    controls
  >
</video-js>
  <center />
</div>
