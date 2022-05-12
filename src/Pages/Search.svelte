<script>
  import * as animeList from "../utils/animelist";
  import {link} from 'svelte-spa-router';
  let animes = [];
  let searchQuery = "";
  let isRomaji = true;
  let animeName = "";

  const searchAnime = async () => {
    animeList
      .alRequest({
        name: searchQuery,
        method: "SearchName",
      })
      .then((item) => {
        animes = item.data.Page.media.slice(0, 10).map((item) => {
          return {
            id: item.id,
            // remove non alphanumeric characters except for dash
            title: isRomaji ? item.title.romaji : item.title.english,
            image: item.coverImage.extraLarge,
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
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search"
      class="ym-button ym-primary ym-small"
    />
    <input
      on:click={() => {
        searchAnime();
      }}
      value="Search"
      type="button"
    />
    <input type="radio" id="english" on:click={() => {isRomaji = false; console.log(isRomaji)}} name="preferred_title" value="english" />
    <label for="css">English</label>
    <input
      type="radio"
      id="romaji"
      name="preferred_title"
      value="romaji"
      on:click={() => {isRomaji = true; console.log(isRomaji)}}
    />
    <label for="javascript">Romaji</label>
  </div>
  <ul>
    {#each animes as anime}
      <li>
        > <a href="/#/anime/{String(anime.title).split(" ").join('-').toLowerCase().replace(/[^\w-]/g, "")}">
          <!-- <img src={anime.image} alt={anime.title} width="32" height="32"/> -->
          <span>{anime.title}</span>
        </a>
      </li>
    {/each}
  </ul>
</div>
