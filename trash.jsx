import labPatient from "../assets/lab-patient.png";
import expired from "../assets/expired.png";
import expiredSoon from "../assets/expired-soon.png";
import lab from "../assets/lab.png";
import labRed from "../assets/labRed.png";
import labGreen from "../assets/labGreen.png";
import labOrange from "../assets/labOrange.png";
import wangLin from "../assets/wangLin.png";
import download from "../assets/download.png";
import close2 from "../assets/close2.png";
import logo from "../assets/hemodialysis.png";
import labwarning from "../assets/labwarning.png";
import nursePatients from "../assets/nursePatients.png";
import shifts from "../assets/shifts.png";
import addPatient from "../assets/add-patient.png";
import searchIcon from "../assets/search.png";
import { useState, useEffect } from "react";


export default function Schedules() {
    const [openDownloadDropdown, setOpenDownloadDropdown] = useState(false);
    const [search, setSearch] = useState("");
    const [shifts, setShifts] = useState([
  {
    id: "morning",
    title: "Morning Shift",
    time: "6:00 AM - 12:00 PM",
    patients: [
      { name: "Patient A", status: "ongoing", open: false },
      { name: "Patient B", status: "ongoing", open: false },
      { name: "Patient C", status: "ongoing", open: false },
    ],
  },
  {
    id: "afternoon",
    title: "Afternoon Shift",
    time: "12:00 PM - 6:00 PM",
    patients: [
      { name: "Patient", status: "ongoing", open: false },
      { name: "Patient E", status: "ongoing", open: false },
      { name: "Patient F", status: "ongoing", open: false },
    ],
  },
  {
    id: "evening",
    title: "Evening Shift",
    time: "6:00 PM - 12:00 AM",
    patients: [
      { name: "Wei Wuxian", status: "ongoing", open: false },
      { name: "Lan Zhan", status: "ongoing", open: false },
      { name: "Bi Xiao", status: "ongoing", open: false },
    ],
  },
]);

  const toggleMenu = (shiftId, index) => {
  setShifts((prev) =>
    prev.map((shift) => {
      if (shift.id !== shiftId) return shift;

      return {
        ...shift,
        patients: shift.patients.map((p, i) => ({
          ...p,
          open: i === index ? !p.open : false,
        })),
      };
    })
  );
};
  
const setStatus = (shiftId, index, value) => {
  setShifts((prev) =>
    prev.map((shift) => {
      if (shift.id !== shiftId) return shift;

      const updatedPatients = [...shift.patients];
      updatedPatients[index].status = value;
      updatedPatients[index].open = false;

      return {
        ...shift,
        patients: updatedPatients,
      };
    })
  );
};



    return (
         <div className="w-full min-h-full flex flex-col gap-3 px-10 py-5">

            {/* heades */}
            <div className="w-full h-[2rem] flex items-center justify-between mt-[5.4rem] px-4">

                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1.7rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-blue-900 font-bold text-[14px]">Staff Shifting Schedule</h2>
                        <h2 className="text-blue-500 font-semibold text-[9px]">Maximum 4 shifts per staff, 3 patients per shift</h2>
                    </div>
                </div>

                <div className="relative flex items-center justify-center gap-2">
                    
                    <button onClick={() => setOpenDownloadDropdown(!openDownloadDropdown)} className="px-4 py-[6px] flex items-center justify-center shadow-lg rounded-[1px] bg-[#00682F] gap-2 hover:bg-green-600"  >
                        <img src={download} className="w-3 h-3" />
                        <span className="text-white text-[9px] font-medium"> Download Report </span>
                    </button>

                    <div style={{ position: "absolute", left: "-99910px", top: 0 }}>  </div>

                    {openDownloadDropdown && (
                        <div className="absolute top-full mt-1 w-[10rem] bg-white shadow-md rounded text-[10px] z-10">
                            
                            <button   className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (All Patients Report) </button>
                            <button onClick={() => { console.log("Download Excel"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (Patients Only) </button>
                            <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (All Patients Report) </button>
                            <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false);  }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (Patients Only) </button>
                            <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false);  }} className="w-full text-left px-3 py-2 hover:bg-green-100" > All Reports </button>

                        </div>
                    )}

                </div>

            </div>

            {/* search and add new staff */}
            <div className="w-full h-[2rem] flex items-center mt-1 justify-between px-4">
                
                <div className="flex items-center justify-center gap-2">
                    <div className="relative flex items-center justify-center w-[15rem] border border-blue-900 rounded-[2px] px-2">
                        <input type="text" placeholder="Search staff..." className="w-full text-[10px] py-1 outline-none" />
                    </div>
                    <button className="py-[6px] px-7 flex items-center justify-center shadow-lg rounded-[1px] bg-[#0B2A66] gap-2 hover:bg-blue-600">
                        <img src={searchIcon} className="w-3 h-3" />
                        <span className="text-white text-[9px] font-medium">Search</span>
                    </button>
                </div>
                

                <div className="flex items-center justify-center ">
                    <button onClick={() => setOpenAddPatient(true)} className="py-[6px] px-7 flex items-center justify-center shadow-lg rounded-[1px] bg-[#0B2A66] gap-2 hover:bg-blue-600">
                        <img src={addPatient} className="w-3 h-3" />
                        <span className="text-white text-[9px] font-medium">Add Staff</span>
                    </button>
                </div>


            </div>

            {/* lab details */}
            <div className="w-[55rem] flex items-start justify-center gap-3 px-4">
                <div className="w-3/4 flex flex-col  items-center justify-center gap-3">

                    <div className="w-full flex flex-col items-center justify-center gap-2">

                        <div className="w-full flex items-center justify-between b rounded-[25px]
