<script>
  import crawlerAPI from "../api/api";
  let animes = [];
  let searchQuery = "";

  const searchAnime = async () => {
    crawlerAPI.fetchAnime({search: searchQuery}).then(res => {
      animes = res.map(item => {
        return {
          title: item.title,
          // Only grab the /anime/ part of the url
          link: item.link.split("/")[4],
        };
      });
      
    });
  };
</script>

<div class="inner">
  <div style="padding-top: 0.5em; padding-left: 1em;" class="center">
    <center>
      <h4>Anime Sideloader Bullshit</h4>
    </center>
    <div class="form-group">
      <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search"
      style="width: 80%;"
    />
    <button
      on:click={() => {
        searchAnime();
      }}
      class="btn btn-default"
    >
      Search
    </button>
    </div>
  </div>
  <ul>
    {#each animes as anime}
      <li>
        > <a
          href={`/#/anime/${anime.link}`}
        >
          <!-- <img src={anime.image} alt={anime.title} width="32" height="32"/> -->
          <span>{anime.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
