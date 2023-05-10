import {
  Container,
  Grid,
  Typography,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Card,
  CardHeader,
} from "@mui/material";
import axios from "axios";
import React from "react";
import ChatBox from "../components/Chat/ChatBox";
import baseURL from "../components/utils/baseurl";
import Base from "./Base";

const Message = ({ token, id }) => {
  const [users, setusers] = React.useState([]);
  const [selectedUser, setselectedUser] = React.useState(null);
  React.useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/chat/getMyChatConnections/${id}/`,
          header
        );
        setusers(request?.data);
        return request;
      }
    }
    fetchData();
  }, [id, token]);
  return (
    <Base>
      <Container maxWidth="lg" sx={{ mt: 4, pb: 8 }}>
        <Card sx={{ minHeight: "50vh" }}>
          <CardHeader title="Messaging" sx={{ ml: "15px", mt: "15px" }} />
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={6} md={4}>
              {users && users?.length > 0 ? (
                users?.map((item, i) => {
                  return (
                    <ChatUsers
                      item={item}
                      key={i}
                      id={item?.user?.id}
                      setselectedUser={setselectedUser}
                    />
                  );
                })
              ) : (
                <Typography variant="body2" sx={{ ml: "30px", my: "20px" }}>
                  No Conections Yet
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              {selectedUser && selectedUser !== null ? (
                <ChatBox selectedUserID={selectedUser} />
              ) : (
                <Typography
                  variant="h6"
                  sx={{ textAlign: "center", mt: "40px" }}
                >
                  No Message to Show
                </Typography>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Base>
  );
};

export default Message;

const ChatUsers = ({ item, id, setselectedUser }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [work, setwork] = React.useState(null);
  const [workText, setworkText] = React.useState("");
  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setmyprofile_pic(item?.profile_pic);
        setwork(item?.work && item?.work[0] ? item?.work[0] : null);
        // setwork(item?.work && item?.work[0]);
      }
    }
    fetchData();
  }, [item]);
  React.useEffect(() => {
    async function fetchData() {
      if (work !== null) {
        let working = "";
        if (work?.currently_working) {
          working = true;
        }
        setworkText(
          working
            ? `${work?.employment_type} at ${work?.company}`
            : `Former ${work?.employment_type} at ${work?.company}`
        );
      }
    }
    fetchData();
  }, [work]);
  return (
    <ListItem
      onClick={() => setselectedUser(id)}
      title={`${item?.user?.username} ---- ${workText}`}
    >
      {/* <Link to={`/profile-selector/${myconnection?.user?.id}/`}> */}
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={item?.user?.username} src={myprofile_pic} />
        </ListItemAvatar>
        <ListItemText
          secondaryTypographyProps={{
            textTransform: "capitalize",
            // overflow: "hidden",
            // textOverflow: "ellipsis",
            wordwrap: "break-word",
            // whiteSpace: "nowrap",
          }}
          primary={item?.user?.username}
          secondary={workText}
        />
      </ListItemButton>
      {/* </Link> */}
    </ListItem>
  );
};
