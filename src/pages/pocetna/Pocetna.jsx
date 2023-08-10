import React, { useEffect, useState } from 'react'
import Layout from '../../containers/Layout'
import {auth, getOglase} from '../../config/firebase'

function Pocetna() {
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
    <Layout><div style={{width:'100%',display:"flex",  flexWrap:"wrap"}}>
      
{oglasi.map((oglas)=> {
 
 return <div style={{ width:"250px", margin:"30px", border:"1px solid red"}}>
 <h1>{oglas.naziv}</h1>
 <p>{oglas.text}</p>
 <p>{oglas.cena}</p>
 <p>{oglas.brojTelefona}</p>
 <p>{oglas.novo}</p>
 <p>{oglas.kategorija}</p>
 <p>{oglas.userID}</p>
 <div>
   {oglas.uploadedImageList?.map((url)=> {
     return <img src={url} alt="slslsa"  style={{width:"100px", margin:"10px"}}/>
   })}
 </div>
</div>
 
})}
    </div>
      </Layout>
  )
}

export default Pocetna