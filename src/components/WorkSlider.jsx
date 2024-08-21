import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css/bundle";
import { MyContext } from "../App";
import { SetMeal } from "@mui/icons-material";

const WorkSlider = () => {
  const backend = process.env.REACT_APP_BACKEND;
  const token = "jems@jkotiajrekjak752ukajk";
  const [portraitSliderData, setPortraitSliderData] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const {workslider,setWorkSlider}=useContext(MyContext);

  const portraitImages = Array.from(
    { length: 10 },
    (_, index) => `./imgs/prt-img/p${index + 1}.jpg`
  );

  const loadPts = async () => {
    const dt = await fetch(`${backend}/portraitSlider`, {
      method: "GET",
      headers: {
        token: token,
      },
    });
    const finalResult = await dt.json();
    setPortraitSliderData(finalResult?.dt);
    // console.log(finalResult.dt);
    setWorkSlider(finalResult?.dt);
  };

  useEffect(() => {
    if(workslider){
      setPortraitSliderData(workslider);
    }else{
      loadPts();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // Set slidesPerView based on window width
      setSlidesPerView(window.innerWidth > 768 ? 3 : 1);
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial call to setSlidesPerView based on window width
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Swiper
        loop={true}
        grabCursor={true}
        slidesPerView={slidesPerView}
        spaceBetween={50}
        effect={"coverflow"}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper wrk-sldr"
      >
        {portraitSliderData &&
          portraitSliderData.map((image, index) => (
            <SwiperSlide key={index} className="wrk-imgs">
              <img
              
                loading="lazy"
                src={image.link}
                alt={`Portrait ${index + 1}`}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default WorkSlider;
