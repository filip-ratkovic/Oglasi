import React, { useEffect, useState } from 'react'
import "./oglas.css"
import { useNavigate, useParams } from 'react-router-dom';
import { getOglasById } from '../../config/firebase';
import { Box, Button } from '@mui/material';
import OglasImage from '../../components/image/OglasImage';
import Layout from '../../containers/Layout';

function Oglas() {
  const [adData, setAdData] = useState([]);
  const params = useParams();
  const navigate = useNavigate()

  const getAdData = async () => {
    const adRes = await getOglasById(params.id);
    setAdData(adRes)
  }
  
  useEffect(()=>{
    getAdData();
  },[])
  
  return (
   <Layout>
   <Box style={{width:"100%", height:"100%"}}>
   <Button variant="contained" onClick={()=> navigate("/")}
   style={{margin:"20px 50px"}}
   >Nazad na početnu</Button>
     <Box className='ad-container'>
      <OglasImage adData={adData}/>
      <Box className="ad-text-container">

      </Box>
    </Box>
   </Box>
   </Layout>
  )
}

export default Oglas