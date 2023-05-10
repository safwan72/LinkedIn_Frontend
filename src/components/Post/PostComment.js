import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PostComment = ({ comment }) => {
  const [profilePic, setprofilePic] = React.useState(null);
  React.useEffect(() => {
    if (comment) {
      setprofilePic(comment?.commenter?.profile_pic);
    }
  }, [comment]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "20px",
      }}
    >
      <Box
        component={Link}
        to={`/profile-selector/${comment?.commenter?.user?.id}/`}
        sx={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <Box sx={{ marginRight: "15px" }}>
          <img
            alt={comment?.commenter?.user?.username}
            src={profilePic}
            style={{
              width: 40,
              height: 40,
              objectFit: "contain",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box
          sx={{
            marginRight: "5px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body2" sx={{ mb: "3px" }}>
            {comment?.commenter?.user?.username}
          </Typography>
          <Typography variant="subtitle2">{comment?.comment_text}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PostComment;
