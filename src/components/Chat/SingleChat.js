import { Box, Typography } from "@mui/material";
import React from "react";

const SingleChat = ({ profile, token, text, is_my_msg, date }) => {
  const [chatterProfile, setchatterProfile] = React.useState([]);
  const [chatterProfilePic, setchatterProfilePic] = React.useState(null);
  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      if (profile) {
        if (!unmounted) {
          setchatterProfile(profile);
          setchatterProfilePic(profile?.profile_pic);
          return;
        }
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [profile, is_my_msg, token]);
  function getDate(givendate) {
    if (givendate) {
      const Yearoptions = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      };
      const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      };
      const currentDatetime = new Date(givendate);
      let formattedDate =
        currentDatetime.toLocaleDateString("en-US", Yearoptions) +
        "," +
        currentDatetime.toLocaleTimeString("en-US", options);

      return formattedDate;
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        my: "10px",
      }}
    >
      <Box sx={{ mr: "8px" }}>
        <img
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            borderRadius: "50%",
          }}
          src={chatterProfilePic}
          alt={chatterProfile?.user?.username}
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="subtitle2">
          {chatterProfile?.user?.username} . <span></span>
          {getDate(date)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleChat;
