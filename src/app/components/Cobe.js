"use client";
import React from "react";
import { Cobe } from "./CobeGlobe";
import { FullNeonCard } from "./FullNeonCard";


function CobeAuto() {
  return (
    <div className="items-center justify-center md:h-auto dark:bg-black bg-white absolute w-screen">
      <FullNeonCard className='mx-auto' />
        <Cobe/>
     
    </div>
  );
}

export default CobeAuto;
