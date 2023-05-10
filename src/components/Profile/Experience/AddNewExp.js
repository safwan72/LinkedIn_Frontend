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

const AddNewExp = ({ open, handleClose, token, id, setmydetails }) => {
  const descriptionElementRef = React.useRef(null);
  const classes = useStyles();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      company: "",
      employment_type: "",
      location: "",
      start_date: new Date(),
      end_date: new Date(),
      description: "",
      currently_working: false,
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
    console.log(data);
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    let submitData = {
      title: data?.title,
      company: data?.company,
      location: data?.location,
      start_date: moment(data?.start_date).format("YYYY-MM-DD"),
      end_date:
        data?.end_date && !ischecked
          ? moment(data?.end_date).format("YYYY-MM-DD")
          : null,
      description: data?.description,
      currently_working: data?.currently_working,
      employment_type: data?.employment_type,
      user: id,
    };
    axios
      .post(`${baseURL}api/profile/createworkexperience/`, submitData, header)
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
          <DialogTitle id="scroll-dialog-title" sx={{ mb: "20px" }}>
            Add Experience
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: "10px" }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="title"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-title-input"
                          required
                          label="Title"
                          fullWidth
                          placeholder="Ex: Retail Sales Manager"
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
                      name="employment_type"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ mb: "25px" }}>
                          <InputLabel id="demo-simple-select-label">
                            Employment Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...field}
                            label="Employment Type"
                          >
                            <MenuItem value="Fulltime">Full-Time</MenuItem>
                            <MenuItem value="Parttime">Part-Time</MenuItem>
                            <MenuItem value="Internship">Internship</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                            <MenuItem value="Apprenticeship">
                              Apprenticeship
                            </MenuItem>
                            <MenuItem value="Seasonal">Seasonal</MenuItem>
                            <MenuItem value="Selfemployed">
                              Selfemployed
                            </MenuItem>
                            <MenuItem value="Freelance">Freelance</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container alignItems="center">
                  <Grid item xs={12}>
                    <Controller
                      name="company"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-company-input"
                          label="Company"
                          fullWidth
                          required
                          placeholder="Ex: Microsoft"
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
                      name="currently_working"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="currently_working"
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
                      I am currently working in this role{" "}
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
                      name="location"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-location-input"
                          label="Location"
                          fullWidth
                          placeholder="Ex: London, United Kingdom"
                          required
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
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          id="outlined-description-input"
                          label="Description"
                          rows={10}
                          multiline
                          fullWidth
                          placeholder="Describe What you do!!"
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

export default AddNewExp;
