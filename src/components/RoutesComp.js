import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Profile from "../Pages/Profile";
import NoLoginHome from "./PreAuth/NoLoginHome";
import LoginHome from "./PreAuth/LoginHome";
import CreateAccount from "./PreAuth/CreateAccount";
import { useSelector } from "react-redux";
import Logout from "./Auth/Logout";
import NetWork from "../Pages/NetWork";
import MyConnections from "../Pages/MyConnections";
import VisitProfile from "./VisitProfile/VisitProfile";
import ProfileSelector from "./ProfileSelector";
import Message from "../Pages/Message";
import Company from "../Pages/Company";
import VisitCompany from "./Company/VisitCompany";
import CreateCompany from "../Pages/CreateCompany";
import OrganizationPosts from "../Pages/OrganizationPosts";
import AllCompanies from "../Pages/AllCompanies";
import SavedJobs from "../Pages/SavedJobs";

const Routescomp = () => {
  const token = useSelector((state) => state.token);
  const id = useSelector((state) => state.id);

  return (
    <Routes>
      {token && (
        <>
          <Route path="/home" element={<Home token={token} id={id} />} />
          <Route path="/profile" element={<Profile token={token} id={id} />} />
          <Route
            path="/visit-profile/:id"
            element={<VisitProfile token={token} myid={id} />}
          />
          <Route path="/profile-selector/:id" element={<ProfileSelector />} />
          <Route path="/network" element={<NetWork token={token} id={id} />} />
          <Route
            path="/organization-posts"
            element={<OrganizationPosts token={token} id={id} />}
          />
          <Route
            path="/pages"
            element={<AllCompanies token={token} id={id} />}
          />
          <Route path="/jobs" element={<Company token={token} id={id} />} />
          <Route
            path="/saved-jobs"
            element={<SavedJobs token={token} id={id} />}
          />
          <Route
            path="/company/:id/"
            element={<VisitCompany token={token} id={id} />}
          />
          <Route
            path="/create-company"
            element={<CreateCompany token={token} id={id} />}
          />
          <Route
            path="/messaging"
            element={<Message token={token} id={id} />}
          />
          <Route
            path="/myconnections"
            element={<MyConnections token={token} id={id} />}
          />
          <Route path="/logout" element={<Logout />} />
        </>
      )}
      {!token && (
        <>
          <Route path="/signuphome" element={<NoLoginHome />} />
          <Route path="/signin" element={<LoginHome />} />
          <Route path="/signup" element={<CreateAccount />} />
        </>
      )}

      <Route
        path="*"
        element={<Navigate to={token ? "/home" : "/signuphome"} />}
      />
    </Routes>
  );
};

export default Routescomp;
