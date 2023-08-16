import React, { useEffect, useState } from 'react'
import Layout from '../../containers/Layout'
import {auth, getOglase, getUsers} from '../../config/firebase'
import { useSelector } from 'react-redux';

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
    <Layout>
      {/* <div style={{width:'100%',display:"flex",  flexWrap:"wrap", marginTop:"400px"}}>
      
{oglasi.map((oglas)=> {
 
 return <div style={{ width:"250px", margin:"30px", border:"1px solid red"}}>
 <h1>{oglas.naziv}</h1>
 <p>{oglas.opis}</p>
 <p>{oglas.cena}</p>
 <p>{oglas.broj_elefona}</p>
 <p>{oglas.stanje}</p>
 <p>{oglas.kategorija}</p>
 <p>{oglas.lokacija}</p>
 <h1>{oglas.username}</h1>
 <p>vreme postavljanja oglasa : {oglas.datum}</p>
 <div>
   {oglas.img?.map((url)=> {
     return <img src={url} alt="slslsa"  style={{width:"100px", margin:"10px"}}/>
   })}
 </div>
</div>
 
})}
    </div> */}
      </Layout>
  )
}

export default Pocetna