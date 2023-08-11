import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, dodajOglas } from "../../config/firebase";
import Layout from "../../containers/Layout";
import {  storage, uploadImage } from '../../config/firebase'
import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import { useTheme } from "@mui/material";
import { v4 } from "uuid";


function DodajOglas() {
  const [file, setFile] = useState([]);
  const [data, setData] = useState({})
  const [imageList, setImageList] =useState([])

  const navigate = useNavigate();
  const theme = useTheme();
  const authState = useSelector((state) => state.auth);
  const userAuth = auth?.currentUser?.uid;
  const imageRef = ref(storage, `oglasi/${file.name + v4()}`)


  const potvrdiOglas = async (values) => {
    try {
      await dodajOglas(values);
      alert("Uspesno !");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  
  
  useEffect(()=> {
    if(file.length>0) {
       for(let image of file) {
        uploadImage(image)
        .then((snaphsot)=> {
          getDownloadURL(snaphsot.ref).then((url)=> {
            imageList.push(url)
            setData((prev) =>({...prev, img:imageList}))
          })
        }).then(()=> setData((prev)=>({...prev, img:imageList})))
       }
    }
   
},[file]);
  console.log(imageList)
  const date = new Date();
  const godina = date.getFullYear();
  const mesec = date.getMonth();
  const dan = date.getDate();
  
  const datum = `${dan}.${mesec}.${godina}`;
 
  // useEffect(()=> {
  //   const uploadImages = ()=> {
  //     const imageRef = ref(storage, `oglasi/${file.name + v4()}`);
  //     const uploadTask = uploadBytesResumable(imageRef, file);
      
  //     uploadTask.on('state_changed', 
  //     (snapshot) => {
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //           case 'running':
  //           console.log('Upload is running');
  //           break;
  //           default:
  //           break;
  //       }
  //     }, 
  //     (error) => {
  //     }, 
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setData((prev)=> ({...prev, img:downloadURL}))
  //       });
  //     }
  //   );
  //      file &&  uploadImages()
  //     }
  // },[file]);
  return (
    <Layout>
      <input type="file" id="file" multiple
       onChange={(e)=>{setFile(e.target.files)}} />
      {imageList.map((url)=> {
        return (
          <div>
              <img src={url} alt="urururu" style={{width:"50px", margin:"10px"}} />
          </div>
        )
      })}
    </Layout>
  );
}

export default DodajOglas;
