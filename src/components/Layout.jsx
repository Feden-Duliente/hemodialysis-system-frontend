import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen overflow-hidden bg-gray-900/20 flex "> 

      {/* sidebar */}
      <div className="w-[100px] h-full fixed top-12 left-0 z-50">
        <Navbar />
      </div>

      {/* main */}
      <div className="ml-[100px] flex-1 h-full overflow-y-auto no-scrollbar"> 
        <main className="min-h-full flex items-center justify-center"> 
          <Outlet /> 
        </main> 
      </div>

    </div>
  );
}