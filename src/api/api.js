import APIRequest from "../utils/APIRequest";

const crawlerAPI = {
    fetchAnime: async (data) => {
        return await APIRequest({
            url: "api/anime/search",
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
    }
}

export default crawlerAPI;