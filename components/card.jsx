import React from 'react'

export default function Card({title, description, image}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 w-[300px] mx-auto">
      <img
        src="https://via.placeholder.com/300x180"
        alt="Card Image"
        className="rounded-xl"
      />
      <div className="mt-4 text-center space-y-1">
        <p className="text-sm font-medium text-gray-500">Seamless</p>
        <p className="text-lg font-semibold text-black">UPI payments</p>
      </div>
    </div>
  )
}