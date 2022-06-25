<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  // import OpenPlayerJS from "openplayerjs";
  // import "openplayerjs/dist/openplayer.css";
  import { Player, Hls, DefaultUi, Ui } from "@vime/svelte";
  let episodes = [];
  let pages = [];
  let currentPage = 0;
  let player = Player;
  let videoSource = "";

  onMount(async () => {
    await crawlerAPI
      .fetchEpisodeEmbedded(String($location).split("/")[2])
      .then((r) => {
        episodes = r.map((item) => {
          return {
            episode: item.episode,
            link: item.link,
            selected: false,
          };
        });
        pages = paginate(episodes, 20);

        episodes = pages[currentPage];
      });
    console.log("Episode 0", episodes[0]);
    const firstEpisode = await crawlerAPI
      .loadEmbedded({ link: episodes[0].link })
      .then((response) => {
        // Change iframe src
        videoSource = response.file;
      });
  });

  const grabEpisode = async (link) => {
    console.log(player);
    await crawlerAPI.loadEmbedded({ link: link }).then((response) => {
      // Change iframe src
      console.log(response);
      videoSource = response.file;
    });
  };

  // Create a handler for page change
  const handlePageChange = (page) => {
    currentPage = page;
    episodes = pages[page];
  };
</script>

<div class="inner">
  <Player controls>
    <Hls version="latest" crossOrigin={true}>
      <source data-src={videoSource} type="application/x-mpegURL" />
    </Hls>
    <!-- ... -->
    <Ui />
  </Player>

  <center>
    <div
      id="list"
      class="grid-container"
      style="cursor: pointer; backgroud-color: black"
    >
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
