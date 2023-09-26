import React, { useState } from "react";
import "../../pages/oglas/oglas.css";
import { Box, Button, ButtonGroup, useTheme } from "@mui/material";
import {
  Bookmark as BookmarkIcon,
  Person as PersonIcon,
  Send as SendIcon,
  ThumbDownAlt as ThumbDownAltIcon,
  ThumbUp as ThumbUpIcon,
} from "@mui/icons-material";
import DodajKomentar from "./DodajKomentar";
import { updateUser } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OglasText({ user, adData, mainUser }) {
  const [adActive, setAdActive] = useState(false);
  const [followed, setFollowed] = useState(false);
  const authState = useSelector((state) => state.auth);
  const theme = useTheme();
  const navigate = useNavigate()

  const handleAdComment = () => {
    if(authState.id) {
      if(mainUser.userID === user.userID) {
        return alert('Ne mozete oceniti svoj oglas')
      }
      if(user.ocene?.includes(mainUser.userID)) {
        return alert('Vec ste ocenili ovaj oglas')
      }
      else {
        setAdActive(true) 
      }
    } else {
      navigate('/login')
      alert('Niste prijavljeni')
    }
  };

  const handleFollowUser = async () => {
    if(authState.id) {
      let newFollow = mainUser.follow;
      newFollow.push(user?.userID);
      await updateUser(mainUser.id, { ...mainUser, follow: newFollow });
      setFollowed(mainUser.follow);
    } else {
      alert('Niste prijavljeni')
      navigate("/login")
    }
  };

  const handleUnfollowUser = async () => {
    let newFollow = mainUser.follow.filter((el) => el !== user.userID);
    await updateUser(mainUser.id, { ...mainUser, follow: newFollow });
    setFollowed(newFollow);
  };

  return (
    <Box className="ad-text-container">
      <DodajKomentar
        adActive={adActive}
        setAdActive={setAdActive}
        adData={adData}
        user={user}
        mainUser={mainUser}
      />
      <Box className="ad-text-up">
        <Box className="ad-text-header">
          <h1>{adData?.naziv}</h1>
          <h2 className="cena-gold" style={{ marginBottom: "20px" }}>
            {adData.cena} {adData.valuta === "din" ? "RSD" : "€"}
          </h2>
          <Box className="ad-small-det-cont">
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Stanje:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.stanje}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Zamena:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.zamena}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Kategorija:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.kategorija}</p>
            </Box>
            <Box className="ad-small-det-left">
              <Box className="ad-small-det-text-left">
                <h4>Grad:</h4>
              </Box>
              <p style={{ color: "grey" }}>{adData.lokacija}</p>
            </Box>
          </Box>
        </Box>
            <p className="ad-text-opis2">{adData.opis}</p>

        <Box className="ad-text-userinfo">
          <Box className="add-first-cont">
            <PersonIcon
              style={{ color: theme.palette.text.primary, marginRight: "10px" }}
            />
            <h2>{adData?.ime_prezime}</h2>
          </Box>

          {authState.id !== user.userID ? <Box>
          {mainUser.follow?.includes(user.userID) ? (
            <Button
              size="small"
              variant="contained"
              style={{
                width: "100px",
                display: "flex",
                justifyContent: "space-between",
                color: "white",
                backgroundColor: theme.palette.text.secondary,
              }}
              onClick={handleUnfollowUser}
            >
              Odprati <BookmarkIcon />
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              style={{
                display: "flex",
                width: "100px",
                justifyContent: "space-between",
                color: "white",
                backgroundColor: theme.palette.text.secondary,
              }}
              onClick={handleFollowUser}
            >
              Prati <BookmarkIcon />
            </Button>
          )}
          </Box> : null}
          <p>Clan od {user.datum_prijave}</p>
          <ButtonGroup
            disableElevation
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button
              onClick={handleAdComment}
              variant="outlined"
              style={{
                marginRight: "10px",
                borderRadius: "30px",
                color: "#007ec3",
                width: "80px",
              }}
            >
              <ThumbUpIcon style={{ marginRight: "5px" }} />{" "}
              {user.pozitivna_ocena?.length}
            </Button>
            <Button
              onClick={handleAdComment}
              variant="outlined"
              style={{ borderRadius: "30px", color: "red", width: "80px" }}
            >
              <ThumbDownAltIcon style={{ marginRight: "5px" }} />{" "}
              {user.negativna_ocena?.length}
            </Button>
          </ButtonGroup>

          <Button
          className="send-btn"
            variant="contained"
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "white",
              backgroundColor: theme.palette.text.secondary}}
          >
            Posalji poruku
            <SendIcon />
          </Button>
        </Box>
      </Box>

      <p className="ad-text-opis">{adData.opis}</p>
    </Box>
  );
}

export default OglasText;
