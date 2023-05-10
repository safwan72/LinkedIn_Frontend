import {
  Box,
  ListItemIcon,
  ListItemText,
  ListItem,
  ListItemButton,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Dialog,
} from "@mui/material";
import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import CompanyJobs from "./CompanyJobs";
import baseURL from "../../utils/baseurl";

const CreateJob = ({ details }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box>
        <ListItem disablePadding>
          <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Create New Job" />
          </ListItemButton>
        </ListItem>
        <AddJob open={open} handleClose={handleClose} company={details?.id} />
      </Box>
      <Button></Button>
      <Box>
        <CompanyJobs details={details} />
      </Box>
    </Box>
  );
};

export default CreateJob;

const useStyles = makeStyles((theme) => ({}));
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
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

const AddJob = ({ open, handleClose, company }) => {
  const classes = useStyles();
  const { id, token } = useSelector((state) => state);
  const [job_title, setjob_title] = React.useState("");
  const [job_description, setjob_description] = React.useState("");

  const handleCreatePost = () => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      job_title: job_title,
      job_description: job_description,
    };
    async function fetchData() {
      if (id) {
        const request = await axios.post(
          `${baseURL}api/organizations/createJobPost/${company}/`,
          data,
          header
        );
        if (request.status) {
          handleClose();
          setjob_title("");
          setjob_description("");
        }
        // reloader(!reload);
        handleClose();
        setjob_title("");
        setjob_description("");
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
          Create a new Job Post
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: "15px" }}>
            <TextField
              aria-label="job_title"
              fullWidth
              autoFocus={true}
              placeholder="Add Job Title"
              className={classes.inputbox}
              value={job_title}
              onChange={(e) => {
                setjob_title(e.target.value);
              }}
            />
          </Box>
          <Box>
            <TextField
              aria-label="job_description"
              fullWidth
              multiline
              rows={4}
              placeholder="Add Job Description"
              className={classes.inputbox}
              value={job_description}
              onChange={(e) => {
                setjob_description(e.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={job_title !== "" ? false : true}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
