'use client'
import React, { useState } from 'react';

const App = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 bg-gray-50 font-sans">
      
      {/* IGPS SAVINGS CALCULATOR Heading */}
      <h1 className="text-center mt-12 mb-8 select-none">
        <span className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase">
          <span className="text-gray-400 opacity-90">IGPS </span>
          <span className="text-green-700">SAVINGS </span> <br/>
          <span className="text-gray-500 opacity-80">CALCULATOR</span>
        </span>
      </h1>

      {/* Calculator Image */}
      <div className="w-full max-w-4xl -mb-40 flex justify-center">
        <img 
          src="/transfer.png" 
          alt="IGPS Savings Calculator" 
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default App;