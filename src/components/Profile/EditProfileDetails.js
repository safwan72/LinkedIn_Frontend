import * as React from "react";
import Draggable from "react-draggable";
import {
  Button,
  Dialog,
  DialogContent,
  Paper,
  TextField,
  DialogTitle,
  Box,
  Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import baseURL from "../utils/baseurl";
import { useForm, Controller } from "react-hook-form";
import EditContactDetails from "./EditContactDetails";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const EditProfileDetails = ({
  open,
  handleClose,
  token,
  id,
  setmydetails,
  mydetails,
  setmycontactInfo,
  mycontactInfo,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      first_name: mydetails ? mydetails?.first_name : "",
      last_name: mydetails ? mydetails?.last_name : "",
    },
  });
  const [contact, setcontact] = React.useState(false);
  const handlecontact = () => {
    setcontact(!contact);
  };

  React.useEffect(() => {
    if (mydetails) {
      reset({
        first_name: mydetails ? mydetails?.first_name : "",
        last_name: mydetails ? mydetails?.last_name : "",
      });
    }
  }, [mydetails, reset]);

  const onSubmit = (data) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .patch(`${baseURL}api/auth/profile/${id}/`, data, header)
      .then((res) => {
        if (res.status === 200) {
          setmydetails(res?.data);
        }
        reset();
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        reset();
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle
        style={{ cursor: "move" }}
        sx={{ my: "10px" }}
        id="draggable-dialog-title"
      >
        Edit Intro
      </DialogTitle>
      <EditContactDetails
        open={contact}
        handleClose={handlecontact}
        token={token}
        id={id}
        setmycontactInfo={setmycontactInfo}
        mycontactInfo={mycontactInfo}
      />
      <DialogContent>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="filled-first_name-input"
                      placeholder="First Name"
                      variant="standard"
                      {...field}
                      fullWidth
                      sx={{ mb: "20px" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="filled-last_name-input"
                      placeholder="Last Name"
                      variant="standard"
                      {...field}
                      fullWidth
                      sx={{ mb: "20px" }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ float: "right", clear: "both" }}>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#0A66C2",
                  color: "white",
                  marginTop: "20px",
                  minWidth: "50px",
                  padding: "10px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: "#0d47a1",
                  },
                }}
              >
                Edit
              </Button>
            </Box>
          </form>
        </Box>
        <Button
          type="button"
          size="small"
          sx={{
            color: "#0d77a1",
            lineHeight: 1.25,
          }}
          onClick={handlecontact}
        >
          Edit Contacts
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDetails;
