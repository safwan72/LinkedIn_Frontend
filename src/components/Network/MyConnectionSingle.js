import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

const MyConnectionSingle = ({ item, id }) => {
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  const [myconnection, setmyconnection] = React.useState(null);
  id = Number(id);
  React.useEffect(() => {
    async function fetchData() {
      if (item && id) {
        if (item?.sender?.user?.id !== id) {
          setmyconnection(item?.sender);
        }
        if (item?.receiver?.user?.id !== id) {
          setmyconnection(item?.receiver);
        }
      }
    }
    fetchData();
  }, [item, id]);
  React.useEffect(() => {
    async function fetchData() {
      if (myconnection) {
        setmyprofile_pic(myconnection?.profile_pic);
      }
    }
    fetchData();
  }, [myconnection]);
  return (
    <ListItem>
      <Link to={`/profile-selector/${myconnection?.user?.id}/`}>
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={myconnection?.user?.username} src={myprofile_pic} />
          </ListItemAvatar>
          <ListItemText primary={myconnection?.user?.username} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
};

export default MyConnectionSingle;
