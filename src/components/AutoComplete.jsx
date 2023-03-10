import { useContext, useEffect, useState } from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/watchListContext";

export const AutoComplete = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const { addStock } = useContext(WatchListContext);

  useEffect(() => {
    let isMount = true;
    const fetchData = async () => {
      try {
        const response = await finnHub.get("/search", {
          params: {
            q: search,
          },
        });
        if (isMount) {
          setResults(response.data.result);
        }
      } catch (error) {}
    };
    if (search.length > 0) {
      fetchData();
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04" }}
          id="search"
          type="text"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <label htmlFor="search">Search</label>
        <ul
          style={{
            maxHeight: "500px",
            overflowY: "auto",
            overflowX: "hidden",
            cursor: "pointer",
          }}
          className={`dropdown-menu ${search && "show"}`}
        >
          {results.map((result) => {
            return (
              <li
                key={result.symbol}
                className="dropdown-item"
                onClick={() => {
                  addStock(result.symbol);
                  setSearch("");
                }}
              >
                {result.description}({result.symbol})
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
