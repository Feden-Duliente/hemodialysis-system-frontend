import labPatient from "../assets/lab-patient.png";
import expired from "../assets/expired.png";
import expiredSoon from "../assets/expired-soon.png";
import lab from "../assets/lab.png";
import labRed from "../assets/labRed.png";
import labGreen from "../assets/labGreen.png";
import labOrange from "../assets/labOrange.png";
import wangLin from "../assets/wangLin.jpg";
import download from "../assets/download.png";
import close2 from "../assets/close2.png";
import logo from "../assets/hemodialysis.png";
import { useState, useEffect } from "react";

export default function ExpiringLabs() {
    const [openViewDetails, setOpenViewDetails] = useState(false);
    const [openModalTest, setOpenModalTest] = useState(false);
    const [error, setError] = useState("");
    const [testDate, setTestDate] = useState("");
    const [testTime, setTestTime] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [expiryTime, setExpiryTime] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [search, setSearch] = useState("");
    const [patients, setPatients] = useState([
        { id: 1, name: "Wang Lin" },
        { id: 2, name: "Wei Wuxian" },
        { id: 3, name: "Lan Zhan" },
        { id: 4, name: "San Lang" }
    ]);

    const today = new Date().toISOString().split("T")[0];

    // auto add +1 when selecting date
    const handleTestDateChange = (e) => {
        const value = e.target.value;
        setTestDate(value);

        if (value) {
            const date = new Date(value);
            date.setDate(date.getDate() + 1);
            const nextDay = date.toISOString().split("T")[0];
            setExpiryDate(nextDay);
        }
    };

    // date and time validation
    const handleExpiryDateChange = (e) => {
        const value = e.target.value;

        if (value <= testDate) {
            setError("Expiry date must be after test date");
            return;
        }

        setError("");
        setExpiryDate(value);
    };

    const handleExpiryTimeChange = (e) => {
        const value = e.target.value;

        if (expiryDate === testDate && value <= testTime) {
            setError("Expiry time must be after test time");
            return;
        }

        setError("");
        setExpiryTime(value);
    };

    // error notification seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    // filter suggestion (autocomplte)
    const filteredSuggestions = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );


    return (
      <div className="h-screen overflow-y-auto no-scrollbar flex flex-col items-start justify-start gap-3 pt-5 pb-[3rem]">
            {/* header */}
            <div className="w-full flex items-center justify-between mt-[4.6rem]">
                <div className="flex items-center justify-center gap-2">
                    <div className="h-[1.2rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                    <div className="flex flex-col items-start justify-center">
                        <h2 className="text-blue-900 font-bold text-[12px]">
                            Expiring Lab Results Monitor
                        </h2>
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className="w-full flex items-start justify-start gap-2">
                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-blue-900 p-2 gap-3 hover:scale-105 transition-transform duration-200 ease-in-out">
                    <img src={labPatient} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Patients</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-red-900 p-2 gap-3 hover:scale-105 transition-transform duration-200 ease-in-out">
                    <img src={expired} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Expired</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-[#C09200] p-2 gap-3 hover:scale-105 transition-transform duration-200 ease-in-out">
                    <img src={expiredSoon} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Expired Soon</h2>
                </div>

                <div className="h-9 w-35 flex items-center justify-center shadow-md bg-green-900 p-2 gap-3 hover:scale-105 transition-transform duration-200 ease-in-out">
                    <img src={lab} className="w-4 h-4" />
                    <h2 className="font-bold text-white text-[10px]">12 Valid</h2>
                </div>
                
            </div>

            {/* notes */}
            <div className="w-full flex items-center justify-start border-b border-gray-500 py-2">
                <h2 className="text-[10px] text-black text-medium"><b>Note</b>: {' '}Lab results are valid for 30 days from test date. Monitor and renew expired or expiring results.</h2>
            </div>

            <div className="flex items-center justify-end w-full gap-2">
                <div className="relative flex items-center justify-center w-1/3 border border-blue-900 rounded-[2px] px-2">
                    
                    <input value={search} onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} type="text" placeholder="Search patient..." className="w-full text-[10px] py-1 outline-none" />
                    {showSuggestions && search && (
                        <div className="absolute top-full left-0 w-full bg-white shadow-md border border-gray-300 z-50 max-h-32 overflow-y-auto">
                            {filteredSuggestions.length > 0 ? (
                                filteredSuggestions.map((p) => (
                                    <div
                                        key={p.id}
                                        onClick={() => {
                                            setSearch(p.name);
                                            setShowSuggestions(false);
                                        }}
                                        className="px-2 py-1 text-[10px] hover:bg-gray-200 cursor-pointer"
                                    >
                                        {p.name}
                                    </div>
                                ))
                            ) : (
                                <div className="px-2 py-1 text-[10px] text-black">
                                    No results
                                </div>
                            )}
                        </div>
                    )}

                </div>

                <button className="p-2 flex items-center justify-center shadow-lg  bg-[#00682F] gap-2 hover:bg-green-600">
                    <img src={download} className="w-3 h-3" />
                    <span className="text-white text-[9px] font-medium">Download Lab Report</span>
                </button>
            </div>

            {/* lab details */}
            <div className="w-[55rem] flex items-start justify-center gap-2">
            
                <div className="w-3/4 flex flex-col items-center justify-center gap-2">
                    <div className="grid grid-cols-2 gap-2 w-full">

                        {/* card 1 */}
                        {[...patients]
                            .sort((a, b) => {

                                if (!search) return 0;

                                const aMatch = a.name.toLowerCase().includes(search.toLowerCase());
                                const bMatch = b.name.toLowerCase().includes(search.toLowerCase());

                                return bMatch - aMatch;

                            })
                            .map((p) => (
                                <div key={p.id} className="bg-white shadow-md p-4 flex items-start gap-3 w-full min-w-0 hover:bg-gray-200">

                                    <div className="flex items-start justify-start shrink-0">
                                        <div className="h-12 w-12 flex items-center justify-center rounded-full border border-black">
                                            <img src={wangLin} className="h-full w-full rounded-full" alt="" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-full">

                                        <div className="flex flex-col items-start justify-start gap-2 w-full">

                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center justify-between gap-2 w-full">

                                                    <h2 className="text-black text-[12px] font-bold whitespace-nowrap"> {p.name} </h2>
                                                    <div className="flex items-center justify-center px-2 py-1 bg-red-700">
                                                        <h2 className="text-white font-bold text-[9px]"> Expired </h2>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="flex items-start justify-start bg-red-200 w-full py-1 px-2 mt-2 ">
                                                <h2 className="text-red-900 font-bold text-[9px]"> Expired 170 days ago. </h2>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                                                <div className=" text-[10px]">Client Name</div>
                                                <div className=" text-[10px] font-bold">{p.name}</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="text-[10px]">Test Date</div>
                                                <div className=" text-[10px]">January 01, 2026 <br />8:00 PM</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="text-[10px]">Expiry Date</div>
                                                <div className=" text-[10px]">July 21, 2026 <br /> 5:30 PM</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className="text-[10px]">Lab Tests</div>
                                                <div className=" text-[10px] flex flex-col">
                                                    <span>HIV</span>
                                                    <span>Hepatitis</span>
                                                    <span>CBC</span>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className=" text-[10px]">Assigned Doctor</div>
                                                <div className=" text-[10px]">Dr. Lan Zhan</div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 w-full">
                                                <div className=" text-[10px]">Laboratory</div>
                                                <div className=" text-[10px]">Main Dialysis Lab</div>
                                            </div>

                                            <div className="flex items-center justify-end gap-2 mt-3 w-full border-t border-gray-500">
                                                <div onClick={() => setOpenModalTest(true)} className="flex items-center justify-center  mt-2 px-2 py-1 cursor-pointer hover:bg-blue-700 bg-blue-900 shrink-0" >
                                                    <h2 className="text-white text-[9px] whitespace-nowrap"> Schedule Test </h2>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                        ))}

                        {/* schedule test */}
                        {openModalTest && (
                            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                                <div className="bg-white w-[18rem] px-4 py-4 shadow-lg relative flex flex-col items-center justify-center">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center justify-center gap-1">
                                            <img src={logo} className="h-9 w-9" />
                                            <h2 className="text-black font-bold text-[12px]">Schedule Test</h2>
                                        </div>
                                        <div onClick={() => setOpenModalTest(false)} className="flex items-center justify-center h-5 w-5 hover:bg-gray-300">
                                            <img src={close2} className="h-4 w-4" />
                                        </div>
                                    </div>


                                    {/* error notficaion */}
                                    {error && <div className="w-full flex items-center justify-start px-2 ">
                                                <div className="w-full flex items-center justify-start bg-red-900 gap-2 p-2 mt-2 shadow-md rounded-[2px]">
                                                    <img src={expired} alt="" className="w-4 h-4" />
                                                    <h2 className="text-white font-medium text-[9px]">{error}</h2>
                                                </div>
                                            </div>
                                    }   

                                    <form action="" className="w-full px-2 py-2 mt-1">
                                
                                        <div className="flex items-center justify-between w-full gap-2">
                                            <div className="flex flex-col items-start justify-center w-1/2">
                                                <label htmlFor="fullName" className="text-[10px]">Test Date</label>
                                                <input type="date" min={today} value={testDate} onChange={handleTestDateChange} className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                            </div>

                                            <div className="flex flex-col items-start justify-center w-1/2">
                                                <label htmlFor="fullName" className="text-[10px]">Test Time</label>
                                                <input type="time" value={testTime} onChange={(e) => setTestTime(e.target.value)} className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                            </div>

                                        </div>

                                        <div className="flex items-center justify-between w-full mt-3 gap-2">
                                            <div className="flex flex-col items-start justify-center w-1/2">
                                                <label htmlFor="fullName" className="text-[10px]">Expiry Date</label>
                                                <input type="date" min={testDate || today} value={expiryDate} onChange={handleExpiryDateChange} className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                            </div>

                                            <div className="flex flex-col items-start justify-center w-1/2">
                                                <label htmlFor="fullName" className="text-[10px]">Expiry Time</label>
                                                <input type="time" value={expiryTime} onChange={(e) => setExpiryTime(e.target.value)} className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                            </div>

                                        </div>


                                        <button className="w-full py-1 bg-[#002060] hover:bg-blue-600 flex items-center justify-center shadow-md text-white text-[10px] mt-4 font-medium">Submit</button>
                                    </form>
                                </div>
                            </div>
                        )}
                        
                        
                    </div>
                </div>

                <div className="bg-white w-1/4 shadow-md px-4 py-3 flex flex-col items-start justify-start gap-1">
                    <div className="w-full flex items-start justify-start border-b border-gray-300">
                        <h2 className="text-black font-bold text-[10px] pb-1">Summary</h2>
                    </div>
                    <div className="flex items-start justify-center gap-2 mt-2">
                        <img src={labRed} className="w-4 h-4" />
                        <h2 className="text-red-900 text-[10px] font-semibold">Expired: {" "} <span className="font-normal">{" "}12</span></h2>
                    </div>

                    <div className="flex items-start justify-center gap-2">
                        <img src={labOrange} className="w-4 h-4" />
                        <h2 className="text-red-900 text-[10px] font-semibold">Expired Soon: {" "} <span className="font-normal">{" "}4</span></h2>
                    </div>

                    <div className="w-full flex items-start justify-start gap-2">
                        <img src={labGreen} className="w-4 h-4" />
                        <h2 className="text-green-900 text-[10px] font-semibold">Valid: {" "} <span className="font-normal">{" "}0</span></h2>
                    </div>

                    <div className="w-full flex items-start justify-start border-b border-gray-300 mt-3">
                        <h2 className="text-black font-bold text-[10px] pb-1">Priority Queue</h2>
                    </div>

                    <div className="w-full flex flex-col items-center justify-start">
                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-red-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Wei Wuxian</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-green-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">San Lang</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-red-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Lan Zhan</h2>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="h-1 w-1 bg-green-900 rounded-full"></div>
                            <h2 className="text-black text-[10px] font-semibold">Wang Lin</h2>
                        </div>
                    </div>

                    
                </div>
                
            </div>

            <div className="flex items-center justify-center bg-red-800 gap-2 p-2 shadow-md rounded-[3px] mt-2">
                <img src={expired} alt="" className="h-5 w-5" />
                <div className="flex items-start justify-start">
                    <h2 className="text-white font-bold text-[9px]">Action Required: 12 {" "} <span className="font-normal">have expired lab results. Please schedule laboratory tests as soon as possible to maintain compliance</span></h2>
                </div>
            </div>
        </div>
    )
}