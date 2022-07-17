<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  import wendale from "../assets/wendale.jpg";
  // import videojs css
  import "video.js/dist/video-js.css";
  // import videojs
  import videojs from "video.js";
  import "xhook/dist/xhook";
import axios from "axios";
  let link = "";
  let vjs = null;
  let videoPlayer = null;
  const options = {
    autoplay: true,
    controls: true,
    type: "application/x-mpegURL",
    fluid: true,
    poster: wendale,
  };

  onMount(() => {
    (async () => {
      const response = await crawlerAPI.fetchFlick().then((r) => r);
      link = response.sources[0].file;
      if (videoPlayer) {
        vjs = videojs(videoPlayer, options, () => {
          console.log("Player ready!");
        });
        await axios.get(link).then((r) => {
          // get the 3rd line
            const thirdLine = r.data.split("\n")[2];
            console.log("thirdLine", thirdLine);
            link = thirdLine;
        });
        vjs.src({
          src: link,
          type: "application/x-mpegURL",
        });
      }
    })();
  });
</script>

<div class="inner">
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
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
  }

  .grid-item {
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(0, 0, 0, 0.8);
    margin: 1em;
    text-align: center;
  }

  .responsive-iframe {
    width: 100%;
    height: 20em;
  }
</style>
