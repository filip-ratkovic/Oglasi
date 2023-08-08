import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';

function DodajOglas() {
    const navigate = useNavigate()
    const authState = useSelector((state) => state.auth);
    const userAuth = auth?.currentUser?.uid;

    useEffect(()=> {
        if (!userAuth) {
          navigate("/registracija");
          alert("nemate pristup");
        }
       })
  return (
    <div>DodajOglas</div>
  )
}

export default DodajOglas