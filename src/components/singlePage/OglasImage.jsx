import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper from 'swiper';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "./oglasImage.css";
import { Box, useTheme } from "@mui/material";
function OglasImage({ adData }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const theme = useTheme();


  return (
    <Box className="add-img-cont">
      <Swiper
        style={{
          "--swiper-navigation-color": theme.palette.primary.main,
          width:"100%",
          height:"83%"
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="ad-img-big-slide"
      >
        {adData.img?.map((url) => {
          return (
            <SwiperSlide>
              <img src={url} alt="image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
      style={{
        width:"100%",
      height:"15%",
      paddingInline:"10px"
    }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        centeredSlides={true}
      >
        {adData.img?.map((url) => {
          return (
            <SwiperSlide className="ad-img-small-slide">
              <img src={url} alt="image" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default OglasImage;
