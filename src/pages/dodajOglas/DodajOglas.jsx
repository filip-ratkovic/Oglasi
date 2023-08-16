import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dodajOglas, getUsers, uploadImage } from "../../config/firebase";
import { getDownloadURL } from "firebase/storage";
import Layout from "../../containers/Layout";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { datum } from "../../shema/datum";
import { allCategories } from "../../shema/allCategories";
import "./dodajOglas.css";

function DodajOglas() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState({});
  const [imageList, setImageList] = useState([]);
  const [categoryName, setCategoryName] = useState(allCategories[0]);

  const navigate = useNavigate();
  const theme = useTheme();
  // const imageRef = ref(storage, `oglasi/${file.name + v4()}`);
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
        zIndex: "1",
        backgroundColor: theme.palette.background,
      },
    },
  };

  const potvrdiOglas = async () => {
    try {
      await dodajOglas(data);
      alert("Uspesno !");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    const inputID = e.target.name;
    setData({ ...data, [inputID]: value, kategorija: categoryName });
  };

  const getUsersData = useCallback(async () => {
    const allUsers = await getUsers();
    allUsers.map((user) => {
      if (user.userID === auth.currentUser.uid) {
        setData((prev) => ({
          ...prev,
          userID: user.userID,
          username: user.username,
          ime_prezime: user.ime_prezime,
          datum: datum(),
        }));
      }
    });
  });

  useEffect(() => {
    setData({ ...data, kategorija: categoryName });
  }, [categoryName]);

  useEffect(() => {
    if (file.length > 0) {
      for (let image of file) {
        uploadImage(image)
          .then((snaphsot) => {
            getDownloadURL(snaphsot.ref).then((url) => {
              imageList.push(url);
              setData((prev) => ({ ...prev, img: imageList }));
            });
          })
          .then(() => setData((prev) => ({ ...prev, img: imageList })));
      }
    }
  }, [file]);

  useEffect(() => {
    getUsersData();
    setData({ ...data, stanje: "polovno", zamena: "da", valuta: "din" });
  }, []);

  return (
    <Layout>
      <Box className="add-container">
        <Box className="add-image">
          <section className="file-input">
            <input
              type="file"
              id="file"
              name="file"
              multiple
              onChange={(e) => {
                setFile(e.target.files);
              }}
            />
            <span className="button">Choose</span>
            <span className="label" data-js-label>
              No file selected
            </span>
          </section>

          <Grid className="add-image-list" container spacing={1}>
            {imageList.map((url, index) => {
              return (
                <Grid
                  item
                  xs={4}
                  sm={3}
                  md={6}
                  lg={4}
                  onClick={(e) => {
                    const newImageList = imageList.filter(
                      (image) => image !== e.target.src
                    );
                    setImageList(newImageList);
                  }}
                >
                  <div className="img-cont">
                    <span className="image-cont-delete">
                      <ClearIcon />
                    </span>
                    <img src={url} alt="slika oglasa" />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Box>

        <Box className="add-info">
          <div className="category-input1">
            <TextField
              type="text"
              id="naziv"
              name="naziv"
              placeholder="Iphone 11 pro"
              onChange={handleInput}
              label="Naziv proizvoda"
              style={{ width: "45%" }}
              aria-describedby="component-error-text"
            />
            <TextField
              type="number"
              id="broj_telefona"
              name="broj_telefona"
              placeholder="+381666646640"
              onChange={handleInput}
              label="Broj telefona "
              style={{ width: "45%" }}
            />
          </div>

          <TextField
            style={{ width: "100%", marginTop: "30px" }}
            label="Opis proizvoda"
            type="text"
            id="opis"
            name="opis"
            placeholder=" (ne koristiti pretežno velika slova jer takvi oglasi odbijaju posetioce)"
            onChange={handleInput}
            rows={4}
            multiline
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          <div className="category-input">
            <TextField
              style={{ width: "55%" }}
              label="Cena"
              type="number"
              id="cena"
              name="cena"
              placeholder="Cena"
              onChange={handleInput}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />
            <TextField
              select
              label="Odaberi valutu"
              defaultValue="din"
              name="valuta"
              id="valuta"
              onChange={handleInput}
              style={{ width: "40%" }}
            >
              <MenuItem value={"din"} selected>
                DIN
              </MenuItem>
              <MenuItem value={"eur"}>EUR</MenuItem>
            </TextField>
          </div>

          <TextField
            type="text"
            id="lokacija"
            name="lokacija"
            placeholder="Unesite grad"
            onChange={handleInput}
            label="Lokacija"
            style={{ width: "100%", marginTop: "30px" }}
          />

          <div className="category-input">
            <TextField
              select
              label="Stanje"
              defaultValue="polovno"
              name="stanje"
              id="stanje"
              onChange={handleInput}
              style={{ width: "45%" }}
            >
              <MenuItem value={"polovno"} selected>
                Polovno
              </MenuItem>
              <MenuItem value={"novo"}>Novo</MenuItem>
            </TextField>

            <TextField
              select
              label="Zamena"
              name="zamena"
              id="zamena"
              defaultValue={"da"}
              onChange={handleInput}
              style={{ width: "45%" }}
            >
              <MenuItem
                value={"da"}
                id="zamena"
                selected
                style={{ width: "150px" }}
              >
                Da
              </MenuItem>
              <MenuItem value={"ne"} id="zamena">
                Ne
              </MenuItem>
            </TextField>
          </div>
          <div style={{ width: "100%" }}>
            <FormControl sx={{ width: "100%", mt: "30px" }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="kategorija"
                value={categoryName}
                onChange={handleCategory}
                input={<OutlinedInput label="Nameeee" />}
                MenuProps={MenuProps}
              >
                {allCategories.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    id={name}
                    className="category-dropdown"
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Button
            onClick={potvrdiOglas}
            variant="outlined"
            style={{ zIndex: 0, marginTop: "30px", fontSize: "18px" }}
          >
            Potvrdi
          </Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default DodajOglas;
