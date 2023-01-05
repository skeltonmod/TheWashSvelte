import { useEffect, useState } from "preact/hooks";
import routes from "../api/APIRoutes";

export default function Search() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("anime");
  const [result, setResult] = useState([]);
  const handleSearch = async () => {
    switch (type) {
      case "anime":
        await routes.fetchAnime(query).then((r) => setResult(r));
        break;
      case "tv":
        await routes.fetchSeries(query).then((r) => setResult(r));
        break;
      case "movie":
        await routes.fetchMovie(query).then((r) => setResult(r));
        break;
    }
  };
  useEffect(() => {
    console.log(result);
  }, [result]);

  return (
    <div class="inner">
      <div style="padding-top: 0.5em; padding-left: 1em;" class="center">
        <center>
          <h4>Fucking Media Sideloader Bullshit</h4>
        </center>
        <div class="form-group">
          <input
            type="text"
            onInput={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Search"
            style="width: 50%;"
          />

          <button class="btn btn-default" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <ul>
        {result.map((item) => {
          return (
            <li>
              <a href={`${window.origin}/${item.id}`}>
                <span>{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
