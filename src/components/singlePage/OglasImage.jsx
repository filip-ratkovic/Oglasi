import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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
    <Box className="ad-img-cont">
      <Swiper
        style={{
          "--swiper-navigation-color": "#1976d2",
          width:"100%",
          height:"83%"
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="ad-img-big-slide"
      >
        {adData.img?.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={url} alt="sliderImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
      style={{
        width:"100%",
      height:"15%",
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
        {adData.img?.map((url, index) => {
          return (
            <SwiperSlide className="ad-img-small-slide" key={index*5}>
              <img src={url} alt="sliderImage" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}

export default OglasImage;
