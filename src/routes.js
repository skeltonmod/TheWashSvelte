import {wrap} from 'svelte-spa-router/wrap'
import Anime from './Pages/Anime.svelte';

// import Streamer from './Pages/Search.svelte';
import Home from './Pages/Home.svelte';
import Search from './Pages/Search.svelte';
import Movie from './Pages/Movie.svelte';

const routes = {
    '/': Home,

    // Using named parameters, with last being optional
    '/search': Search,

    '/anime/:query': Anime,
    '/movie/test': Movie,

    '*': Home,
}

export default routes;