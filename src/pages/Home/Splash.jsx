import React, { useState } from 'react'

function Splash() {
    const [isVisible,setIsVisible]=useState(true);
    setTimeout(() => {
        setIsVisible(false);
    }, 3000);
  return (isVisible &&
   <div className="loaderr">
    <img src="https://i.imgur.com/ntiDmWO.png" alt="" />
   </div>
  )
}

export default Splash
