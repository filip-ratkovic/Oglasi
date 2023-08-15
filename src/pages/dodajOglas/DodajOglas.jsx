import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, dodajOglas, getUsers } from "../../config/firebase";
import Layout from "../../containers/Layout";
import { storage, uploadImage } from "../../config/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField, useTheme } from "@mui/material";
import { v4 } from "uuid";
import { datum } from "../../shema/datum";
import "./dodajOglas.css";

import ClearIcon from "@mui/icons-material/Clear";
import { allCategories } from "../../shema/allCategories";


function DodajOglas() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState({});
  const [imageList, setImageList] = useState([]);
  const allCategory = allCategories;
  const [categoryName, setCategoryName] = useState(allCategory[0])
  const navigate = useNavigate();
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const userAuth = auth?.currentUser?.uid;
  const imageRef = ref(storage, `oglasi/${file.name + v4()}`);


  const potvrdiOglas = async () => {
    try {
      await dodajOglas(data);
      alert("Uspesno !");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCategory =  (e) => {
    console.log(e.target.value)
     setCategoryName(e.target.value)
    }

    useEffect(()=> {
        setData({ ...data, kategorija: categoryName});
    },[categoryName])

    useEffect(()=> {
      setData({ ...data, stanje: "polovno", zamena:"da", valuta:"din"});
  },[])


  const handleInput = (e) => {
    const value = e.target.value;
    const inputID = e.target.name;
    setData({ ...data, [inputID]: value, kategorija: categoryName});
    };


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
      width: 250,
      zIndex:"1",
      backgroundColor:theme.palette.background
    }
    },
  };

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


  const getUsersData = useCallback(async () => {
    const allUsers = await getUsers();
    allUsers.map((user) => {
      if (user.userID == auth.currentUser.uid) {
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
    getUsersData();
  }, []);

console.log(data)
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
                  xs={6}
                  md={6}
                  lg={4}
                  onClick={(e) => {
                    const newImageList = imageList.filter(
                      (image) => image != e.target.src
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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
            style={{ width: "100%", marginTop:"30px"}}
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

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              marginTop:"30px"
            }}
          >
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
              style={{width:"40%"}}
            >
              <MenuItem value={"din"}  selected>DIN</MenuItem>
              <MenuItem value={"eur"} >EUR</MenuItem>
            </TextField>
          </div>

          <TextField
               type="text"
               id="lokacija"
               name="lokacija"
               placeholder="Unesite grad"
               onChange={handleInput}
              label="Lokacija"
              style={{ width: "100%", marginTop:"30px" }}
            />

            <div style={{width:"100%",marginTop:"30px", display:"flex", justifyContent:"space-between"}}>
            <TextField
             select
             label="Stanje"
             defaultValue="polovno"
              name="stanje"
              id="stanje"
              onChange={handleInput}
              style={{width:"45%"}}
            >
              <MenuItem value={"polovno"} selected>Polovno</MenuItem>
              <MenuItem value={"novo"} >Novo</MenuItem>
            </TextField>

            <TextField
             select
             label="Zamena"
              name="zamena"
              id="zamena"
              defaultValue={"da"}
              onChange={handleInput}
              style={{width:"45%"}}
            >
              <MenuItem value={"da"} id="zamena" selected style={{width:"150px"}} >Da</MenuItem>
              <MenuItem value={"ne"} id="zamena" >Ne</MenuItem>
            </TextField>

          
            </div>

           <div style={{width:"100%"}}>
           {/* <FormControl sx={{ m: 1, width: 300 }}>
           <TextField
           fullWidth
             select
             label="Kategorija"
              name="kategorija"
              id="kategorija"
              onChange={handleInput}
              style={{width:"200%", marginTop:"30px"}}
              defaultValue={"Alati"}
              input={<OutlinedInput label="Nameeee" />}
            >
              
              {allCategory?.map((value)=>{
               return  <MenuItem value={value}>{value} </MenuItem>
              })}
            </TextField>
            </FormControl> */}

 <FormControl sx={{ width: "100%", mt:"30px" }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="kategorija"
          value={categoryName}
          onChange={handleCategory}
          input={<OutlinedInput label="Nameeee" />}
          MenuProps={MenuProps}
        >
          {allCategory.map((name) => (
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
          <Button onClick={potvrdiOglas} variant="outlined" style={{zIndex:0, marginTop:"30px", fontSize:"18px"}}>Potvrdi</Button>
        </Box>
      </Box>
    </Layout>
  );
}

export default DodajOglas;
