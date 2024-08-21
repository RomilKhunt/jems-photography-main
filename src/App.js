import React, { createContext, useState } from "react";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Wedding from "./pages/Service/Wedding";
import { ServiceProvider } from "./providers/ServiceProvider";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import SliderModification from "./pages/admin/SliderModification";
import EditAboutSection from "./pages/admin/EditAboutSection";
import ServiceList from "./pages/admin/ServiceList";
import ServiceForm from "./pages/admin/ServiceForm";
import AddRemoveGridImgs from "./pages/admin/AddRemoveGridImgs";
import Splash from "./pages/Home/Splash";

export const MyContext = createContext();
const App = () => {
  const [isLogin,setIsLogin]=useState(false);
  const [gservices,setGservices]=useState([]);
  const [mainSlider,setMainSlider]=useState(null);
  const [services,setServices]=useState(null);
  const [workslider,setWorkSlider]=useState(null);
  return (
    <MyContext.Provider value={{
      isLogin,setIsLogin,
      gservices,setGservices,
      mainSlider,setMainSlider,
      services,setServices,
      workslider,setWorkSlider
      }}>
      <Splash/>
      <Router>
        <ServiceProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/service/" element={<Wedding />} />
            <Route
              path="/dashboard"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <Dashboard />
                  </main>
                </div>
              }
            />
            <Route
              path="/dashboard/modify-slider"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <SliderModification />
                  </main>
                </div>
              }
            />
            <Route
              path="/dashboard/modify-about"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <EditAboutSection />
                  </main>
                </div>
              }
            />
            <Route
              path="/dashboard/modify-service"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <ServiceList />
                  </main>
                </div>
              }
            />
            <Route
              path="/dashboard/add-service"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <ServiceForm />
                  </main>
                </div>
              }
            />
            <Route
              path="/dashboard/manage-grid"
              element={
                <div id="app" className="rw">
                  <Sidebar />

                  <main className="db-fix-h">
                    <AddRemoveGridImgs />
                  </main>
                </div>
              }
            />
          </Routes>
        </ServiceProvider>
      </Router>
    </MyContext.Provider>
  );
};

export default App;
