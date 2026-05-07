import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ReportLayout from "../pages/philHealthReport";

import {
  HomeIcon,
  CurrencyDollarIcon,
  BeakerIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

import { DownloadIcon } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const [selectedReports, setSelectedReports] = useState([]);

  const handleSelect = (type) => {
    if (type === "all") {
      if (selectedReports.includes("all")) {
        setSelectedReports([]);
      } else {
        setSelectedReports(["all"]);
      }
      return;
    }

    let updated = selectedReports.filter((r) => r !== "all");

    if (updated.includes(type)) {
      updated = updated.filter((r) => r !== type);
    } else {
      updated.push(type);
    }

    setSelectedReports(updated);
  };

  const reportRef = useRef();
  const handlePrint = useReactToPrint({
    contentRef: reportRef,
    documentTitle: "All Reports",
  });

  return (
    <>
      <div className="h-[25rem] w-full px-4 py-7 flex flex-col justify-between text-white">
        <div className="flex flex-col items-center justify-between gap-6 bg-gradient-to-b from-green-800 to-green-700 rounded-lg shadow-lg px-4 py-4 h-full">
          <div className="flex flex-col items-center justify-center gap-6">
            <Link to="/">
              <HomeIcon
                className={`w-6 h-6 transition-transform duration-200
                  ${
                    location.pathname === "/"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>

            <Link to="/doctor-fees">
              <CurrencyDollarIcon
                className={`w-6 h-6 transition-transform duration-200 
                  ${
                    location.pathname === "/doctor-fees"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>

            <Link to="/expiring-labs">
              <BeakerIcon
                className={`w-6 h-6 transition-transform duration-200 
                  ${
                    location.pathname === "/expiring-labs"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>

            <Link to="/philhealth">
              <IdentificationIcon
                className={`w-6 h-6 transition-transform duration-200 
                  ${
                    location.pathname === "/philhealth"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>

            <Link to="/schedules">
              <CalendarDaysIcon
                className={`w-6 h-6 transition-transform duration-200 
                  ${
                    location.pathname === "/schedules"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>

            <Link to="/activity-logs">
              <ClipboardDocumentListIcon
                className={`w-6 h-6 transition-transform duration-200 
                  ${
                    location.pathname === "/activity-logs"
                      ? "text-white/50 scale-125"
                      : "hover:scale-150 hover:text-white"
                  }
                `}
              />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative inline-block">
              <button
                onClick={() => setOpen(true)}
                className="flex items-center justify-center"
              >
                <DownloadIcon
                  className={`w-6 h-6 transition-transform duration-200 
                    ${
                      open
                        ? "text-white/50 scale-125"
                        : "hover:scale-150 hover:text-white"
                    }
                  `}
                />
              </button>
            </div>

            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                <div className="w-[320px] bg-white rounded-[5px] shadow-2xl border border-gray-200 p-5 relative">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setSelectedReports([]);
                    }}
                    className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <XMarkIcon className="w-4 h-4 text-gray-500" />
                  </button>

                  <div className="mb-4">
                    <h2 className="text-[14px] font-semibold text-gray-900">
                      Download Report
                    </h2>
                    <p className="text-[11px] text-gray-500">
                      Select report(s) to export as PDF
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleSelect("all")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("all")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">All Reports</span>
                    </button>

                    <button
                      onClick={() => handleSelect("phil")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("phil")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">PhilHealth</span>
                    </button>

                    <button
                      onClick={() => handleSelect("activity")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("activity")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">Activity Logs</span>
                    </button>

                    <button
                      onClick={() => handleSelect("doctor")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("doctor")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">Doctor Fees</span>
                    </button>

                    <button
                      onClick={() => handleSelect("labs")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("labs")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">Expiring Labs</span>
                    </button>

                    <button
                      onClick={() => handleSelect("schedule")}
                      className={`flex items-center justify-between px-3 py-2 rounded-[5px] border text-[10px] text-black transition
                        ${
                          selectedReports.includes("schedule")
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <span className="font-medium">Schedules</span>
                    </button>
                  </div>

                  <div className="mt-5">
                    <button
                      disabled={selectedReports.length === 0}
                      onClick={() => {
                        if (selectedReports.includes("all")) {
                          handlePrint();
                        } else {
                          console.log("Selected:", selectedReports);
                        }

                        setOpen(false);
                        setSelectedReports([]);
                      }}
                      className={`w-full py-2 rounded-[5px] text-[10px] font-semibold transition
                        ${
                          selectedReports.length
                            ? "bg-blue-600 text-white hover:bg-blue-700"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }
                      `}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed -left-[10000px] top-0">
        <ReportLayout ref={reportRef} />
      </div>
    </>
  );
}