bg-white/30 backdrop-blur-md border border-white/30 shadow-lg p-3">
                            <div className="flex items-center justify-center gap-3">
                                <img src={wangLin} className="w-15 h-15 rounded-full object-cover" alt="" />
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="font-bold text-black text-[14px]">Freiden Duliente</h2>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="flex items-center justify-center px-5 py-1 bg-blue-200 rounded-[1px]">
                                            <h2 className="font-medium text-blue-800 text-[10px]">Nurse</h2>
                                        </div>
                                        <h2 className="font-medium text-gray-800 text-[9px]">ID:</h2>
                                        <h2 className="font-medium text-gray-800 text-[9px]">Staff 1</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-start justify-center">
                                <h2 className="font-medium text-gray-800 text-[10px]">2 Shifts</h2>
                                <h2 className="font-medium text-gray-800 text-[10px]">6 Patients</h2>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-3 gap-3 ">

                            {shifts.map((shift) => (
                            <div key={shift.id} className=" rounded-[25px]
bg-white/30 backdrop-blur-md border border-white/30 shadow-lg w-full px-4 py-3 flex flex-col">

                            {/* HEADER */}
                            <div className="w-full flex justify-between border-b border-gray-300 mb-1 py-1">
                            <h2 className="text-black font-bold text-[10px]">
                            {shift.title}
                            </h2>
                            <span className="text-black text-[9px]">
                            {shift.time}
                            </span>
                            </div>

                            {/* PATIENTS */}
                            {shift.patients.map((p, index) => (
                            <div key={index} className="relative w-full mt-2">

                            {/* CARD */}
                            <div
                            onClick={() => toggleMenu(shift.id, index)}
                            className={`w-full flex justify-center p-2 cursor-pointer
                                ${p.status === "completed"
                                ? "bg-green-200"
                                : "bg-blue-200"
                                }`}
                            >
                            <h2 className={`text-[9px] font-semibold text-center
                                ${p.status === "completed"
                                ? "text-green-800"
                                : "text-blue-800"
                                }`}
                            >
                                {p.name}
                            </h2>
                            </div>

                            {/* FLOATING DROPDOWN */}
                            {p.open && (
                            <div className="absolute left-1/2 -translate-x-1/2 mt-1 w-45 bg-white border border-gray-200 shadow-lg rounded-[2px] z-50">
                                <div
                                onClick={() => setStatus(shift.id, index, "ongoing")}
                                className="px-2 py-2 text-[9px] hover:bg-blue-200 cursor-pointer"
                                >
                                Ongoing
                                </div>

                                <div
                                onClick={() => setStatus(shift.id, index, "completed")}
                                className="px-2 py-2 text-[9px] hover:bg-green-200 cursor-pointer"
                                >
                                Completed
                                </div>
                            </div>
                            )}

                            </div>
                            ))}

                            </div>
                            ))}

                        </div>


                        
                    </div>

                    

                    
                    
                </div>

                <div className=" w-1/4  flex flex-col items-center justify-center gap-3">
                    <div className="w-full px-5 py-5 flex flex-col items-start justify-start gap-1 rounded-[25px]
bg-white/30 backdrop-blur-md border border-white/30 shadow-lg">
                        <div className="w-full flex items-start justify-start border-b border-gray-300">
                            <h2 className="text-green-800 font-bold text-[12px] pb-1">Shift Overview</h2>
                        </div>
                        <div className="w-full flex items-start justify-between mt-2">
                            <h2 className="text-gray-800 text-[10px] font-semibold">Total Staff</h2>
                            <h2 className="text-green-800 text-[10px] font-semibold">18</h2>
                        </div>

                        <div className="w-full flex items-start justify-between mt-1 pl-3 font-bold">
                            <ul className="pl-4 list-disc w-full ">
                                <li className="flex justify-between text-blue-800 text-[9px]">
                                    <span>Nurse</span>
                                    <span>10</span>
                                </li>
                                <li className="flex justify-between text-blue-800 text-[9px]">
                                    <span>Technician</span>
                                    <span>4</span>
                                </li>
                            </ul>
                        </div>


                        <div className="w-full flex items-start justify-between">
                            <h2 className="text-gray-800 text-[10px] font-semibold">Total Shifts</h2>
                            <h2 className="text-green-800 text-[10px] font-semibold">6</h2>
                        </div>

                        <div className="w-full flex items-start justify-between  ">
                            <h2 className="text-gray-800 text-[10px] font-semibold">Total Patients</h2>
                            <h2 className="text-green-800 text-[10px] font-semibold">12</h2>
                        </div>
                    </div>
                   
                    <div className="bg-white w-full p-5  rounded-[25px]
bg-white/30 backdrop-blur-md border border-white/30 shadow-lg  flex flex-col items-start justify-start ">
                        <div className="w-full flex flex-col items-start justify-start border-b border-gray-300 gap-1">
                            <h2 className="text-orange-800 font-bold text-[12px]">Ongoing Shifts</h2>
                            <span className="text-black text-normal text-[9px] mb-1">Staffs with ongoing shifts will appear here.</span>
                        </div>
                        

                        <div className="w-full flex items-start center bg-orange-200 mt-2 p-2 rounded-[2px]">
                            <h2 className="text-orange-800 text-[10px] font-semibold">Wei Wuxian</h2>
                        </div>

                        <div className="w-full flex items-start center bg-orange-200 mt-2 p-2 rounded-[2px]">
                            <h2 className="text-orange-800 text-[10px] font-semibold">Lan Zhan</h2>
                        </div>

                        <div className="w-full flex items-start center bg-orange-200 mt-2 p-2 rounded-[2px]">
                            <h2 className="text-orange-800 text-[10px] font-semibold">Bi Xiao</h2>
                        </div>

                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}