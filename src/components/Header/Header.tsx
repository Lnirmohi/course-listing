import React from "react";

export default function Header() {
  return (
    <div className="col-span-full flex justify-between shadow-md px-12">
      <h2 className="text-primary text-center self-center font-RobotoSlab text-lg leading-none tracking-wide">
        Course <br /> Listing
      </h2>
      <nav className="flex grow justify-center list-none">
        <li className="px-4 py-5 font-bold text-primary text-lg border-b-2 border-b-primary">Courses</li>
        <li className="px-4 py-5 font-bold text-primary text-lg border-b-2 border-b-primary">Dashboard</li>
      </nav>
      <p className="text-primary self-center">Name</p>
    </div>
  );
}
