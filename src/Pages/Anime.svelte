<!-- svelte-ignore a11y-media-has-caption -->
<script>
  import { onMount } from "svelte";
  import { location } from "svelte-spa-router";
  import crawlerAPI from "../api/api";

  let episodes = [];
  let videoEl = null;
  onMount(async () => {
    // Get Query String
    await crawlerAPI
      .fetchAnime({ search: String($location).split("/")[2] })
      .then((r) => {
        episodes = r;
      });


  });

  const grabEpisode = async (link) => {
    await crawlerAPI.fetchEpisode(link).then((r) => {
        const player = document.getElementById('player')
        player.src = r.video_link;
    })
  }
</script>

<div class="inner">
  <video class="center" id="player" style="padding: 1em 1em 1em 1em;" controls autoplay/>
    <!-- <iframe id="player" height="100%" width="100%"></iframe> -->
  <center>
    <div id="list">
      {#each episodes as episode}
        <a
          href={`#${$location}`}
          on:click={() => {grabEpisode(episode.link)}}
          style="min-width: 59px; margin-top: 2em; margin-right 1em; margin-left: 1em"
          >EP {episode.episode}</a
        >
      {/each}
    </div>
  </center>
</div>
