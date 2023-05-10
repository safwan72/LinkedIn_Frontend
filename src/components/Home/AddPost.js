import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import ImageIcon from "@mui/icons-material/Image";
import axios from "axios";
import baseURL from "../utils/baseurl";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  inputbox: {
    "& fieldset": {
      outline: "none",
      border: "none",
    },
  },
}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const Input = styled("input")({
  display: "none",
});
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
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
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const AddPost = ({ open, handleClose, mydata, reloader, reload }) => {
  const classes = useStyles();
  const { id, token } = useSelector((state) => state);
  const [post_title, setpost_title] = React.useState("");
  const [mypost_pic, setmypost_pic] = React.useState(null);
  const [uploadpostpic, setuploadpostpic] = React.useState(null);

  const handleCreatePost = () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let data = new FormData();
    if (uploadpostpic) {
      data.append("post_image", uploadpostpic);
    }
    data.append("post_title", post_title);
    async function fetchData() {
      if (id) {
        const request = await axios.post(
          `${baseURL}api/post/createPost/${id}/`,
          data,
          header
        );
        if (request.status === 201) {
          handleClose();
          setpost_title("");
          setuploadpostpic(null);
          setmypost_pic(null);
        }
        reloader(!reload);
        handleClose();
        setpost_title("");
        setuploadpostpic(null);
        setmypost_pic(null);
        return request;
      }
    }
    fetchData();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth="md"
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Create a post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              mb: "5px",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginRight: "12px" }}>
              <img
                src={mydata?.profile_pic}
                alt="My Pic"
                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, textTransform: "capitalize" }}>
              <p>{mydata?.user?.username}</p>
            </Box>
          </Box>

          <TextField
            aria-label="minimum height"
            rows={5}
            maxRows={10}
            fullWidth
            autoFocus={true}
            placeholder="What do you want to talk about?"
            className={classes.inputbox}
            value={post_title}
            onChange={(e) => {
              setpost_title(e.target.value);
            }}
          />
          {mypost_pic && (
            <Box
              sx={{
                width: "200px",
                margin: "auto",
                my: "25px",
                height: "200px",
                objectFit: "cover",
              }}
            >
              <img
                src={mypost_pic}
                alt="MyPost"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
          )}
          <Button>Add Hashtags</Button>
        </DialogContent>
        <DialogActions
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <label htmlFor="icon-button-file" style={{ marginLeft: "15px" }}>
            <Input
              accept="image/png"
              id="icon-button-file"
              type="file"
              onChange={(event) => {
                setmypost_pic(URL.createObjectURL(event.target.files[0]));
                setuploadpostpic(event.target.files[0]);
              }}
            />
            <ImageIcon aria-label="upload picture" />
          </label>
          <Button
            disabled={post_title !== "" ? false : true}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default AddPost;
