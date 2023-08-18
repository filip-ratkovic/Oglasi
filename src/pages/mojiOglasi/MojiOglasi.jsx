import React, { useEffect, useState } from "react";
import Layout from "../../containers/Layout";
import { auth, getOglase } from "../../config/firebase";

function MojiOglasi() {
  const [oglasi, setOglasi] = useState([]);
  const userAuth = auth?.currentUser?.uid;

  useEffect(() => {
    getOglase()
      .then((data) => {
        setOglasi(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout>
      {oglasi.map((oglas) => {
        if (oglas.userID === userAuth) {
          return (
            <div
              style={{
                width: "500px",
                margin: "30px",
                border: "1px solid red",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <h1>{oglas.naziv}</h1>
              <p>{oglas.text}</p>
              <p>{oglas.cena}</p>
              <p>{oglas.brojTelefona}</p>
              <p>{oglas.novo}</p>
              <p>{oglas.kategorija}</p>
              <p>{oglas.userID}</p>
              <div>
                {oglas.uploadedImageList?.map((url) => {
                  return (
                    <img
                      src={url}
                      alt="slslsa"
                      style={{ width: "100px", margin: "10px" }}
                    />
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </Layout>
  );
}

export default MojiOglasi;
