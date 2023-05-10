import React from "react";
import Feed from "./Feed";
import Post from "./Post";

const Home = () => {
  const [loader, setloader] = React.useState(false);
  return (
    <>
      <Post reload={loader} reloader={setloader} />
      <Feed reload={loader} />
    </>
  );
};

export default Home;
