import React, { useEffect, useState } from 'react'
import {  storage, uploadImage } from '../config/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage';

function ImageUpload() {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([])
    const imageListRef = ref(storage, 'images/')
  
    const submitUploadImage = async () => {
      if(imageUpload == null) return;
       uploadImage(imageUpload)
       .then((snaphsot)=> {
        getDownloadURL(snaphsot.ref).then((url)=> {
          setImageList((prev) => [...prev, url])
        })
       })
      alert("Uploaded")
    }
  
  
    useEffect(()=> {
      listAll(imageListRef)
      .then((response)=> {
        response.items.forEach((item)=> {
          getDownloadURL(item).then((url)=> {
            setImageList((prev)=> [...prev, url])
          })
        })
       })
    },[])
  return (
    <div>
        <input type="file" onChange={(e)=> setImageUpload(e.target.files[0])} />
<button onClick={submitUploadImage}>Upload image</button>
  
  {imageList.map((url)=> {
   return (
      <img src={url} alt="oglas" style={{width:"50px", margin:"10px"}}/>
    )
  })}
    </div>
  )
}

export default ImageUpload