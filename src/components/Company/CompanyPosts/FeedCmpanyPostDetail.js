import {
  Container,
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  TextField,
  Slide,
  IconButton,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Spinner from "../../utils/Spinner/Spinner";
import baseURL from "../../utils/baseurl";
import FeedCompanyPostComment from "./FeedCompanyPostComment";
import { makeStyles } from "@mui/styles";

// import PostComment from "./PostComment";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  boxDiv: {
    marginRight: "40px",
    marginBottom: "30px",
    height: "400px",
    [theme.breakpoints.down(600)]: {
      width: "350px",
      height: "350px",
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

const FeedCmpanyPostDetail = ({
  myid,
  token,
  postId,
  open,
  handleClickClose,
}) => {
  const [post, setpost] = React.useState([]);
  const [postComments, setpostComments] = React.useState([]);
  const [postCommentText, setpostCommentText] = React.useState("");
  const [postPic, setpostPic] = React.useState([]);
  const [profilePic, setprofilePic] = React.useState(null);
  const [IfLiked, setIfLiked] = React.useState(null);
  const [myProfile, setmyProfile] = React.useState(null);
  const [myProfilePic, setmyProfilePic] = React.useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();

  React.useEffect(() => {
    let unmounted = false;

    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (postId) {
        const request = await axios.get(
          `${baseURL}api/organizations/getCompanyPostByID/${postId}/`,
          header
        );
        if (!unmounted) {
          setpost(request?.data);
          setpostPic(request?.data?.photo);
          setprofilePic(request?.data?.company?.logo);
          setpostComments(request?.data?.comments);
          return request;
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [myid, token, postId, IfLiked]);
  React.useEffect(() => {
    let unmounted = false;
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (myid) {
        const request = await axios.get(
          `${baseURL}api/organizations/checkLikedCompanyPost/${myid}/${postId}/`,
          header
        );
        const request2 = await axios.get(
          `${baseURL}api/auth/profile/${myid}/`,
          header
        );
        if (!unmounted) {
          setmyProfile(request2?.data);
          setmyProfilePic(request2?.data?.profile_pic);
          setIfLiked(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [postId, myid, token]);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const handleComment = () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (myid) {
        const request = await axios.post(
          `${baseURL}api/organizations/addComment/${myid}/${postId}/`,
          {
            comment: postCommentText,
          },
          header
        );
        setpost(request?.data);
        setpostPic(request?.data?.photo);
        setprofilePic(request?.data?.company?.logo);
        setpostComments(request?.data?.comments);
        return request;
      }
    }
    fetchData();
    setpostCommentText("");
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullScreen={fullScreen}
      onClose={handleClickClose}
      fullWidth
      scroll="paper"
      maxWidth="md"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {handleClickClose ? (
          <IconButton
            aria-label="close"
            onClick={handleClickClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent>
        {post && post?.id ? (
          <Container sx={{ mt: "20px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              {postPic ? (
                <Box className={classes.boxDiv}>
                  <img
                    src={postPic}
                    alt={post?.company?.name}
                    width="100%"
                    height="100%"
                    // style={{ objectFit: "contain" }}
                  />
                </Box>
              ) : null}
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    component={Link}
                    to={`/company/${post?.company?.id}/`}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ marginRight: "15px" }}>
                      <img
                        alt={post?.company?.name}
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
                      <Typography variant="body2">
                        {post?.company?.name}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="body1">{post?.title}</Typography>
                  <Box
                    sx={{
                      mt: "40px",
                      mb: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ marginRight: "10px" }}>
                      {post?.like_count}{" "}
                      {post?.like_count > 1 ? "likes" : "like"}
                    </Typography>
                    <Typography variant="body2">
                      {post?.comment_count}{" "}
                      {post?.comment_count > 1 ? "comments" : "comment"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
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
                            async function fetchData() {
                              if (myid && postId) {
                                const request = await axios.post(
                                  `${baseURL}api/organizations/unlikeCompanyPost/`,
                                  {
                                    id: myid,
                                    post: postId,
                                  },
                                  header
                                );
                                setIfLiked(request?.data);
                              }
                            }
                            fetchData();
                          }}
                        />
                      ) : (
                        <ThumbUpOffAltIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            async function fetchData() {
                              if (myid && postId) {
                                const request = await axios.post(
                                  `${baseURL}api/organizations/likeCompanyPost/`,
                                  {
                                    id: myid,
                                    post: postId,
                                  },
                                  header
                                );
                                setIfLiked(request?.data);
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
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: "20px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: "10px",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ marginRight: "15px" }}>
                      <img
                        alt={myProfile?.user?.username}
                        src={myProfilePic}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "contain",
                          borderRadius: "50%",
                        }}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: 200,
                      maxWidth: 300,
                    }}
                  >
                    <TextField
                      id="comment-basic"
                      label="comment"
                      variant="outlined"
                      size="small"
                      value={postCommentText}
                      fullWidth
                      onChange={(e) => {
                        setpostCommentText(e.target.value);
                      }}
                    />
                  </Box>

                  <Button
                    size="small"
                    sx={{ ml: "3px" }}
                    onClick={() => {
                      handleComment();
                    }}
                  >
                    Post
                  </Button>
                </Box>
                <Box sx={{ mb: "25px" }}>
                  {postComments &&
                    postComments?.map((item, i) => {
                      return <FeedCompanyPostComment comment={item} key={i} />;
                    })}
                </Box>
              </Box>
            </Box>
          </Container>
        ) : (
          <Spinner />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeedCmpanyPostDetail;
