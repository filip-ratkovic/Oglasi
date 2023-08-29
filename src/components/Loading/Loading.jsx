import { CircularProgress } from '@mui/material'
import React from 'react'

function Loading() {
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", width:"100vw", height:"100vh"}}>
        <CircularProgress style={{color:"#1976d2"}}/>
    </div>
  )
}

export default Loading