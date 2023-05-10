import { Box } from "@mui/material";
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import baseURL from "../utils/baseurl";
import FeedPosts from "./FeedPosts";

const Feed = ({ reload }) => {
  const [allPosts, setallPosts] = React.useState([]);
  const { id, token } = useSelector((state) => state);
  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/post/allpost/${id}/`,
          header
        );
        if (!unmounted) {
          setallPosts(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [id, token, reload]);
  return (
    <Box
      sx={{
        marginTop: "20px",
        paddingBottom: "50px",
      }}
    >
      {allPosts && allPosts.length > 0 ? (
        allPosts?.map((item, i) => {
          return <FeedPosts item={item?.id} key={i} token={token} id={id} />;
        })
      ) : (
        <p>No Feed Posts</p>
      )}
    </Box>
  );
};

export default Feed;
