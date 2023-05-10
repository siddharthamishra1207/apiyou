import React, { useState, useEffect } from "react";
import axios from "axios";

function ChannelsList({ channels, handleChannelClick }) {
  return (
    <div>
      <h2>Channels:</h2>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} onClick={() => handleChannelClick(channel.id)}>
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SelectedChannelDetails({ selectedChannel }) {
  return (
    <div>
      <h2>Selected Channel:</h2>
      {selectedChannel && (
        <div>
          <div>Name: {selectedChannel.name}</div>
          <div>Description: {selectedChannel.description}</div>
          <div>Subscribers: {selectedChannel.subscriberCount}</div>
          <div>Views: {selectedChannel.viewCount}</div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleChannelClick = async (channelId) => {
    const options = {
      method: "GET",
      url: "https://youtube-media-downloader.p.rapidapi.com/v2/channel/details",
      params: {
        channelId: channelId,
      },
      headers: {
        // "X-RapidAPI-Key": "4c8de3d60emsh10eb997cb43ce17p119a59jsn5f9a14a86e3c",
        // "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
        'X-RapidAPI-Key': '4bf1607cb8msh5e699065c14b788p1db63bjsna38fb7cc197a',
    'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'

      },
    };

    try {
      const response = await axios.request(options);
      setSelectedChannel(response.data);
    } catch (error) {
      console.error(error);
    }
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
          // "X-RapidAPI-Key": "4bf1607cb8msh5e699065c14b788p1db63bjsna38fb7cc197a",
          // "X-RapidAPI-Host": "youtube-media-downloader.p.rapidapi.com",
          'X-RapidAPI-Key': '4bf1607cb8msh5e699065c14b788p1db63bjsna38fb7cc197a',
    'X-RapidAPI-Host': 'youtube-media-downloader.p.rapidapi.com'
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
      <h1>Channels</h1>
      <form onSubmit={(event) => event.preventDefault()}>
        <label>
          Search:
          <input type="text" value={keyword} onChange={handleKeywordChange} />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ChannelsList channels={channels} handleChannelClick={handleChannelClick} />

      <SelectedChannelDetails selectedChannel={selectedChannel} />
    </div>
  );
}

export default App;
