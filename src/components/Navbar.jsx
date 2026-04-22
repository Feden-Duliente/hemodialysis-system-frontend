import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReportLayout from "../pages/philHealthReport";

import logo from "../assets/hemodialysis.png";
import logout from "../assets/logout.png";
import bot from "../assets/bot.png";
import hemobot from "../assets/hemo-bot.png";
import close from "../assets/close.png";
import send from "../assets/send.png";
import fileIcon from "../assets/attachement.png";

import {
  HomeIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  IdentificationIcon,
  CalendarDaysIcon, 
  ClipboardDocumentListIcon,
  XMarkIcon 
} from "@heroicons/react/24/solid";
import { DownloadIcon,  } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeReport, setActiveReport] = useState(null);


  // pdf report fucntion
  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "All Reports",
  });

  return (
    <>
      <div className="h-[35rem] w-full px-4 py-7 flex flex-col justify-between text-white">
        <div className="flex flex-col items-center justify-between gap-6 bg-[#0c5148] rounded-lg shadow lg px-4 py-4 h-full">
          <div className="flex flex-col items-center justify-center gap-6">
            <Link to="/">
              <HomeIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

            <Link to="/doctor-fees">
              <CurrencyDollarIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

            <Link to="/expiring-labs">
              <BeakerIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

            <Link to="/philhealth">
              <IdentificationIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

            <Link to="/schedules">
              <CalendarDaysIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

            <Link to="/activity-logs">
              <ClipboardDocumentListIcon className="w-6 h-6 transition-transform duration-200 hover:scale-120 hover:text-green-600" />
            </Link>

          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative inline-block"> 
              <button onClick={() => setOpenCalendar(true)} className="flex items-center justify-center transition" >
                <CalendarDaysIcon className="w-6 h-6 transition-transform duration-200 hover:scale-110 hover:text-green-600" />
              </button>
 
              {openCalendar && (
                <div className="absolute left-20 bottom-4 w-64 rounded-2xl bg-white/20 backdrop-blur-2xl border border-white/30 shadow-2xl z-50 overflow-hidden p-4">
 
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[11px] font-semibold text-gray-800"> Select Date Range </h2> 
                    <button onClick={() => setOpenCalendar(false)} className="p-1 rounded-md hover:bg-white/30 transition" >
                      <XMarkIcon className="w-4 h-4 text-gray-700 hover:text-red-600" />
                    </button>
                  </div>
 
                  <div className="flex flex-col gap-1 mb-3">
                    <label className="text-[9px] text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-2 py-1 text-[10px] rounded-lg bg-white/30 border border-white/40 backdrop-blur-xl text-gray-800 outline-none"
                    />
                  </div>
 
                  <div className="flex flex-col gap-1 mb-4">
                    <label className="text-[9px] text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-2 py-1 text-[10px] rounded-lg bg-white/30 border border-white/40 backdrop-blur-xl text-gray-800 outline-none"
                    />
                  </div>
 
                  <div className="flex gap-2"> 
                    <button
                      onClick={() => {
                        console.log("Date Range:", startDate, endDate);
                        setOpenCalendar(false);
                      }}
                      className="flex-1 px-3 py-1 text-[10px] rounded-lg bg-[#0c5148]/70 text-white hover:bg-[#0c5148] transition"
                    >
                      Apply
                    </button>

                    <button
                      onClick={() => {
                        setStartDate("");
                        setEndDate("");
                      }}
                      className="flex-1 px-3 py-1 text-[10px] rounded-lg bg-white/30 text-gray-800 hover:bg-white/50 transition"
                    >
                      Clear
                    </button>

                  </div>

                </div>
              )}

            </div>

            <div className="relative inline-block">
              <button onClick={() => setOpen(!open)} className="flex items-center justify-center  transition"  >
                <DownloadIcon className="w-6 h-6 transition-transform duration-200 hover:scale-110 hover:text-green-600" />
              </button>
              {open && (
                <div className="absolute left-20 bottom-4 w-48 rounded-xl  bg-white/20 backdrop-blur-xl  border border-white/30  shadow-xl z-50 overflow-hidden">
                  <div className="relative">
                    <button className="w-full px-4 py-2 text-[10px] font-medium text-black/90  hover:bg-[#1b4486]/70 hover:text-white transition text-center" onClick={() => setActiveReport(activeReport === "all" ? null : "all") } >
                      ALL REPORTS
                    </button>

                    {activeReport === "all" && (
                      <div className="w-full border-t border-white/20">
                        <button className="w-full px-4 py-2 text-[9px] text-gray-800 font-bold hover:bg-[#9A0000]/70 hover:text-white" onClick={() => { handlePrint(); setOpen(false); setActiveReport(null); }} >
                          PDF
                        </button>

                        <button className="w-full px-4 py-2 text-[9px] text-gray-800 font-bold hover:bg-[#0c5148]/70 hover:text-white" onClick={() => { console.log("ALL REPORTS EXCEL"); setOpen(false); setActiveReport(null); }} >
                          EXCEL
                        </button>
                      </div>
                    )}

                  </div>

                  <div className="relative border-t border-white/20">
                    <button className="w-full px-4 py-2 text-[10px] font-medium text-black/90 hover:bg-[#1b4486]/70 hover:text-white transition text-center" onClick={() => setActiveReport(activeReport === "phil" ? null : "phil") } >
                      PHILHEALTH REPORT
                    </button>

                    {activeReport === "phil" && (
                      <div className="w-full border-t border-white/20">
                        <button className="w-full px-4 py-2 text-[9px] text-gray-800 font-bold hover:bg-[#9A0000]/70 hover:text-white" onClick={() => { console.log("PHILHEALTH PDF"); setOpen(false); setActiveReport(null);  }} >
                          PDF
                        </button>

                        <button className="w-full px-4 py-2 text-[9px] text-gray-800 font-bold hover:bg-[#0c5148]/70 hover:text-white" onClick={() => { console.log("PHILHEALTH EXCEL"); setOpen(false); setActiveReport(null); }} >
                          EXCEL
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center ">
          </div>

        </div>

      </div>

      <div className="fixed -left-[10000px] top-0">
        <ReportLayout ref={reportRef} />
      </div>
    </>
  );
}