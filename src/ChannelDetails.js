import React from "react";

function ChannelDetails(props) {
  const { name, description, subscriberCount, viewCount } = props;

  return (
    <div>
      <h2>Channel Details:</h2>
      <div>Name: {name}</div>
      <div>Description: {description}</div>
      <div>Subscribers: {subscriberCount}</div>
      <div>Views: {viewCount}</div>
    </div>
  );
}

export default ChannelDetails;
