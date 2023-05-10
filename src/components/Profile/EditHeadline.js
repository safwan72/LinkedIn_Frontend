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

const EditHeadline = ({
  open,
  handleClose,
  token,
  id,
  setmyheadline,
  myheader,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      header: myheader?.header ? myheader?.header : "",
    },
  });
  React.useEffect(() => {
    if (myheader) {
      reset({
        header: myheader?.header ? myheader?.header : "",
      });
    }
  }, [myheader, reset]);
  const onSubmit = (data) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    if (myheader?.header) {
      axios
        .patch(`${baseURL}api/profile/headline/${id}/`, data, header)
        .then((res) => {
          if (res.status === 200) {
            setmyheadline(res?.data);
          }
          reset();
          handleClose();
        })
        .catch((err) => {
          console.log(err.message);
          reset();
        });
    } else {
      axios
        .post(`${baseURL}api/profile/headline/${id}/`, data, header)
        .then((res) => {
          if (res.status === 200) {
            setmyheadline(res?.data);
          }
          reset();
          handleClose();
        })
        .catch((err) => {
          console.log(err.message);
          reset();
        });
    }
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
        Edit Headline
      </DialogTitle>
      <DialogContent>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Controller
                  name="header"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      id="filled-header-input"
                      placeholder="Headline"
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
      </DialogContent>
    </Dialog>
  );
};

export default EditHeadline;
