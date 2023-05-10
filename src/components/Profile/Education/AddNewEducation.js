import * as React from "react";
import {
  DialogTitle,
  Box,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Checkbox,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import baseURL from "../../utils/baseurl";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  textoverflow: {
    marginLeft: "10px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: "220px",
    display: "block",
  },
}));

const AddNewEducation = ({ open, handleClose, token, id, setmydetails }) => {
  const descriptionElementRef = React.useRef(null);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      school: "",
      degree: "",
      field_of_study: "",
      grade: "",
      start_date: new Date(),
      end_date: new Date(),
      currently_studying: false,
      description: "",
      activities: "",
    },
  });
  const [ischecked, setischecked] = React.useState(false);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const onSubmit = (data) => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let submitData = {
      school: data?.school,
      degree: data?.degree,
      grade: data?.grade,
      start_date: moment(data?.start_date).format("YYYY-MM-DD"),
      end_date:
        data?.end_date && !ischecked
          ? moment(data?.end_date).format("YYYY-MM-DD")
          : null,
      description: data?.description,
      activities: data?.activities,
      field_of_study: data?.field_of_study,
      currently_studying: data?.currently_studying,
      user: id,
    };
    axios
      .post(`${baseURL}api/profile/useredu/${id}/`, submitData, header)
      .then((res) => {
        if (res.status === 200) {
          setmydetails(res?.data);
        }
        reset();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        reset();
        handleClose();
        //notify toast
      });
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle id="scroll-dialog-title" sx={{ my: "10px", ml: "10px" }}>
            Add New Education
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: "10px" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="school"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-school-input"
                          required
                          label="School"
                          fullWidth
                          placeholder="Ex: Dhaka University"
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="degree"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-degree-input"
                          required
                          label="Degree"
                          fullWidth
                          placeholder="Ex: Marketing"
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="field_of_study"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-field_of_study-input"
                          label="Field Of Study"
                          fullWidth
                          required
                          placeholder="Ex: ICT"
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="grade"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-grade-input"
                          required
                          label="Grade"
                          fullWidth
                          placeholder="Ex: Marketing"
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="start_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Start Date"
                          minDate={new Date("2000-01-01")}
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

                <Grid container alignItems="center" sx={{ mb: "25px" }}>
                  <Grid item xs={12} sm={1}>
                    <Controller
                      name="currently_studying"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="currently_studying"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setischecked(e.target.checked);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={11}>
                    <Typography variant="body" className={classes.textoverflow}>
                      I am currently enrolled in a class
                    </Typography>
                  </Grid>
                </Grid>
                {!ischecked ? (
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <Controller
                        name="end_date"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            label="End Date"
                            minDate={new Date("2000-01-01")}
                            maxDate={new Date("2035-12-01")}
                            onChange={(e) => field.onChange(e)}
                            mask="____/__/__"
                            value={field.value}
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
                ) : null}

                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-description-input"
                          label="Description"
                          placeholder="Describe your Academics!!"
                          rows={10}
                          multiline
                          fullWidth
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="activities"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-activities-input"
                          label="Activities"
                          rows={10}
                          multiline
                          fullWidth
                          placeholder="Describe the Activities!!!"
                          {...field}
                          sx={{ mb: "25px" }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ float: "right" }}>
                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#0A66C2",
                      color: "white",
                      marginTop: "20px",
                      marginBottom: "20px",
                      "&:hover": {
                        backgroundColor: "#0d47a1",
                      },
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </form>
            </Box>
          </DialogContent>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewEducation;
