import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../config/firebase";

import "./ocene.css"
import { Box } from "@mui/material";

function Ocene({ adData }) {
  const [user, setUser] = useState([]);
  const authState = useSelector((state) => state.auth);

  const getUsersData = async () => {
    const userRes = await getUsers();
    userRes.forEach((user) => {
      if (user.userID === authState.id) {
        setUser(user);
      }
    });
  };
  console.log(user)

  useEffect(() => {
    getUsersData();
  }, []);
  return <Box className="ocene-container">
<Box className="ocene-header">
  <Box>
    <h2>Ocene korisnika</h2>
  </Box>
  <Box className="ocene-pozitivne">
    <p>Pozitivne</p>
    <p>Negativne</p>
  </Box>
</Box>
<Box className="ocene-korisnika">

</Box>
  </Box>;
}

export default Ocene;
