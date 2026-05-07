import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import logo from "../assets/hemodialysis.png";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function Layout() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth";
  };

  return (
    <div className="h-screen overflow-hidden bg-white flex">
      <header className="fixed top-0 left-0 right-0 h-18 z-50  flex items-center justify-between  px-30 bg-gradient-to-b from-green-800 to-green-700 border-b border-gray-200">
        <div className="flex items-center">
          <div className="items-center justify-center">
            <img src={logo} alt="" className="object-contain w-25 h-25" />
          </div>
          <span className="text-sm font-semibold text-white tracking-wide">
            {" "}
            ISABELA KIDNEY CENTER{" "}
          </span>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm flex items-center justify-center font-medium text-white hover:text-white/70 transition gap-1"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform duration-200 " />
          Logout
        </button>
      </header>
      <div className="w-[100px] h-full fixed top-15 left-20 z-40">
        <Navbar />
      </div>
      <div className="ml-[100px] pt-12 flex-1 h-full overflow-y-auto no-scrollbar px-12">
        <main className="min-h-full flex items-center justify-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
