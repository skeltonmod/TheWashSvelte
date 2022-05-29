<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";

  let episodes = [];
  let videoEl = null;
  let pages = [];
  let currentPage = 0;
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
        pages = paginate(episodes, 20);
        
        episodes = pages[currentPage];
      });
  });

  const grabEpisode = async (link) => {
    console.log(link);
    await crawlerAPI.loadEmbedded({ link: link }).then((response) => {
      // Change iframe src
      document.getElementById("player").src = response[0].link;
    });
  };

  // Create a handler for page change
  const handlePageChange = (page) => {
    currentPage = page;
    episodes = pages[page];
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
    <!-- Paginate and display them in one line only -->
    <div class="pagination" style="justify-content: left">
      {#each pages as page, index}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="page-item"
          on:click={() => {
            // grabEpisode(page.link);
            handlePageChange(index);
          }}
        >
          {index + 1}
        </a>
      {/each}
    </div></center
  >
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
