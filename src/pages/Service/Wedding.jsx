import React, { useEffect } from 'react';
import ImgGrid from '../../components/ImgGrid';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';

import { useService } from '../../providers/ServiceProvider';


const Wedding = () => {
  const { serviceData, setService } = useService();
const navigate = useNavigate()
  useEffect(() => {
    document.title = `JemsPhotography - ${serviceData?.title || 'Wedding'}`;
  }, [serviceData]);

  const exploreMore = () => {
    // Redirect to the specified route and pass imgData as state
    navigate(serviceData.route, { state: { imgData: serviceData.imgData } });
  };
  console.log(serviceData);
  return (
    <div>
      <header
        id="page-title"
        style={{
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.085), rgba(0, 0, 0, 0.2)), url(${serviceData.backgroundImg})`
        }}
      >
        <Nav />
        <div
          className="page-title-content"
          style={{
            // Styles for the ::after pseudo-element
            position: 'relative',
          }}
        >
          {serviceData && (
            <div
              className="page-title-after"
            >
              {serviceData.title}
            </div>
          )}
        </div>
      </header>
      <main>
     
     <ImgGrid itemData={serviceData.imgData}  />
      </main>
      <section>
        <Footer />
      </section>
    </div>
  );
};

export default Wedding;