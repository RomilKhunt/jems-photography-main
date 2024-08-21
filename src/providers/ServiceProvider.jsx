// ServiceProvider.js
import React, { createContext, useContext, useState } from 'react';

const ServiceContext = createContext();

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider = ({ children }) => {
  const [serviceData, setServiceData] = useState({
    title: '',
    backgroundImg: '',
    imgData: [],
  });
  
  const setTitle = (title) => {
    setServiceData((prevData) => ({ ...prevData, title }));
  };

  const setBackgroundImg = (backgroundImg) => {
    setServiceData((prevData) => ({ ...prevData, backgroundImg }));
  };

  const setImgData = (imgData) => {
    setServiceData((prevData) => ({ ...prevData, imgData }));
  };

  return (
    <ServiceContext.Provider value={{ serviceData, setTitle, setBackgroundImg, setImgData }}>
      {children}
    </ServiceContext.Provider>
  );
};
