import { useEffect, useState, useImperativeHandle, useRef } from "preact/hooks";
import routes from "../api/APIRoutes";
// import { PlayerEvent, Player, PlayerOptions } from '@oplayer/core'
import ui from "@oplayer/ui";
import hls from "@oplayer/hls";
import ReactPlayer from "@oplayer/react";
import Wendale from "../assets/wendale.jpg";

import "../index.css";

export default function Movie() {
  const _ref = useRef(null);
  const plugins = [
    ui({
      pictureInPicture: true,
      slideToSeek: "always",
      screenshot: true,
      keyboard: { global: true },
    }),
    hls(),
  ];
  useEffect(async () => {
    await routes
      .playMovie(window.location.pathname.split("/")[2])
      .then((res) => {
            _ref.current.changeSource({ src: res?.sources[0]?.url, poster: Wendale });
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
    </div>
  );
}
