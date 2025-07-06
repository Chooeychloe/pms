import { Sidebar } from "@/components/sidebar";
import { NavBar } from "@/components/navbar";
import React from "react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex bg-gray-200">
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:[14%]">
        <Sidebar></Sidebar>
      </div>
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:[86%] bg-[#F7F8FA] flex flex-col">
        <NavBar />
        <div className="h-full w-full p-2 overflow-y-scroll"> {children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
