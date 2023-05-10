import React, { useMemo } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  Box,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import baseURL from "../utils/baseurl";
import { useSelector } from "react-redux";
import SingleChat from "./SingleChat";

// chat/history/
const ChatBox = ({ selectedUserID }) => {
  const [mymsg, setmymsg] = React.useState("");
  const [chatterProfile, setchatterProfile] = React.useState([]);
  const [myProfile, setmyProfile] = React.useState([]);
  const [chatterProfilePic, setchatterProfilePic] = React.useState(null);
  const [allmsg, setallmsg] = React.useState({
    data: [],
    count: 0,
  });
  const { id, token } = useSelector((state) => state);
  const client = useMemo(
    () =>
      new W3CWebSocket(`ws://127.0.0.1:8000/ws/chat/${id}/${selectedUserID}/`),
    [id, selectedUserID]
  );
  const onButtonClick = () => {
    // console.log("Send msg!");
    client.send(
      JSON.stringify({
        text: mymsg,
      })
    );
    setmymsg("");
  };
  React.useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      if (selectedUserID && id) {
        client.onopen = () => {
          // console.log("Connected");
        };
        client.onmessage = (message) => {
          const dataFromServer = JSON.parse(message?.data);
          // console.log(dataFromServer?.messages);
          if (
            dataFromServer?.messages &&
            dataFromServer?.messages !== undefined
          ) {
            let msgs = dataFromServer?.messages;
            setallmsg({ ...allmsg, data: msgs, count: 1 });
          } else {
            let newMsg = dataFromServer;
            // console.log(newMsg);
            let newMsgArray = allmsg?.data;
            setallmsg({ ...allmsg, data: [...newMsgArray, newMsg] });
          }
        };
        // setcounter(0);
      }
    }
    return () => {
      unmounted = true;
    };
  }, [id, selectedUserID, client, allmsg]);
  React.useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      async function fetchData() {
        const header = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        if (selectedUserID && id) {
          const request = await axios.get(
            `${baseURL}api/profile/getUserByID/${selectedUserID}/`,
            header
          );
          const request2 = await axios.get(
            `${baseURL}api/profile/getUserByID/${id}/`,
            header
          );
          setchatterProfile(request?.data);
          setmyProfile(request2?.data);
          setchatterProfilePic(request?.data?.profile_pic);
          return request;
        }
      }
      fetchData();
    }
    return () => {
      unmounted = true;
    };
  }, [selectedUserID, token, id]);
  // React.useEffect(() => {
  //   async function fetchData() {
  //     if (allmsg && allmsg?.data && allmsg?.data?.length > 0) {
  //       setallmsg({ ...allmsg, data: [...allmsg?.data?.reverse()] });
  //       return;
  //     }
  //   }
  //   fetchData();
  // }, [allmsg]);
  // console.log(first)
  // React.useEffect(() => {
  //   async function fetchData() {
  //     const header = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     if (id && selectedUserID) {
  //       const request = await axios.get(
  //         `${baseURL}api/chat/history/${id}/${selectedUserID}/`,
  //         header
  //       );
  //       setallMsgs(request?.data);
  //     }
  //   }
  //   fetchData();
  // }, [id, token, selectedUserID]);
  return (
    <Box sx={{ position: "relative" }}>
      <Card
        sx={{
          pb: "25px",
          boxShadow: "none",
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" src={chatterProfilePic}>
              {chatterProfile?.user?.username}
            </Avatar>
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={chatterProfile?.user?.username}
          subheader="Online"
        />
        <CardContent sx={{ height: "50vh", overflowY: "scroll", pb: "20px" }}>
          {allmsg && allmsg?.data?.length > 0 ? (
            allmsg?.data?.map((item, i) => {
              return (
                <SingleChat
                  profile={
                    item?.sender_id === myProfile?.id
                      ? myProfile
                      : chatterProfile
                  }
                  is_my_msg={item?.is_my_msg}
                  date={item?.time_created}
                  token={token}
                  text={item?.text}
                  key={i}
                />
              );
            })
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: "center", mt: "10px" }}
            >
              No Messages to Show
            </Typography>
          )}
        </CardContent>
      </Card>
      <Box
        sx={{
          mt: "15px",
          zIndex: 1000,
          width: "100%",
          padding: "15px",
          textAlign: "right",
        }}
      >
        <TextField
          type="text"
          size="small"
          sx={{ marginRight: "8px", mb: "10px" }}
          aria-label="Send Message"
          placeholder="Type something..."
          value={mymsg}
          onChange={(e) => {
            setmymsg(e.target.value);
          }}
          id="message-basic"
          label="Message"
          variant="outlined"
        />
        <Button variant="contained" onClick={onButtonClick}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatBox;
