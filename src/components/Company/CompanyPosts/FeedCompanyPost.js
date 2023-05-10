import axios from "axios";
import React from "react";
import baseURL from "../../utils/baseurl";
import Spinner from "../../utils/Spinner/Spinner";
import { Card, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import moment from "moment";
import FeedCmpanyPostDetail from "./FeedCmpanyPostDetail";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  boxDiv: {
    margin: "auto",
    marginTop: "15px",
    marginBottom: "10px",
    width: "600px",
    padding: "2rem",
    height: "400px",
    [theme.breakpoints.down(600)]: {
      width: "350px",
      height: "350px",
      padding: "1.5rem",
      margin: "10px auto",
    },
    [theme.breakpoints.down(450)]: {
      width: "100%",
      height: "200px",
      margin: "auto",
      marginBottom: "20px",
    },
  },
}));
const FeedCompanyPost = ({ item, id, token }) => {
  const [post, setpost] = React.useState(null);
  const [postPic, setpostPic] = React.useState(null);
  const [profilePic, setprofilePic] = React.useState(null);
  const [IfLiked, setIfLiked] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
  };
  const style = useStyles();
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
          `${baseURL}api/organizations/getCompanyPostByID/${item}/`,
          header
        );
        if (!unmounted) {
          setpost(request?.data);
          setpostPic(request?.data?.photo);
          setprofilePic(request?.data?.company?.logo);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, token, id, IfLiked, open]);

  React.useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let unmounted = false;
    async function fetchData() {
      if (id && item) {
        const request = await axios.get(
          `${baseURL}api/organizations/checkLikedCompanyPost/${id}/${item}/`,
          header
        );
        if (!unmounted) {
          setIfLiked(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [post, id, token, open, item]);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleFollowPage = () => {
    async function fetchData() {
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/likeCompanyPost/`,
          {
            id: id,
            post: item,
          },
          header
        );
        setIfLiked(request?.data);
      }
    }
    fetchData();
  };
  const handleUnFollowPage = () => {
    async function fetchData() {
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/unlikeCompanyPost/`,
          {
            id: id,
            post: item,
          },
          header
        );
        setIfLiked(request?.data);
      }
    }
    fetchData();
  };
  return (
    <Grid item xs={12}>
      <Card
        sx={{
          marginTop: "20px",
        }}
      >
        {post ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              component={Link}
              to={`/company/${post?.company?.id}/`}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "15px",
                marginTop: "10px",
                alignItems: "center",
                py: "10px",
              }}
            >
              <Box sx={{ marginRight: "15px" }}>
                <img
                  alt={post?.author?.user?.username}
                  src={profilePic}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <Typography variant="body2">{post?.company?.name}</Typography>
                <Typography variant="caption">
                  {moment(
                    post?.upload_date ? post?.upload_date : new Date()
                  ).format("MMM Do YY")}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "10px", marginLeft: "20px" }}>
              {open && (
                <FeedCmpanyPostDetail
                  token={token}
                  myid={id}
                  postId={post?.id}
                  open={open}
                  handleClickClose={handleClickClose}
                />
              )}
              <Box sx={{ marginBottom: "8px", paddingRight: "15px" }}>
                <Typography
                  variant="body2"
                  onClick={handleClickOpen}
                  sx={{ cursor: "pointer" }}
                >
                  {post?.title}
                </Typography>
                {postPic ? (
                  <Box className={style.boxDiv}>
                    <img
                      alt={post?.post_title}
                      src={postPic}
                      style={{
                        width: "100%",
                        height: "100%",
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
                        onClick={() => handleUnFollowPage()}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleFollowPage()}
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
    </Grid>
  );
};

export default FeedCompanyPost;
