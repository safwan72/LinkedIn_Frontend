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
import DatePicker from "@mui/lab/DatePicker";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import baseURL from "../utils/baseurl";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

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
const EditContactDetails = ({
  open,
  handleClose,
  token,
  id,
  mycontactInfo,
  setmycontactInfo,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      website: mycontactInfo ? mycontactInfo?.website : "",
      phone: mycontactInfo ? mycontactInfo?.phone : "",
      address: mycontactInfo ? mycontactInfo?.address : "",
      birthday: mycontactInfo ? new Date(mycontactInfo?.birthday) : new Date(),
    },
  });
  React.useEffect(() => {
    if (mycontactInfo) {
      reset({
        website: mycontactInfo ? mycontactInfo?.website : "",
        phone: mycontactInfo ? mycontactInfo?.phone : "",
        address: mycontactInfo ? mycontactInfo?.address : "",
        birthday: mycontactInfo
          ? new Date(mycontactInfo?.birthday)
          : new Date(),
      });
    }
  }, [mycontactInfo, reset]);

  const onSubmit = (data) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let submitData = {
      website: data?.website,
      phone: data?.phone,
      address: data?.address,
      birthday: moment(data?.birthday).format("YYYY-MM-DD"),
    };
    axios
      .patch(`${baseURL}api/profile/contactinfo/${id}/`, submitData, header)
      .then((res) => {
        if (res.status === 200) {
          setmycontactInfo(res?.data);
        }
        reset();
        handleClose();
      })
      .catch((err) => {
        console.log(err.message);
        reset();
        handleClose();
      });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          Edit Contact Details
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="website"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="filled-website-input"
                        placeholder="Website"
                        variant="standard"
                        {...field}
                        fullWidth
                        type="url"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="filled-phone-input"
                        placeholder="Phone"
                        variant="standard"
                        {...field}
                        fullWidth
                        type="number"
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        id="filled-address-input"
                        placeholder="Address"
                        variant="standard"
                        {...field}
                        fullWidth
                        sx={{ mb: "30px" }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="birthday"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Birthday"
                        minDate={new Date("1970-01-01")}
                        maxDate={new Date("2035-12-01")}
                        onChange={(e) => field.onChange(e)}
                        value={field.value}
                        mask="____/__/__"
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            helperText={null}
                            sx={{ mb: "25px" }}
                            fullWidth
                          />
                        )}
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
                    marginTop: "30px",
                    minWidth: "50px",
                    padding: "10px",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#0d47a1",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default EditContactDetails;
