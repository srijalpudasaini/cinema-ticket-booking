import React from 'react'

const Profile = () => {
  return (
    <>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
        <div className="">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
            value="Srijal Pudasaini"
          />
        </div>
        <div className="">
          <label htmlFor="number">Phone</label>
          <input
            type="number"
            name="number"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
            value="9810008986"
          />
        </div>
        <div className="">
          <label htmlFor="name">Email</label>
          <input
            type="email"
            name="email"
            className="w-full outline-none border border-gray-500 rounded-md bg-black p-1"
            value="srijalpudasaini89@gmail.com"
          />
        </div>
      </div>
      <button className="py-1 px-8 inline-block mt-4 text-black rounded-full bg-main">
        Save
      </button>
    </>
  )
}

export default Profile