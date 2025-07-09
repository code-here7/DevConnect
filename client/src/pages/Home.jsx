import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import ProfileData from "./HomeComponents/Profile components/ProfileData";
import UsersData from "./HomeComponents/UsersData";

const Home = () => {

return (
    <div className="flex flex-col md:flex-row gap-8 items-start px-4 py-6">
      {/* Profile (left) */}
      <div className="w-full md:w-1/2 self-stretch">
        <ProfileData />
      </div>

      {/* Users (right) */}
      <div className="w-full md:w-1/2 self-stretch">
        <UsersData />
      </div>
    </div>
);

};

export default Home;
