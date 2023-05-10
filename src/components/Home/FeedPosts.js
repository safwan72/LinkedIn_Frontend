import {
  Card,
  Box,
  Typography,
  CardHeader,
  IconButton,
  Avatar,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import axios from "axios";
import baseURL from "../utils/baseurl";
import PostDetail from "../Post/PostDetail";
import Spinner from "../utils/Spinner/Spinner";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditPost from "../Post/EditPost";
const FeedPosts = ({ item, token, id }) => {
  const [post, setpost] = React.useState(null);
  const [postPic, setpostPic] = React.useState(null);
  const [profilePic, setprofilePic] = React.useState(null);
  const [IfLiked, setIfLiked] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openEdit, setopenEdit] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  id = Number(id);
  const handleClickClose = () => {
    setOpen(false);
  };
  const handleOpenEdit = () => {
    setopenEdit(true);
  };
  const handleCloseEdit = () => {
    setopenEdit(false);
  };

  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (item && id) {
        const request = await axios.get(
          `${baseURL}api/post/getPostById/${item}/`,
          header
        );
        if (!unmounted) {
          setpost(request?.data);
          setpostPic(request?.data?.post_image);
          setprofilePic(request?.data?.author?.profile_pic);
          return request;
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, token, id, IfLiked, open]);

  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id && item) {
        const request = await axios.get(
          `${baseURL}api/post/checkIfLiked/${id}/${item}/`,
          header
        );
        if (!unmounted) {
          setIfLiked(request?.data);
          return request;
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [post, id, token, open, item]);
  return (
    <Card
      sx={{
        marginTop: "20px",
      }}
    >
      <CardHeader
        sx={{ cursor: "pointer" }}
        title={post?.author?.user?.username}
        subheader={moment(
          post?.upload_date ? post?.upload_date : new Date()
        ).format("MMM Do YY")}
        avatar={
          <Avatar
            aria-label={post?.author?.user?.username}
            title={post?.author?.user?.username}
            src={profilePic}
            component={Link}
            to={`/profile-selector/${post?.author?.user?.id}/`}
          />
        }
        action={
          id === post?.author?.user?.id ? (
            <IconButton aria-label="Edit" title="Edit" onClick={handleOpenEdit}>
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
      />
      {openEdit && (
        <EditPost
          token={token}
          myid={id}
          postId={post?.id}
          open={openEdit}
          handleClickClose={handleCloseEdit}
          updatePost={setpost}
        />
      )}
      {post ? (
        <Box>
          <Box sx={{ marginTop: "10px", marginLeft: "20px" }}>
            {open && (
              <PostDetail
                token={token}
                myid={id}
                postId={post?.id}
                open={open}
                handleClickClose={handleClickClose}
              />
            )}
            <Box sx={{ marginBottom: "8px" }}>
              <Typography
                variant="body2"
                onClick={handleClickOpen}
                sx={{ cursor: "pointer" }}
              >
                {post?.post_title}
              </Typography>
              {postPic ? (
                <Box sx={{ marginTop: "15px", marginBottom: "10px" }}>
                  <img
                    alt={post?.post_title}
                    src={postPic}
                    style={{
                      width: "100%",
                      height: 200,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ) : null}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Typography variant="body2" sx={{ marginRight: "10px" }}>
                  {post?.like_count} {post?.like_count > 1 ? "likes" : "like"}
                </Typography>
                <Typography variant="body2">
                  {post?.comment_count}{" "}
                  {post?.comment_count > 1 ? "comments" : "comment"}
                </Typography>
              </Box>
              <Box sx={{ my: "20px", display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: "15px",
                    cursor: "pointer",
                  }}
                >
                  {IfLiked ? (
                    <ThumbUpIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        const header = {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        };
                        async function fetchData() {
                          if (id) {
                            const request = await axios.get(
                              `${baseURL}api/post/removeLike/${id}/${post?.id}/`,
                              header
                            );
                            setIfLiked(request?.data);
                            return request;
                          }
                        }
                        fetchData();
                      }}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => {
                        const header = {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                        };
                        async function fetchData() {
                          if (id) {
                            const request = await axios.get(
                              `${baseURL}api/post/addLike/${id}/${post?.id}/`,
                              header
                            );
                            setIfLiked(request?.data);
                            return request;
                          }
                        }
                        fetchData();
                      }}
                    />
                  )}
                  <Typography variant="caption" sx={{ ml: "5px" }}>
                    Like
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <InsertCommentIcon />
                  <Typography variant="caption" sx={{ ml: "5px" }}>
                    Comment
                  </Typography>
                </Box>
                {/* <Box sx={{ marginLeft: "20px" }}>
                {item?.comment_count}{" "}
                {item?.comment_count > 1 ? "comments" : "comment"}
              </Box> */}
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Spinner />
      )}
    </Card>
  );
};

export default FeedPosts;
