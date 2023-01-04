import { Api as APIRequest } from "./APIRequest";

const routes = {
  fetchAnime: async (keyword) => {
    return await APIRequest.post(
      `/v2/search-anime`,
      { search: keyword },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((r) => r.data);
  },
  fetchMovie: async (keyword) => {
    return await APIRequest.post(
      `/v2/search-flick`,
      { search: keyword },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((r) => r.data);
  },
  fetchSeries: async (keyword) => {
    return await APIRequest.post(
      `/v2/search-series`,
      { search: keyword },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    ).then((r) => r.data);
  },

  fetchAnimeEpisodes: async (id) => {
    return await APIRequest.get(`/v2/load-anime/${id}`).then((r) => r.data);
  },

  playAnimeEpisode: async (id) => {
    return await APIRequest.get(`/v2/play-anime/${id}`).then((r) => r.data);
  },
};

export default routes;