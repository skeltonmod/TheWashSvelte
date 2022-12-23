<script>
  import crawlerAPI from "../api/api";
  let medias = [];
  let searchQuery = "";
  let type = "anime";
  const search = async (type = "anime") => {
    switch (type) {
      case "anime":
        crawlerAPI.fetchAnime({ search: searchQuery }).then((res) => {
          medias = res.map((item) => {
            return {
              title: item.title,
              // Only grab the /anime/ part of the url
              link: `/#/anime/${item.link}`,
            };
          });
        });
        break;
      case "movie":
        crawlerAPI.searchFlick({ search: searchQuery }).then((res) => {
          medias = res.map((item) => {
            return {
              title: item.title,
              // Only grab the /movie/ part of the url
              link: `/#${item.link}`,
            };
          });
        });
        break;
      case "tv":
        crawlerAPI.SearchSeries({ search: searchQuery }).then((res) => {
          medias = res.map((item) => {
            return {
              title: item.title,
              // Only grab the /movie/ part of the url
              link: `/#${item.link}`,
            };
          });
        });
        break;
    }
  };
</script>

<div class="inner">
  <div style="padding-top: 0.5em; padding-left: 1em;" class="center">
    <center>
      <h4>Fucking Media Sideloader Bullshit</h4>
    </center>
    <div class="form-group">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search"
        style="width: 50%;"
      />

      <button
        on:click={() => {
          search(type);
        }}
        class="btn btn-default"
      >
        Search
      </button>
    </div>
    <!-- <div class="form-group">
      <label for="select">Select Media Type:</label>
      <select
        id="select"
        name="select"
        bind:value={type}
        style="padding: 0.8em; background-color: black; color: white; font-family: inherit"
      >
        <option value="anime"> Anime </option>
        <option value="movie"> Movie </option>
        <option value="tv"> TV Series </option>
      </select>
    </div> -->
  </div>
  <ul>
    {#each medias as media}
      <li>
        > <a href={`${media.link}`}>
          <!-- <img src={anime.image} alt={anime.title} width="32" height="32"/> -->
          <span>{media.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
