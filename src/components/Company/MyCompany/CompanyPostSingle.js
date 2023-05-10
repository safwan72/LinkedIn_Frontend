import React from "react";
import Spinner from "../../utils/Spinner/Spinner";
import { Card, Box, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import axios from "axios";
import baseURL from "../../utils/baseurl";

const CompanyPostSingle = ({ item, id, token }) => {
  const [mylogo, setmylogo] = React.useState(null);
  const [post_photo, setpost_photo] = React.useState(null);
  const [IfLiked, setIfLiked] = React.useState(false);
  React.useEffect(() => {
    async function fetchData() {
      const header = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        axios
          .get(
            `${baseURL}api/organizations/checkLikedCompanyPost/${id}/${item?.id}/`,
            header
          )
          .then((res) => {
            if (res?.status === 200) {
              setIfLiked(res?.data);
            }
          })
          .catch((err) => {
            setIfLiked(false);
          });
      }
    }
    fetchData();
  }, [item, id, token]);
  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setmylogo(item?.company?.logo);
        setpost_photo(item?.photo);
      }
    }
    fetchData();
  }, [item]);
  return (
    <Grid item xs={12} sm={4} md={4}>
      <Card
      // sx={{
      //   marginTop: "20px",
      // }}
      >
        {item ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              component={Link}
              to={`/company/${item?.company?.id}/`}
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
                  alt={item?.company?.name}
                  src={mylogo}
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box sx={{ marginBottom: "5px" }}>
                <Typography variant="body2">{item?.company?.name}</Typography>
              </Box>
            </Box>
            <Box sx={{ marginTop: "10px", marginLeft: "20px" }}>
              {/* {open && (
                <PostDetail
                  token={token}
                  myid={id}
                  postId={post?.id}
                  open={open}
                  handleClickClose={handleClickClose}
                />
              )} */}
              <Box sx={{ marginBottom: "8px" }}>
                <Typography
                  variant="body2"
                  //   onClick={handleClickOpen}
                  sx={{ cursor: "pointer" }}
                >
                  {item?.title}
                </Typography>
                {post_photo ? (
                  <Box sx={{ marginTop: "15px", marginBottom: "10px" }}>
                    <img
                      alt={item?.title}
                      src={post_photo}
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
                    {item?.like_count} {item?.like_count > 1 ? "likes" : "like"}
                  </Typography>
                  <Typography variant="body2">
                    {item?.comment_count}{" "}
                    {item?.comment_count > 1 ? "comments" : "comment"}
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
                        // onClick={() => {
                        //   const header = {
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //       Authorization: `Bearer ${token}`,
                        //     },
                        //   };
                        //   async function fetchData() {
                        //     if (id) {
                        //       const request = await axios.get(
                        //         `${baseURL}api/post/removeLike/${id}/${post?.id}/`,
                        //         header
                        //       );
                        //       setIfLiked(request?.data);
                        //       return request;
                        //     }
                        //   }
                        //   fetchData();
                        // }}
                      />
                    ) : (
                      <ThumbUpOffAltIcon
                        sx={{ cursor: "pointer" }}
                        // onClick={() => {
                        //   const header = {
                        //     headers: {
                        //       "Content-Type": "application/json",
                        //       Authorization: `Bearer ${token}`,
                        //     },
                        //   };
                        //   async function fetchData() {
                        //     if (id) {
                        //       const request = await axios.get(
                        //         `${baseURL}api/post/addLike/${id}/${post?.id}/`,
                        //         header
                        //       );
                        //       setIfLiked(request?.data);
                        //       return request;
                        //     }
                        //   }
                        //   fetchData();
                        // }}
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

export default CompanyPostSingle;
