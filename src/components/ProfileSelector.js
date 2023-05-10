import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProfileSelector = () => {
  const { id } = useSelector((state) => state);
  const urlParams = useParams();
  return (
    <>
      {urlParams?.id === id ? (
        <Navigate to="/profile" />
      ) : (
        <Navigate to={`/visit-profile/${urlParams?.id}/`} />
      )}
    </>
  );
};

export default ProfileSelector;
