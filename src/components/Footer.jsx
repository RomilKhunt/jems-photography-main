import React from "react";
import "../styles/Footer.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';import TwitterIcon from '@mui/icons-material/Twitter';import GoogleIcon from '@mui/icons-material/Google';import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <LocationOnIcon />
                <div className="cta-text">
                  <h4>Find us</h4>
                  {/* 360530 */}
                  <span>Patel girls hostel road, Jamjodhpur, Gujarat </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
              <CallIcon />
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>9925858350, 9067888188</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
              <EmailIcon />
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>jemsphotography.in@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <div id="lggg">
                    Jems Photography
                  </div>
                </div>
                <div className="footer-text">
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                    sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <div className="ic-gd">

                  <a href="#" className=" facebook-bg">
                    <FacebookOutlinedIcon  />
                  </a>
                  <a href="#" className=" twitter-bg">
                    <TwitterIcon  />
                  </a>
                  <a href="#" className=" google-bg">
                    <GoogleIcon  />
                  </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                 <li>
                  <a href="/#service" >
                  Pre-Wedding
                    </a>
                  </li> <li>
                    <a href="/#about">about</a>
                  </li>
                 
                    <li>
                   <a href="/#service">Destination Wedding</a>
                  </li> <li>
                    <a href="/#work">portfolio</a>
                  </li>
                
                  <li>
                    <a href="/#service" >Wedding Shoot</a>
                  </li> 
                  <li>
                    <a href="/#service">services</a>
                  </li>
                  <li>
                    <a href="/#service">Cinematography</a>
                  </li>
                 <li>
                    <a href="/#contact">Contact</a>
                  </li>
                  <li>
                    <a href="#">Latest News</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="footer-text mb-25">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <SendIcon className="fab fa-telegram-plane" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  Copyright © 2018, All Right Reserved{" "}
                  <a href="https://qubit-tech.vercel.app/">Qubit Tech</a>
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div className="footer-social-icon">
                  <div className="ic-gd">
                  <a href="https://www.facebook.com/jemsphotography.in/" className=" facebook-bg">
                    <FacebookOutlinedIcon  />
                  </a>
                  <a href="https://www.instagram.com/jems_photography.in/" className="insta-bg">
                    <InstagramIcon/>
                  </a>
                  <a href="https://www.youtube.com/@jems.studio" className=" yt-bg">
                    <YouTubeIcon/>
                  </a>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
