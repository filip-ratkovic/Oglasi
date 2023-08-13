import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, dodajOglas, getUsers } from "../../config/firebase";
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
import { datum } from "../../shema/datum";


function DodajOglas() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState({});
  const [imageList, setImageList] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const userAuth = auth?.currentUser?.uid;
  const imageRef = ref(storage, `oglasi/${file.name + v4()}`);
  const vremeOglasa = datum();


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
    setData({ ...data, [inputID]: value });
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

    const getUsersData = useCallback( async ()=> {
      const allUsers = await getUsers();
      allUsers.map((user)=> {
        if(user.userID == auth.currentUser.uid) {
          setData((prev)=>({...prev, userID:user.userID, username: user.username, ime_prezime: user.ime_prezime, datum:datum()}))
        }
      })
    })

    useEffect(() => {
      getUsersData();
    },[])

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
          <label htmlFor="Naziv">Sta se oglasava?</label>
          <input
            type="text"
            id="naziv"
            placeholder="Unesite naziv proizvoda"
            onChange={handleInput}
          />{" "}
          <br />
          <textarea
            type="text"
            id="opis"
            placeholder="Opis"
            onChange={handleInput}
          />
          <input
            type="number"
            id="cena"
            placeholder="Cena"
            onChange={handleInput}
          />
          <select name="valuta" id="valuta" onChange={handleInput}>
            <option value="din" selected>
              din
            </option>
            <option value="evro">eur</option>
          </select>
          <input
            type="text"
            id="lokacija"
            placeholder="Lokacija"
            onChange={handleInput}
          />
          <input
            type="text"
            id="broj_telefona"
            placeholder="Broj telefona"
            onChange={handleInput}
          />
          <select name="stanje" id="stanje" onChange={handleInput}>
            <option value="novo" selected>
              novo
            </option>
            <option value="polovno">polovno</option>
          </select>
          <select name="kategorija" id="kategorija" onChange={handleInput}>
            <option value="alati" selected> alati </option>
            <option value="elektronika">elektronika</option>
            <option value="obuca">obuca</option>
            <option value="odeca">odeca</option>
            <option value="oprema">oprema</option>
            <option value="namestaj">namestaj</option>
            <option value="uredjaji">uredjaji</option>
            <option value="razno">razno</option>
          </select>
          <button onClick={potvrdiOglas}>Potvrdi</button>
        </Box>
      </Box>
    </Layout>
  );
}

export default DodajOglas;
