import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUsersById } from '../../config/firebase';
import Layout from '../../containers/Layout';

function Profil() {
    const [userData, setUserData] = useState([]);
    const params = useParams();

    const getUsersData = async () => {
       const usersResult = await getUsersById(params.id)
       setUserData(usersResult)
    }

    useEffect(()=> {
        getUsersData()
    },[])

    console.log(userData)

  return (
    <Layout>
        <div>
        <h1>{userData.ime_prezime}'s profil</h1>
    </div>
    </Layout>
  )
}

export default Profil