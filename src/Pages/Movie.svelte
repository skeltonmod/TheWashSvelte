<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  let movieSource = "";

  onMount(() => {
    (async () => {
      await crawlerAPI.fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`).then(r => {
        movieSource = r.link;
      })
    })();
  });
</script>

<div class="inner">
  
  <!-- svelte-ignore a11y-missing-attribute -->
  <iframe
    id="iframe-embed"
    scrolling="no"
    src={movieSource}
    allowfullscreen="allowfullscreen"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    width="100%"
    height="500"
    frameborder="0"
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
