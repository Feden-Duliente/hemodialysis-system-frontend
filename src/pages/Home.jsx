import { useState, useEffect, useRef } from "react";

import totalTreatment from "../assets/total-treatment.png";
import tradeUp from "../assets/trade-up.png";
import completed from "../assets/completed.png";
import tradeDown from "../assets/trade-down.png";
import download from "../assets/download.png";
import dialyzer from "../assets/dialyzer.png";
import tubing from "../assets/tubing.png";
import others from "../assets/others.png";
import medication from "../assets/medication.png";
import menu from "../assets/menu.png";
import update from "../assets/update.png";
import deletePatient from "../assets/delete.png";
import addPatient from "../assets/add-patient.png";
import sales from "../assets/sales.png";
import usage from "../assets/usage.png";
import close2 from "../assets/close2.png";
import logo from "../assets/hemodialysis.png";

export default function Home() {
    const [active, setActive] = useState("daily");
    const [openMenu, setOpenMenu] = useState(false);
    const [openAddPatient, setOpenAddPatient] = useState(false);
    const menuRef = useRef(null);

    // close menu if click anywahre
    useEffect(() => {
        const handClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handClickOutside);

        return () => {
            document.removeEventListener("mousedown", handClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-3 mt-5 pb-4">
            <div className="flex gap-3">
                <div className="w-[25rem] h-[17rem] flex flex-wrap gap-3">
                    <div className="w-full h-[15rem] flex flex-wrap gap-3">

                        {/* card 1 */}
                        <div className="w-[calc(50%-0.375rem)] h-[calc(50%-0.375rem)] bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                            <div className="flex items-center justify-between gap-2 w-full mt-1">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center border-none bg-[#9A0000] rounded-[5px] h-6 w-6">
                                        <img src={totalTreatment} className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <h2 className="text-black text-[9px] font-bold ml-1">Total treatments</h2>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <img src={tradeUp} className="w-4 h-4" />
                                    <h2 className="text-[#00682F] text-[8px] font-bold ml-1">+12.08%</h2>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="text-black text-[18px] font-bold leading-none mt-5">12</h2>
                                <h2 className="text-gray-500 text-[9px] font-medium">For today </h2>
                            </div>
                        </div>

                        {/* card 2 */}
                        <div className="w-[calc(50%-0.375rem)] h-[calc(50%-0.375rem)] bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                            <div className="flex items-center justify-between gap-2 w-full mt-1">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center border-none bg-[#00682F] rounded-[5px] h-6 w-6">
                                        <img src={completed} className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <h2 className="text-black text-[9px] font-bold ml-1">Completed</h2>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <img src={tradeUp} className="w-4 h-4" />
                                    <h2 className="text-[#00682F] text-[8px] font-bold ml-1">+12.08%</h2>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="text-black text-[18px] font-bold leading-none mt-5">8</h2>
                                <h2 className="text-gray-500 text-[9px] font-medium">Finished </h2>
                            </div>
                        </div>

                        {/* card 3 */}
                        <div className="w-[calc(50%-0.375rem)] h-[calc(50%-0.375rem)] bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                            <div className="flex items-center justify-between gap-2 w-full mt-1">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center border-none bg-[#002060] rounded-[5px] h-6 w-6">
                                        <img src={completed} className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <h2 className="text-black text-[9px] font-bold ml-1">In Progress</h2>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <img src={tradeDown} className="w-4 h-4" />
                                    <h2 className="text-[#9E0000] text-[8px] font-bold ml-1">-12.08%</h2>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="text-black text-[18px] font-bold leading-none mt-5">4</h2>
                                <h2 className="text-gray-500 text-[9px] font-medium">Active Session </h2>
                            </div>
                        </div>

                        {/* card 4 */}
                        <div className="w-[calc(50%-0.375rem)] h-[calc(50%-0.375rem)] bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                            <div className="flex items-center justify-between gap-2 w-full mt-1">
                                <div className="flex items-center justify-center">
                                    <div className="flex items-center justify-center border-none bg-[#690B69] rounded-[5px] h-6 w-6">
                                        <img src={totalTreatment} className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col items-start justify-start">
                                        <h2 className="text-black text-[9px] font-bold ml-1">Scheduled</h2>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <img src={tradeDown} className="w-4 h-4" />
                                    <h2 className="text-[#9E0000] text-[8px] font-bold ml-1">-12.08%</h2>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center w-full">
                                <h2 className="text-black text-[18px] font-bold leading-none mt-5">7</h2>
                                <h2 className="text-gray-500 text-[9px] font-medium">Upcoming today</h2>
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-[2rem] flex items-center mt-1 justify-between">
                        <div className="flex items-center justify-center">
                            <div className="h-[1.5rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                            <h2 className="text-[#2F5597] font-bold text-[12px] ml-2 tracking-[0.03em]">Daily Patient List</h2>
                        </div>

                        <div className="flex items-center justify-center">
                            <button className="px-2 py-1 flex items-center justify-center shadow-lg rounded-[1px] bg-[#00682F] gap-2 hover:bg-green-600">
                                <img src={download} className="w-3 h-3" />
                                <span className="text-white text-[9px] font-medium">Download Patients</span>
                            </button>
                        </div>

                        <div className="flex items-center justify-center">
                            <button onClick={() => setOpenAddPatient(true)} className="px-5 py-1 flex items-center justify-center shadow-lg rounded-[1px] bg-[#0B2A66] gap-2 hover:bg-blue-600">
                                <img src={addPatient} className="w-3 h-3" />
                                <span className="text-white text-[9px] font-medium">Add Patient</span>
                            </button>
                        </div>

                        {/* add patient modal */}
                        {openAddPatient && (
                            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                                <div className="bg-white w-[18rem] px-4 py-4 shadow-lg relative flex flex-col items-center justify-center">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center justify-center gap-1">
                                            <img src={logo} className="h-9 w-9" />
                                            <h2 className="text-black font-bold text-[12px]">Add Patient</h2>
                                        </div>
                                        <div onClick={() => setOpenAddPatient(false)} className="flex items-center justify-center h-5 w-5 hover:bg-gray-300">
                                            <img src={close2} className="h-4 w-4" />
                                        </div>
                                    </div>

                                    <form action="" className="w-full px-2 py-2 mt-2">
                                        <div className="flex flex-col items-start justify-center">
                                            <label htmlFor="fullName" className="text-[10px]">Fullname</label>
                                            <input type="text" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                        </div>

                                        <div className="flex flex-col items-start justify-center mt-3">
                                            <label htmlFor="fullName" className="text-[10px]">Time</label>
                                            <input type="time" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                        </div>

                                        <div className="flex flex-col items-start justify-center mt-3">
  
                                            <label className="text-[10px]">Status</label>

                                            <select
                                                className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]"
                                            >
                                                <option value="new entry">New Entry</option>
                                                <option value="scheduled">Scheduled</option>
                                                <option value="inprogress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>

                                        </div>

                                        <button className="w-full py-1 bg-[#002060] hover:bg-blue-600 flex items-center justify-center shadow-md text-white text-[10px] mt-4 font-medium">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* consumptions */}
                <div className="w-[27rem] h-[18rem] bg-white shadow-md p-3 flex flex-col items-start justify-center">
                   
                   <div className="flex items-center justify-between w-full">
                        <div className="flex items-start justify-start mb-3">
                            <div className="h-[1rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                            <span className="text-black font-bold text-[10px] ml-2">Consumptions</span>
                        </div>

                        <div className="flex items-center justify-center relative" ref={menuRef}>
                            <div onClick={() => setOpenMenu(!openMenu)} className="flex items-center justify-center py-1 rounded-full mb-1 hover:bg-gray-200">
                                <img src={menu} className="h-3 w-3" />
                            </div>

                            {/* dropdown menu */}
                            {openMenu && (
                                <div className="absolute top-full mt-1 right-0 w-28 bg-white  shadow-lg border border-gray-300 text-xs z-50">

                                    <button className="w-full text-center px-3 py-2 hover:bg-gray-100 text-[10px] font-medium">
                                        ADD
                                    </button>

                                      <button className="w-full text-center px-3 py-2 hover:bg-gray-100 text-[10px] font-medium">
                                        EDIT
                                    </button>

                                    <button className="w-full text-center px-3 py-2 hover:bg-red-100 text-red-600 text-[10px] font-medium">
                                        DELETE
                                    </button>

                                </div>
                            )}
                        </div>
                   </div>
                    
                    {/* tabs */}
                    <div className="w-full bg-gray-200 flex">
                        
                        <button
                            onClick={() => setActive("daily")}
                            className={`flex-1 text-[9px] font-medium py-[3px] transition
                            ${active === "daily"
                                ? "bg-[#0B2A66] text-white"
                                : "text-black hover:bg-[#0B2A66] hover:text-white"
                            }`}
                        >
                            Daily Supplies Consumption
                        </button>

                        <button
                            onClick={() => setActive("sales")}
                            className={`flex-1 text-[9px] font-medium py-[3px] transition
                            ${active === "sales"
                                ? "bg-[#0B2A66] text-white"
                                : "text-black hover:bg-[#0B2A66] hover:text-white"
                            }`}
                        >
                            Total Daily Sales
                        </button>

                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto mt-2 no-scrollbar w-full">
                        {active === "daily" && (
                            <div className="grid grid-cols-2 gap-3 p-2 w-full">
                            
                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-red-900">
                                                <img src={dialyzer} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">12</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-green-900">
                                                <img src={tubing} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Blood Tubing Set</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Tubing</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">12</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">sets</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-white border border-gray-300">
                                                <img src={others} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Dialysate Solution (4L)</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Other</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">48</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">bags</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-blue-900">
                                                <img src={medication} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Heparin (5000 UI)</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Medication</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">12</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">vials</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-blue-900">
                                                <img src={medication} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Saline Solution (500 ML)</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Medication</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">12</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">bags</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-white border border-gray-300">
                                                <img src={others} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Needle Set</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Other</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">24</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">sets</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-white border border-gray-300">
                                                <img src={others} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Gauze Pads</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Other</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">120</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[3rem]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center justify-center">
                                            <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-white border border-gray-300">
                                                <img src={others} className="h-5 w-5" />
                                            </div>
                                            <div className="flex flex-col items-start justify-start">
                                                <h2 className="text-[9px] text-black font-bold ml-2">Medical Tape</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold ml-2">Other</h2>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center">
                                            <h2 className="text-[10px] text-black font-bold">12</h2>
                                            <h2 className="text-[8px] text-gray-500 font-bold">rolls</h2>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        )}

                        {active === "sales" && (
                            <div className="grid grid-cols-2 gap-3 p-2 w-full">
                            
                                <div className="bg-red-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-red-900">
                                                    <img src={dialyzer} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-green-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-green-900">
                                                    <img src={tubing} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-blue-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-blue-900">
                                                    <img src={medication} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-white shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-white-900 border border-gray-300">
                                                    <img src={others} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-red-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-red-900">
                                                    <img src={dialyzer} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-red-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-red-900">
                                                    <img src={dialyzer} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>

                                <div className="bg-red-200/50 shadow-md text-[9px] font-medium border border-gray-300/50 p-2 h-[6rem]">
                                    <div className="flex flex-col items-center justify-center gap-4">
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-center justify-center">
                                                <div className="h-7 w-7 flex items-center justify-center rounded-[2px] bg-red-900">
                                                    <img src={dialyzer} className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col items-start justify-start">
                                                    <h2 className="text-[9px] text-black font-bold ml-2">High-flux Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">Dialyzer</h2>
                                                    <h2 className="text-[8px] text-gray-500 font-bold ml-2">₱1,250.00 per piece</h2>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-center justify-center">
                                                <h2 className="text-[10px] text-black font-bold">12</h2>
                                                <h2 className="text-[8px] text-gray-500 font-bold">pieces</h2>
                                            </div>
                                        </div>
                                        <div className="w-full flex items-start justify-center">
                                            <h2 className="text-[12px] text-green-900 font-bold ml-2">₱15,250.00{" "}<span className="text-[9px] text-gray-500">total cost</span></h2>
                                        </div>

                                    </div>
                                </div>
                                

                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
                {/* table */}
                <div className="w-[40rem] h-[15rem] bg-white shadow-md px-4 py-3">
                    <div className="h-full overflow-hidden">        
                        <div className="h-full overflow-y-auto no-scrollable">

                        <table className="w-full border-collapse">

                            <thead className="sticky top-0 bg-[#0B2A66] z-10 shadow-sm">
                            <tr>
                                <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Name</th>
                                <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Time</th>
                                <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Status</th>
                                <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                                <tr className="border-b border-gray-200 hover:bg-gray-200">
                                    <td className="py-1 px-4 text-[9px] text-black text-center">Juan Dela Cruz</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">8:00 PM</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">
                                        <div className="flex items-center justify-center py-1 bg-green-200 rounded-lg">
                                            <h2 className="text-green-900 text-[8px] font-bold">Completed</h2>
                                        </div>
                                    </td>
                                    <td className="py-1 px-4 flex items-center justify-center gap-2">
                                        <div className="h-6 w-6 rounded-md bg-[#C09200] flex items-center justify-center">
                                            <img src={update} className="w-3 h-3" />
                                        </div>
                                        <div className="h-6 w-6 rounded-md bg-red-900 flex items-center justify-center">
                                            <img src={deletePatient} className="w-3 h-3" />
                                        </div>
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200">
                                    <td className="py-1 px-4 text-[9px] text-black text-center">Freiden Duliente</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">8:30 PM</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">
                                        <div className="flex items-center justify-center py-1 bg-blue-200 rounded-lg">
                                            <h2 className="text-blue-900 text-[8px] font-bold">In Progress</h2>
                                        </div>
                                    </td>
                                    <td className="py-1 px-4 flex items-center justify-center gap-2">
                                        <div className="h-6 w-6 rounded-md bg-[#C09200] flex items-center justify-center">
                                            <img src={update} className="w-3 h-3" />
                                        </div>
                                        <div className="h-6 w-6 rounded-md bg-red-900 flex items-center justify-center">
                                            <img src={deletePatient} className="w-3 h-3" />
                                        </div>
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-200">
                                    <td className="py-1 px-4 text-[9px] text-black text-center">Wei Wuxian</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">9:10 PM</td>
                                    <td className="py-1 px-4 text-[9px] text-black text-center">
                                        <div className="flex items-center justify-center py-1 bg-red-200 rounded-lg">
                                            <h2 className="text-red-900 text-[8px] font-bold">Scheduled</h2>
                                        </div>
                                    </td>
                                    <td className="py-1 px-4 flex items-center justify-center gap-2">
                                        <div className="h-6 w-6 rounded-md bg-[#C09200] flex items-center justify-center">
                                            <img src={update} className="w-3 h-3" />
                                        </div>
                                        <div className="h-6 w-6 rounded-md bg-red-900 flex items-center justify-center">
                                            <img src={deletePatient} className="w-3 h-3" />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                        </div>
                    </div>
                </div>

                <div className="w-[12rem] h-[15rem] flex flex-col items-center justify-center gap-3">
                    <div className="w-full h-1/2 bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center border-none bg-black rounded-[5px] h-6 w-6">
                                    <img src={sales} className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <h2 className="text-black text-[9px] font-bold ml-1">Total Sales</h2>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <img src={tradeUp} className="w-4 h-4" />
                                <h2 className="text-[#00682F] text-[8px] font-bold ml-1">+12.08%</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full">
                            <h2 className="text-black text-[18px] font-bold leading-none mt-5">₱44, 520.00</h2>
                            <h2 className="text-gray-500 text-[9px] font-medium">Supply sales total </h2>
                        </div>
                    </div>

                    <div className="w-full h-1/2 bg-white shadow-md p-3 overflow-hidden flex flex-col hover:scale-105 transition-transform duration-200 ease-in-out">
                         <div className="flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center border border-gray-400 bg-white  rounded-[5px] h-6 w-6">
                                    <img src={usage} className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col items-start justify-start">
                                    <h2 className="text-black text-[9px] font-bold ml-1">Daily Supply Usage</h2>
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <img src={tradeUp} className="w-4 h-4" />
                                <h2 className="text-[#00682F] text-[8px] font-bold ml-1">+12.08%</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full">
                            <h2 className="text-black text-[18px] font-bold leading-none mt-5">90</h2>
                            <h2 className="text-gray-500 text-[9px] font-medium">Supply consumption </h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}