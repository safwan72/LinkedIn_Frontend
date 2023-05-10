import React from "react";
import Navbar from "../components/utils/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import baseURL from "../components/utils/baseurl";
import { Box } from "@mui/material";

const Base = ({ children }) => {
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.id);
  const [mydetails, setmydetails] = React.useState([]);
  React.useEffect(() => {
    const header = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    async function fetchData() {
      if (id) {
        const request = await axios.get(
          `${baseURL}api/auth/profile/${id}/`,
          header
        );
        setmydetails(request?.data);
        return request;
      }
    }
    fetchData();
  }, [id, token]);
  return (
    <>
      <Navbar details={mydetails} />
      <Box sx={{ marginTop: "20px", paddingTop: "40px" }}>{children}</Box>
    </>
  );
};

export default Base;
