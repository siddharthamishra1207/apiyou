// Channels.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Channels() {
  const [channels, setChannels] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    const fetchChannels = async () => {
      const options = {
        method: "GET",
        url: "https://youtube-media-downloader.p.rapidapi.com/v2/search/channels",
        params: {
          keyword: keyword,
        },
        headers: {
          "X-RapidAPI-Key": "4c8de3d60emsh10eb997cb43ce17p119a59jsn5f9a14a86e3c",
          "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setChannels(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChannels();
  }, [keyword]);

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Search:
          <input type="text" value={keyword} onChange={handleKeywordChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <h2>Channels:</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link to={`/channels/${channel.id}`}>{channel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;
