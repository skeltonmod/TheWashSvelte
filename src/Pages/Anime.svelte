<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  import wendale from "../assets/wendale.jpg";
  let episodes = [];
  let pages = [];
  let currentPage = 0;
  let videoSource = "";
  let videoPlayer = null;
  // import videojs css
  import "video.js/dist/video-js.css";
  // import videojs
  import videojs from "video.js";
  const options = {
    autoplay: true,
    controls: true,
    type: "application/x-mpegURL",
    fluid: true,
    poster: wendale,
  };
  let vjs = null;

  onMount(async () => {
    await crawlerAPI
      .fetchEpisodeEmbedded(String($location).split("/")[2])
      .then((r) => {
        episodes = r.map((item, index) => {
          return {
            id: index,
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
        return response;
      });

    // Init videojs
    if (videoPlayer) {
      vjs = videojs(videoPlayer, options, () => {
        console.log("Player ready!");
        episodes[0].selected = true;
      });
      vjs.src({
        src: firstEpisode.file,
        type:
          String(firstEpisode.file).split(".").pop() === "mp4"
            ? "video/mp4"
            : "application/x-mpegURL",
      });
    }
  });

  const grabEpisode = async (link, index) => {
    // change the selected property
    episodes[index].selected = true;

    console.log(episodes);
    await crawlerAPI.loadEmbedded({ link: link }).then((response) => {
      // Change iframe src
      console.log(response);
      // Check the end of the string if it has an mp4 extension

      vjs.src({
        src: response.file,
        type:
          String(response.file).split(".").pop() === "mp4"
            ? "video/mp4"
            : "application/x-mpegURL",
      });
    });
  };

  // Create a handler for page change
  const handlePageChange = (page) => {
    currentPage = page;
    episodes = pages[page];
  };
</script>

<div class="inner">
  <video-js
    bind:this={videoPlayer}
    width="600"
    height="300"
    class="vjs-default-skin"
    controls
  />

  <center>
    <div
      id="list"
      class="grid-container"
      style="cursor: pointer; backgroud-color: black"
    >
      {#each episodes as episode, index}
        <span
          class={`grid-item`}
          style={`${
            episode.selected ? "background-color: #1a95e0; color: #f7f8f6" : ""
          }`}
          on:click={() => {
            grabEpisode(episode.link, index);
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
