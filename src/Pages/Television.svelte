<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";
  import paginate from "../utils/Paginate";
  import wendale from "../assets/wendale.jpg";
  let seasons = [];
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
    type: "video/mp4",
    fluid: true,
    poster: wendale,
  };
  let vjs = null;

  onMount(async () => {
    const links = await crawlerAPI
      .fetchEpisodes(String($location).split("/")[2])
      .then((r) => {
        return r;
      });
    seasons = links;

    episodes = seasons[0].episodes.map((item) => {
      return {
        id: item.id,
        name: item.name,
        video_id: item.videos,
        selected: false,
      };
    });

    vjs = videojs(videoPlayer, options, () => {
      console.log("Player ready!");
      episodes[0].selected = true;
    });

    const firstEpisode = await crawlerAPI
      .loadEpisode({ id: episodes[0].video_id })
      .then((response) => {
        // Change iframe src
        return response;
      });
    if (videoPlayer) {
      vjs.src({
        src: firstEpisode.url,
        type: "video/mp4",
      });
    }
  });

  const grabEpisode = async (video_id, index) => {
    // change the selected property
    episodes[index].selected = true;

    console.log(episodes);
    await crawlerAPI.loadEpisode({ id: video_id }).then((response) => {
      console.log(response);
      vjs.src({
        src: response.url,
        type: "video/mp4",
      });
    });
  };

  const handlePageChange = (page) => {
    // currentPage = page;
    episodes = seasons[page].episodes.map((item) => {
      return {
        id: item.id,
        name: item.name,
        video_id: item.videos,
        selected: false,
      };
    });
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
            episode.selected ? "background-color: #1a95e0; color: #f7f8f6;" : ""
          } height: 25px; white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;`}
          on:click={() => {
            grabEpisode(episode.video_id, index);
          }}>EP {index + 1}: {episode.name}</span
        >
      {/each}
    </div>
    <!-- Paginate and display them in one line only -->
    <div class="pagination" style="justify-content: left">
      {#each seasons as page, index}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a
          class="page-item"
          on:click={() => {
            // grabEpisode(page.link);
            handlePageChange(index);
          }}
        >
          {page.name}
        </a>
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
</style>
