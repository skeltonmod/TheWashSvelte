<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import crawlerAPI from "../api/api";
  let movieSource = "";

  onMount(() => {
    (async () => {
      await crawlerAPI
        .fetchFlick(`/movie/${String(document.location.hash).split("/")[2]}`)
        .then((r) => {
          movieSource = r.link;
        });
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
