import * as React from "react";
import {
  DialogTitle,
  Box,
  Grid,
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
import axios from "axios";
import baseURL from "../../utils/baseurl";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@mui/styles";

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

const AddSkill = ({
  open,
  handleClose,
  token,
  id,
  allskills,
  setmydetails,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      skill: "",
      top_skill: false,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}api/profile/userskill/${id}/`, data, header)
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
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="scroll-dialog-title" sx={{ mb: "20px" }}>
          Add New Skill
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: "10px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Controller
                    name="skill"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth sx={{ mb: "25px" }}>
                        <InputLabel id="demo-simple-select-label">
                          Add Skill
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          {...field}
                          label="Add Skill"
                        >
                          {allskills?.map((item, i) => {
                            return (
                              <MenuItem
                                value={item?.skill}
                                key={i}
                                sx={{ textTransform: "capitalize" }}
                              >
                                {item?.skill}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" sx={{ mb: "25px" }}>
                <Grid item xs={12} sm={1}>
                  <Controller
                    name="top_skill"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="top_skill"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={11}>
                  <Typography variant="body" className={classes.textoverflow}>
                    Top Skill
                  </Typography>
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
    </div>
  );
};

export default AddSkill;
