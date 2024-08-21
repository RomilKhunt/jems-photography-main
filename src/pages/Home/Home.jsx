import React, { useContext, useEffect, useState } from "react";
import Nav from "../../components/Nav";
import MainSlider from "../../components/MainSlider";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import WorkSlider from "../../components/WorkSlider";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useService } from "../../providers/ServiceProvider";
import Splash from "./Splash";
import { MyContext } from "../../App";
const itemData = [
  { img: "../imgs/main-slider/1.jpg" },
  { img: "../imgs/main-slider/5.jpg" },
  { img: "../imgs/prt-img/p8.jpg" },
  { img: "../imgs/prt-img/p1.jpg" },
  { img: "../imgs/prt-img/p6.jpg" }
];
const serviceInfoArray2 = [
  {
    title: "Engagement Photography",
    text:
      "Immortalize your love story with enchanting engagement photography. Every glance and smile is elegantly captured, creating a visual narrative of your unique journey.",
    img: "./imgs/main-slider/6.jpg",

    imgData: itemData,
  },

  {
    title: "Wedding Photography",
    text:
      "Capture the magic of your special day with a blend of traditional elegance and contemporary style. Preserve every emotion and detail in timeless images.",
    img: "./imgs/main-slider/1.jpg",

    imgData: itemData,
  },
  {
    title: "Pre-Wedding Photography",
    text:
      "Celebrate the anticipation of your union with pre-wedding photography. Craft intimate portraits that reflect the excitement and romance preceding your wedding day.",
    img: "./imgs/main-slider/3.jpg",

    imgData: itemData,
  },
  {
    title: "Cinematography",
    text:
      "Elevate your wedding memories with cinematography services. We skillfully weave together moving visuals, emotions, and music, producing a captivating film that tells your unique love story.",
    img: "./imgs/main-slider/4.jpg",

    imgData: itemData,
  },
  {
    title: "Destination Wedding",
    text:
      "Transform your nuptials into an unforgettable adventure with destination wedding photography. We accompany you to the most scenic locations, ensuring a magical and picturesque experience.",
    img: "./imgs/main-slider/5.jpg",

    imgData: itemData,
  },
];
const Home = () => {
  const { setTitle, setBackgroundImg, setImgData } = useService();
  const [serviceInfoArray,setServiceInfoArray]=useState(serviceInfoArray2);
  const navigate = useNavigate();
  const { services,setServices }=useContext(MyContext);
  
  
  const backend = process.env.REACT_APP_BACKEND;
  const token = "jems@jkotiajrekjak752ukajk"
  const loadservice = async ()=>{
    const dt = await fetch(`${backend}/services`,{
      method:"GET",
      headers:{
        token:token
      }
    })
    const fr = await dt.json();
    if(fr.status=="ok"){
      setServiceInfoArray(fr.dt);
      setServices(fr.dt);
    }else{
      alert("error");
    }
  }
 
  const handleExploreMore = (service) => {
    setTitle(service.title);
    setBackgroundImg(service.img);
    setImgData(service.imglist); // Make sure imgData is set

    // Redirect to the specified route and pass imgData as state
    navigate('/service/', { state: { imgData: service.imglist } });
  };
  useEffect(()=>{
    if(services){
      setServiceInfoArray(services);
    }else{
      loadservice();
    }
  },[])
  return (
    <>
      
      <header>
        <Nav />
        <MainSlider />
      </header>

      <main>
        <section id="about">
          <div className="marq">
            <div className="txt">jemsphotography</div>
          </div>
          <div className="ab-flex">
            <div className="ab-r">
              <img loading="lazy"  src="./imgs/main-slider/2.jpg" alt="" />
            </div>
            <div className="ab-l">
              <div className="pink">Jemsphotography</div>
              <div className="t-title">
                Artistic Story Telling Celebrating YOU!
              </div>
              <div className="s-title">
               <p>
                Welcome to Jems Photography, your one-stop destination for capturing life's most cherished moments!  </p>
              <p>
                We specialize in wedding photography, pre-wedding shoots, and birthday celebrations, bringing your special occasions to life through the lens.  
              </p>
              <p>
                 Our team of dedicated photographers is passionate about transforming your milestones into lasting memories. Whether it's the magic of your wedding day, the excitement of pre-wedding adventures, or the joy of birthday festivities, we're here to document and celebrate each unique chapter of your life.    
              </p>
              <p>
                At Jems Photography, we believe in turning every moment into a beautiful story that you'll treasure forever. Let us be a part of your journey, creating visual narratives that reflect the warmth, love, and joy of your special occasions. 
         
              </p>
              </div>
            </div>
          </div>
        </section>
        <section id="service">
          {serviceInfoArray && serviceInfoArray.map((service, index) => (
            <div className="ser-flex" key={index}>
              <div className="ser-img">
                <img src={service.img} loading="eager" alt={`Service ${index + 1}`} />
              </div>
              <div className="ser-info">
                <div className="ser-title">{service.title}</div>
                <div className="ser-txt">{service.text}</div>
                <button
                  className="btn"
                  onClick={() => handleExploreMore(service)}
                >
                  Explore More
                </button>
              </div>
            </div>
          ))}
        </section>
        <section id="work">
          <div className="title">
            <h1>Our Work</h1>
          </div>
          <WorkSlider />
        </section>
      </main>
      <section id="contact">
        <Footer />
      </section>
    </>
  );
};

export default Home;
