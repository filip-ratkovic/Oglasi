import { Box } from '@mui/material'
import React from 'react'

import "./single.css"

function SingleOglasCard({oglas}) {
  return (
    <Box className="my-card-container">
         <Box className="my-image-container">
            <Box className="my-image-large" style={{backgroundImage:`url(${oglas.img[0]})`}}>
            </Box>
            <Box className="my-image-all">

            </Box>
            {/* <Box>
                {oglas.uploadedImageList?.map((url) => {
                  return (
                    <img
                      src={url}
                      alt="slslsa"
                      style={{ width: "100px", margin: "10px" }}
                    />
                  );
                })}
              </Box> */}
          </Box>
          <Box className="my-text-container">
          </Box>
    </Box>
  )
}

export default SingleOglasCard