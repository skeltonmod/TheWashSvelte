import APIRequest from "../utils/APIRequest";

const crawlerAPI = {
    fetchAnime: async (data) => {
        return await APIRequest({
            url: "api/v2/search-anime",
            data,
            method: "POST",
        }).then((r) => {
            return r.data;
        });
    },

    fetchEpisode: async(episode) => {
        return await APIRequest({
            url: `api/anime/grab${episode}`,
            method: "GET",
        }).then((r) => {
            return r.data;
        });
    },

    fetchFlick: async(movie) => {
        return await APIRequest({
            url: `api/v2/load-flick${movie}`,
            method: "GET",
        }).then((r) => {
            return r.data;
        });
    },

    searchFlick: async(data) => {
        return await APIRequest({
            url: `api/v2/search-flick`,
            data,
            method: "POST",
        }).then((r) => {
            return r.data;
        });
    },

    SearchSeries: async(data) => {
        return await APIRequest({
            url: `api/v2/search-series`,
            data,
            method: "POST",
        }).then((r) => {
            return r.data;
        });
    },

    fetchEpisodes: async(link) => {
        return await APIRequest({
            url: `api/v2/load-series/tv-show/${link}`,
            method: "GET",
        }).then((r) => {
            return r.data;
        });
    },

    loadEpisode: async(data) => {
        return await APIRequest({
            url: `api/v2/load-episode`,
            data,
            method: "POST",
        }).then((r) => {
            return r.data;
        });
    },

    fetchEpisodeEmbedded: async(link) => {
        return await APIRequest({
            url: `api/v2/load-anime/${link}`,
            method: "GET",
        }).then((r) => {
            return r.data;
        });
    },

    loadEmbedded : async(data) => {
        return await APIRequest({
            url: `api/v2/play-anime`,
            data,
            method: "POST",
        }).then((r) => {
            return r.data;
        });
    }
}

export default crawlerAPI;