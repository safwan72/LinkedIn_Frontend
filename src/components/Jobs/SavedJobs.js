import React from "react";
import {
  Typography,
  Box,
  Button,
  Avatar,
} from "@mui/material";
import moment from "moment";
import axios from "axios";
import baseURL from "../utils/baseurl";

const MySavedJobs = ({ item, id, token }) => {
  const [ifApplied, setifApplied] = React.useState(false);
  const [company_logo, setcompany_logo] = React.useState(null);

  React.useEffect(() => {
    let unmounted = false;
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.get(
          `${baseURL}api/organizations/checkAppliedStatus/${id}/${item?.job?.posted_by?.id}/${item?.job?.id}/`,
          header
        );
        if (!unmounted) {
          setifApplied(request?.data);
        }
        return request;
      }
    }
    fetchData();
    return () => {
      unmounted = true;
    };
  }, [item, id, token]);
  const handleApply = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/applytoJob/`,
          {
            id: id,
            company: item?.job?.posted_by?.id,
            job: item?.job?.id,
          },
          header
        );
        setifApplied(request?.data);
        return request;
      }
    }
    fetchData();
  };
  const handleAppliedButton = () => {
    async function fetchData() {
      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      if (item && id) {
        const request = await axios.post(
          `${baseURL}api/organizations/cancelApplyJob/`,
          {
            id: id,
            company: item?.job?.posted_by?.id,
            job: item?.job?.id,
          },
          header
        );
        setifApplied(request?.data);
        return request;
      }
    }
    fetchData();
  };

  React.useEffect(() => {
    async function fetchData() {
      if (item) {
        setcompany_logo(item?.job?.posted_by?.logo);
      }
    }
    fetchData();
  }, [item]);
  console.log(item);
  return (
    <Box sx={{ width: "100%", ml: "6px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: "15px",
          width: "100%",
        }}
      >
        <Box>
          <Avatar alt={item?.job?.job_title} src={company_logo} />
        </Box>
        <Box
          sx={{
            flex: 1,
            marginLeft: "15px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mb: "5px" }}>
            {item?.job?.job_title}
          </Typography>
          <Typography variant="body2" sx={{ mb: "5px" }}>
            {item?.job?.posted_by?.name}
          </Typography>
          <Typography variant="body2">
            {moment(item?.job ? item?.job?.posted_at : new Date()).format(
              "MMM Do YY"
            )}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "right", mt: "20px" }}>
        {ifApplied ? (
          <Button variant="contained" onClick={() => handleAppliedButton()}>
            Applied
          </Button>
        ) : (
          <Button variant="outlined" onClick={() => handleApply()}>
            Apply
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MySavedJobs;
