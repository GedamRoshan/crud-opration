import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddMember from "../Pages/AddMember";
import Home from "../Pages/Home";
import UserDetails from "../Pages/userDetails";

function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/addMembers" element={<AddMember />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainRouter;
