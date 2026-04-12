import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <main className="flex-1 w-full flex items-center justify-center bg-[#E0E0E0]">
                <Outlet />
            </main>
        </div>
    )
}