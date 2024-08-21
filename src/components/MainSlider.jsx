import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Autoplay } from "swiper/modules";
import { MyContext } from "../App";

const MainSlider = () => {
  const backend = process.env.REACT_APP_BACKEND;
  const [swiper,setSwiper]=useState(null);
  const {mainSlider,setMainSlider}=useContext(MyContext);
  const token = "jems@jkotiajrekjak752ukajk";
  const loadImg = async ()=>{
    const dt = await fetch(`${backend}/mainsliderImages`,{
      method:"GET",
      headers:{
        token: token
      }
    })
    const fr = await dt.json();
    setSwiper(fr.dt);
    setMainSlider(fr.dt);
  }
  useEffect(() => {
    if(mainSlider){
      setSwiper(mainSlider);
    }else{
      loadImg();
    }
  }, [])
  
  return (
    <div>
      {" "}
      {swiper ? <Swiper
        spaceBetween={30}
        loop={true}
        grabCursor={true}
        effect={"fade"}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        // navigation={true}
        // pagination={{
        //   clickable: true,
        // }}
        modules={[EffectFade, Autoplay]}
        className="mySwiper main-sldr"
      >
        {swiper.map((e)=>(<SwiperSlide>
            <img loading="eager" src={e.link} alt="" />
          </SwiperSlide>
        ))}
        
      </Swiper>:
      <div id="ifNoMainSlider">

        <img  loading="lazy" src="https://lh3.googleusercontent.com/fife/AGXqzDmELXrbNmF6-bE5gzAAGIRx78RcmgXu51Vpww4qwkGz7kFpcoZOUpcTgAWl4OOctkueESIBFQnOUvoOi7AJTuFzFSM9KRXea7f2BK9smwfcac8R4PZiYj25cIPAQgn7W_rgn960Pz-bDUANINvShguw0Ud9PLQHbj6DZ4v9xftBfFmyf2IB6Becu3cKdFEZiQz6nVV2JO90QDGblP4ok4-SOIv3xeTmIrLBY7m0U7_6swCpwFBu9U2Pab23Jqt5lY0reUetPzQ0jbRKdpBuubiMUpzEWxpx3MlEQ9vM9eoJInHHGLufBna-RfdQneYQ9XnBVLA4_eb63b9TDaJfZ4qQEJrlpmzAWeKjYQCJkMblYPS6gfQR-X1Hl1qyH6XypzKP7y4Gjrzag-LDkTUSF5cTIPi4Gk9GYgJsFZQUMIYhbieT6w8KOhgWb7bhnQ91pf4J8pkrGR2aDX7zYSVGpLK5BA9d6dMafisRi9TrgWvKq1DeOYeln0jZQvA_KOh_JxMjJFTXZgl8P1pRDadL-1s793OJBvoTMmdDaoQny9Ot0sen2aCYlX9-C1NhcPJ34QAXJdHQLvAoKQdA3WnOh7zFtjwjLKxdcKmYD6HPr15dqZ7YPizFYyWQdPGqbe0gx5PihfPfxiLdW1MNkJaw-Df7t3djQVJYB5m_j50QqM9xbSvTFZrptz7ZzA1NHk_ea8MyixhsRloNtvmCn6uIMW4w-EcfM1_EihLPaSM-m7DpE5f1zL67fBm9N3YezEub0pu6lKiD2w3aDln0YTU9W4A1vPQiw6jBE6eMewg06oHUoP3tamXH0W8Si9Loa2CjN5uUzYkza5yVeCojvEuIn_A4B5pCfsFeTIzGqapgPnVfIxilsPo8ZTJEo4WBzyQwtPZeybMEjQkh5zmypi9W74tnA62B_0pFIH915ceZqKawu7xHXHMBDfo6dsxRpQCHDXBTnMHB-a3w9frLAmzWBThDHXzv3YPEbIIflPtxuZ5OQqOL9Z2IsLza7zNukpDRLLGg4qTmGe1xFsxkHhOuDJljz4Y55mojW9UN7KWWC6N5pzZYdT4m_Xpye_5DAzCgfE3LXKFq9LPWJQJxjsurrnE0OvzNFK5TmJwxniD_bJVtvPzZSiNIl4WlvLXvrHaeuuyBp1qFCcDl0xb9-gbDc9sc1sr6Hlv89ToVPUCT-eN7C-L29aQUW98Vy85irZH9Taf6s_yaYwLQrcce3dYhUgLyow9rZ8qROLnwMyxy2Qpg61DJVur3hlWhS5BQFQ-363I0R7NQSz2MAc0WpqdTTo_AUhRWnglrOKRNqDPdIhH0lz7HCJs3XYRfBVt0MoHRaly3cws2JY4zu_Kg1taHpmuDRWg0TpbJNGRZDsOjmRohD5LGGxKm6D2y_fPVq-qFleH1YZfr24LAyq_l3AzQHBMKt0AtEs7NcQjmfW0LYTTI6isiEYpsdBNYT9sorwmad7nNgJHXuLA9m6KsCwEycss6HnM75_YcBlFMoI_ylwFVlxQPlpPtA6IIEgGyGpyeVBrtKnGNY32MEdxm1trc-jBz8MYX0PA58u0lNxZE-btsh4KBTiOMLz5QmqVPNFZ3bWXkNrg59rsJbhxkXG5NOPWI-om2bijA-7hxYjTNn-L4-bkT9ShU-JBVYkGPP_wIUM3zAhRJHTeNtnUNkWygQCrxbNE-obKbWouPq_lBTgXj41IG9ik7Mkgon2eBYDGq3MSFP3cFyn0ICv35HxcWWxOsktrCkJhE8oGFRUpXenpWVyCkpzWM79o=s794-w794-h530-s-no-gm?authuser=0" alt="Main img" />
      </div>
        }
    </div>
  );
};

export default MainSlider;
