import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, dodajOglas } from "../../config/firebase";
import Layout from "../../containers/Layout";
import { storage, uploadImage } from "../../config/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Box, useTheme } from "@mui/material";
import { v4 } from "uuid";

function DodajOglas() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState({});
  const [imageList, setImageList] = useState([]);

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

  const handleInput = (e) => {
    const value = e.target.value;
    const inputID = e.target.id;
    console.log(value, "value")
    console.log(inputID, "inputID")

    setData({ ...data, [inputID]: value});
  };
  console.log(data)

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
  console.log(imageList);
  const date = new Date();
  const godina = date.getFullYear();
  const mesec = date.getMonth();
  const dan = date.getDate();

  const datum = `${dan}.${mesec}.${godina}`;

  return (
    <Layout>
      <Box className="add-container">
        <Box className="add-image">
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
          {imageList.map((url) => {
            return (
              <div>
                <img
                  src={url}
                  alt="urururu"
                  style={{ width: "50px", margin: "10px" }}
                />
              </div>
            );
          })}
        </Box>
        <Box className="add-info">
          <input type="text" id="Naziv"
          placeholder="Unesite naziv proizvoda"
           onChange={handleInput}/>
           <input type="text" id="Opis" placeholder="Opis"
           onChange={handleInput}/>
           <input type="number" id="Cena" placeholder="Cena"
           onChange={handleInput}/>
           <input type="text" id="Lokacija" placeholder="Lokacija"
           onChange={handleInput}/>
           <button onClick={potvrdiOglas}>Potvrdi</button>
        </Box>
      </Box>
    </Layout>
  );
}

export default DodajOglas;
