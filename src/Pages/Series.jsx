import { useEffect, useState, useImperativeHandle, useRef } from "preact/hooks";
import routes from "../api/APIRoutes";
// import { PlayerEvent, Player, PlayerOptions } from '@oplayer/core'
import ui from "@oplayer/ui";
import hls from "@oplayer/hls";
import ReactPlayer from "@oplayer/react";
import Wendale from "../assets/wendale.jpg";
import paginate from "../utils/paginate";

import "../index.css";

export default function Series() {
  const _ref = useRef(null);
  const [currentEpisode, setCurrentEpisode] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  const plugins = [
    ui({
      pictureInPicture: true,
      slideToSeek: "always",
      screenshot: true,
      keyboard: { global: true },
    }),
    hls(),
  ];

  const playEpisode = async (id, index) => {
    setCurrentEpisode(id);
    await routes.playAnimeEpisode(id).then((res) => {
      _ref.current.changeSource({ src: res?.sources[0]?.url, poster: Wendale });
      
    });
  };

  useEffect(async () => {
    await routes
      .fetchTVEpisodes(window.location.pathname.split("/")[2])
      .then((r) => {
        setPages(r);
        (async () => {
          await routes.playTVEpisode(r[0][0].id).then((res) => {
            _ref.current.changeSource({ src: res?.sources[0]?.url, poster: Wendale });
            setCurrentEpisode(r[0].id);
          });
        })();
      });
  }, []);

  return (
    <div class="inner">
      <ReactPlayer
        ref={_ref}
        plugins={plugins}
        poster={Wendale}
        autoplay={true}
      />
      <div
        id="list"
        class="grid-container"
        style="cursor: pointer; backgroud-color: black"
      >
        {pages[currentPage]?.map((item, index) => {
          return (
            <span
              class={`grid-item`}
              style={`${
                item.selected ? "background-color: #1a95e0; color: #f7f8f6" : ""
              }`}
              onClick={() => {
                // console.log(item.id)
                playEpisode(item.id, index);
              }}
            >
              EP {item.number}
            </span>
          );
        })}
      </div>
      <div class="pagination" style="justify-content: left">
        <span>Pages: </span>
        {pages.map((item, index) => {
          return (
            <a
              class="page-item"
              style={`margin-right: 0.5em`}
              onClick={(e) => {
                console.log("Current Page", index);
                setCurrentPage(index);
              }}
            >
              {index + 1}
            </a>
          );
        })}
      </div>
    </div>
  );
}
