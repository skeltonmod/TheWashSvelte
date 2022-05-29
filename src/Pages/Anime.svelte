<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";

  let episodes = [];
  let videoEl = null;
  onMount(async () => {
    await crawlerAPI
      .fetchEpisodeEmbedded(String($location).split("/")[2])
      .then((r) => {
        episodes = r.map((item) => {
          return {
            episode: item.label,
            link: item.link.split("/")[4],
          };
        });
      });
  });

  const grabEpisode = async (link) => {
    console.log(link);
    await crawlerAPI.loadEmbedded({ link: link }).then((response) => {
      // Change iframe src
      document.getElementById("player").src = response[0].link;
    });
  };
</script>

<div class="inner">
  <iframe
    class="responsive-iframe"
    id="player"
    title="player"
    allowfullscreen="allowfullscreen"
    webkitallowfullscreen="true"
    mozallowfullscreen="true"
    scrolling="no"
    height="100%"
    width="100%"
  />
  <center>
    <div id="list" class="grid-container">
      {#each episodes as episode}
        <span
          class="grid-item"
          on:click={() => {
            grabEpisode(episode.link);
          }}>EP {episode.episode}</span
        >
      {/each}
    </div>
  </center>
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

  html:-moz-full-screen {
    background: red;
  }

  html:-webkit-full-screen {
    background: red;
  }

  html:-ms-fullscreen {
    background: red;
    width: 100%; /* needed to center contents in IE */
  }

  html:fullscreen {
    background: red;
  }
</style>
