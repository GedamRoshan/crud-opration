import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddMember from "../Pages/AddMember";
import Home from "../Pages/Home";
import MemberDetails from "../Pages/memberDetails";

function MainRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/memberdetails" element={<MemberDetails />} />
          <Route path="/addmembers" element={<AddMember />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainRouter;
