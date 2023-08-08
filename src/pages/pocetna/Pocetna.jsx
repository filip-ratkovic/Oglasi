import React, { useEffect, useState } from 'react'
import Layout from '../../containers/Layout'
import { getOglase } from '../../config/firebase'

function Pocetna() {
  const [oglas, setOglas] = useState([])

  useEffect(() => {
    getOglase()
      .then((data) => {
        setOglas(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(oglas)
  return (
    <Layout>
      <h1>pocetna</h1>
    </Layout>
  )
}

export default Pocetna