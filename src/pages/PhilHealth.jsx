import React, { useState} from "react";
import calendar from "../assets/calendar.png";
import paid from "../assets/paid.png";
import creditCard from "../assets/creditCard.png";
import philHealthPending from "../assets/philHealthPending.png";
import philHealthUnpaid from "../assets/philHealthUnpaid.png";
import approvedPhilhealth from "../assets/approvedPhilhealth.png";
import pDenied from "../assets/pDenied.png";
import sApproved from "../assets/sApproved.png";
import vStatus from "../assets/vStatus.png";
import doctor from "../assets/doctor.png";
import pNotif from "../assets/pNotif.png";
import download from "../assets/download.png";

// start: charts imports
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
// end; charts imports


// start: hardcoded data
const barData = [
  { specialty: "Endocrinologist", totalFees: 6200 },
  { specialty: "Internal Medicine", totalFees: 9800 },
  { specialty: "Cardiologist", totalFees: 14500 },
];

const pieData = [
  { name: "Paid", value: 21 },
  { name: "Processed", value: 43 },
  { name: "Pending", value: 35 },
];

const ComparisonData = [
  { status: "Paid", payment: 4, approval: 4 },
  { status: "Approved", payment: 0, approval: 4 },
  { status: "Denied", payment: 0, approval: 2 },
  { status: "Pending", payment: 6, approval: 6 },
  { status: "Pending Review", payment: 3, approval: 1 },
  { status: "Unpaid", payment: 2, approval: 0 },
];

const doctorData = {
  id: 1,
  name: "Dr. Jennifer Cortez",
  status: "Process",
  specialization: ["nephrologist"],
  patients: 4,
  rate: 1500,
  services: [
        "hemodialysis-supervision",
        "medical-assessment",
        "treatment-plan-review"
    ],
  totalFee: 7200,
  status: "scheduled"
};
// end: hardcoded data

const COLORS = ["#00682F", "#002060", "#C09200"];




export default function Philhealth() {
    const [openDownloadDropdown, setOpenDownloadDropdown] = useState(false);


    return (
        <div className="h-screen overflow-y-auto no-scrollbar flex flex-col items-center justify-start pb-5">

            {/* header */}
                        <div className="w-full flex items-center justify-between mt-[5.4rem]">
                            <div className="flex items-center justify-center gap-2">
                                <div className="h-[1.7rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                                <div className="flex flex-col items-start justify-center">
                                    <h2 className="text-blue-900 font-bold text-[14px]">
                                        Doctor Professional Fees Report
                                    </h2>
                                    <h2 className="text-blue-500 font-semibold text-[9px]">
                                        Professional fees for 5 doctors attending 18 patients today
                                    </h2>
                                </div>
                            </div>
            
                            <div className="relative flex items-center justify-center gap-2">
                                
                                <button onClick={() => setOpenDownloadDropdown(!openDownloadDropdown)} className="px-4 py-[6px] flex items-center justify-center shadow-lg rounded-[1px] bg-[#00682F] gap-2 hover:bg-green-600"  >
                                    <img src={download} className="w-3 h-3" />
                                    <span className="text-white text-[9px] font-medium"> Download Report </span>
                                </button>
            
            
                                {openDownloadDropdown && (
                                    <div className="absolute top-full mt-1 w-[10rem] bg-white shadow-md rounded text-[10px] z-10">
                                        
                                        <button   className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (All Patients Report) </button>
                                        <button onClick={() => { console.log("Download Excel"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (Patients Only) </button>
                                        <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (All Patients Report) </button>
                                        <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false);  }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (Patients Only) </button>
            
                                    </div>
                                )}
            
                            </div>
                        </div>

            <div className="w-full flex items-start justify-between mt-3 shadow-lg py-4 bg-blue-100 rounded-[1px] px-6">

                <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center p-2 rounded-[1px] bg-blue-200">
                        <img src={calendar} className="h-6 w-6 block" alt="" />
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="text-[10px] text-gray-700 font-semibold">Cuts Off</h2>
                        <h2 className="text-[14px] text-blue-900 font-bold">1st - 5th</h2>
                    </div>

                </div>

                <div className="flex items-start gap-4">

                    <div className="h-10 w-[1px] bg-blue-300"></div>

                    <div className="flex flex-col gap-[2px]">

                        <h2 className="text-[10px] text-gray-700"> PhilHealth processes claims biweekly. </h2> 
                        <h2 className="text-[10px] text-gray-700"> Treatments in current cutoff period (1st - 15th) are pending approval. </h2> 
                        <div className="flex items-center gap-2">
                            <img src={calendar} className="h-3 w-3" alt="" />
                            <h2 className="text-[10px] text-gray-700"> Cutoff ends on <span className="font-semibold text-blue-500">Apr 15, 2026</span>. </h2>
                        </div>

                    </div>

                </div>

            </div>

            {/* cards */}
            <div className="w-[47rem] flex items-center justify-center gap-4 py-5">

                <div className="w-1/2 flex flex-col gap-4 shadow-lg bg-white p-4">
 
                    <div className="w-full flex items-center justify-start gap-2">

                        <div className="flex items-center justify-center bg-blue-200 h-7 w-7 rounded-full">
                            <img src={creditCard} className="w-4 h-4" />
                        </div> 
                        <h2 className="text-black font-bold text-[10px]"> Payment Status </h2>

                    </div>
 
                    <div className="grid grid-cols-3 gap-2">
 
                        <div className="bg-green-100 rounded-[1px] p-4 flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-[#00682F] h-7 w-7 rounded-full">
                                <img src={paid} className="w-4 h-4" />
                            </div>

                            <h2 className="text-green-800 font-bold text-[18px] mt-4">4</h2>
                            <h2 className="text-green-800 font-bold text-[10px]">Paid</h2> 
                            <h2 className="text-gray-600 font-medium text-[9px] mt-4 text-center"> 33% of total patients </h2>

                        </div>

                        <div className="bg-red-100 rounded-[1px] p-4 w-full flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-[#C62828] h-7 w-7 rounded-full">
                                <img src={philHealthUnpaid} className="w-5 h-5" />
                            </div>

                            <h2 className="text-red-800 font-bold text-[18px] mt-4">4</h2>
                            <h2 className="text-red-800 font-bold text-[10px] text-center">UnPaid (Denied)</h2> 
                            <h2 className="text-gray-500 font-medium text-[9px] mt-4 text-center"> Claims rejected by PhilHealth </h2>

                        </div>

                        <div className="bg-orange-100 rounded-[1px] p-4 flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-yellow-500 h-7 w-7 rounded-full">
                                <img src={philHealthPending} className="w-4 h-4" />
                            </div>

                            <h2 className="text-red-800 font-bold text-[18px] mt-4">6</h2>
                            <h2 className="text-red-800 font-bold text-[10px]">Pending</h2> 
                            <h2 className="text-gray-500 font-medium text-[9px] mt-4 text-center"> Awaiting cutoff processing </h2>

                        </div>
                        

                    </div>

                </div>

                
                <div className="w-1/2 flex flex-col gap-4 shadow-lg bg-white p-4">
 
                    <div className="w-full flex items-center justify-start gap-2">

                        <div className="flex items-center justify-center bg-violet-200 h-7 w-7 rounded-full">
                            <img src={approvedPhilhealth} className="w-4 h-4" />
                        </div> 
                        <h2 className="text-black font-bold text-[10px]"> PhilHealth Approval Status </h2>

                    </div>
 
                    <div className="grid grid-cols-3 gap-2">
 
                        <div className="bg-green-100 rounded-[1px] p-4 flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-[#00682F] h-7 w-7 rounded-full">
                                <img src={sApproved} className="w-4 h-4" />
                            </div>

                            <h2 className="text-green-800 font-bold text-[18px] mt-4">4</h2>
                            <h2 className="text-green-800 font-bold text-[10px]">Approved</h2> 
                            <h2 className="text-gray-600 font-medium text-[9px] mt-4 text-center"> 33% approval rate </h2>

                        </div>

                        <div className="bg-red-100 rounded-[1px] p-4 flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-[#C62828] h-7 w-7 rounded-full">
                                <img src={pDenied} className="w-4 h-4" />
                            </div>

                            <h2 className="text-red-800 font-bold text-[18px] mt-4">4</h2>
                            <h2 className="text-red-800 font-bold text-[10px]">Denied</h2> 
                            <h2 className="text-gray-500 font-medium text-[9px] mt-4 text-center"> Claims need review </h2>

                        </div>

                        <div className="bg-orange-100 rounded-[1px] p-4 flex flex-col items-center justify-center">

                            <div className="flex items-center justify-center bg-yellow-500 h-7 w-7 rounded-full">
                                <img src={philHealthPending} className="w-4 h-4" />
                            </div>

                            <h2 className="text-red-800 font-bold text-[18px] mt-4">6</h2>
                            <h2 className="text-red-800 font-bold text-[9px] text-center">Pending Review</h2> 
                            <h2 className="text-gray-500 font-medium text-[9px] mt-4 text-center"> Awaiting PhilHealth decision </h2>

                        </div>
                        

                    </div>

                </div>

            </div>

            {/* start: chart visulaization */}
            <div className="w-full flex justify-center">
                
                <div className="w-full h-[15rem] flex items-center justify-center gap-4">
                    <div className="bg-white w-1/2 h-full shadow-md p-4 flex flex-col items-center justify-center gap-2">
                        <div className="w-full flex items-center justify-start gap-2">
                            <img src={vStatus} className="w-5 h-5" />
                            <h2 className="text-green-800 font-bold text-[10px]">Payment Status Distribution</h2>
                        </div>
                        <div className="w-full flex items-center justify-center h-full mb-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={60}   
                                        innerRadius={36}   
                                        paddingAngle={2}
                                        label={{ fontSize: 10 }}  
                                    > 
                                        {pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index]} /> ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: "9px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-white w-1/2 h-full shadow-md p-4 flex flex-col items-center justify-center gap-2">
                        <div className="w-full flex items-center justify-start gap-2">
                            <img src={vStatus} className="w-5 h-5" />
                            <h2 className="text-green-800 font-bold text-[10px]">Payment Status Distribution</h2>
                        </div>
                        <div className="w-full flex items-center justify-center h-full mb-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={60}   
                                        innerRadius={36}   
                                        paddingAngle={2}
                                        label={{ fontSize: 9 }}  
                                    > 
                                        {pieData.map((entry, index) => ( <Cell key={`cell-${index}`} fill={COLORS[index]} /> ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: "9px" }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-full h-[15rem] flex flex-col p-4 shadow-lg bg-white gap-2 mt-4">

                {/* pi charts */}
                <div className="w-full flex items-center justify-start gap-1">
                    <img src={doctor} className="w-4 h-4" />
                    <h2 className="text-blue-900 font-bold text-[10px]"> Doctor Fees Comparison </h2>
                </div>

                {/* bar chart */}
                <div className="w-full h-[12rem]">
                    <ResponsiveContainer width="100%" height="100%">

                        <BarChart data={ComparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }} barSize={40} >
                            
                            <Legend verticalAlign="top" align="center" wrapperStyle={{ fontSize: "10px" }} />
                            <XAxis dataKey="status" tick={{ fontSize: 10 }}
                                label={{
                                    value: "Payment Status",
                                    position: "insideBottom",
                                    offset: -10,
                                    fontSize: 10,
                                }}
                            />
                            <YAxis tick={{ fontSize: 10 }}
                                label={{
                                    value: "Number of Patients",
                                    angle: -90,
                                    position: "insideLeft",
                                    offset: 10,
                                    style: { textAnchor: "middle", fontSize: 10 }
                                }}
                            />
                            <Tooltip />
                            <Bar dataKey="payment" fill="#002060" name="Payment" />
                            <Bar dataKey="approval" fill="#00682F" name="Approval" />

                        </BarChart>

                    </ResponsiveContainer>
                </div>

            </div>
            {/* end: chart visulaization */}

            <div className="w-full flex items-start justify-between mt-5 shadow-lg py-4 bg-blue-100 rounded-[2px] px-6">
                
                <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center p-2 rounded-md bg-blue-200">
                        <img src={calendar} className="h-5 w-5 block" alt="" />
                    </div>
                    <h2 className="text-[12px] text-blue-900 font-bold">All Treatment Records</h2>

                </div>

                <div className="flex items-center justify-center gap-4 mt-2">

                    <h2 className="text-[14px] text-blue-900 font-bold text-center">12</h2>

                </div>

            </div>

            <div className="w-full flex items-center justify-start mt-5 gap-5 shadow-lg py-4 bg-orange-100 border border-orange-300 rounded-[2px] px-6">
                
                <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center p-2 rounded-full bg-orange-200">
                        <img src={pNotif} className="h-5 w-5 block" alt="" />
                    </div>
                    
                </div>

                <div className="flex flex-col items-start justify-center">
                    <h2 className="text-[10px] text-orange-500 font-bold">All Treatment Records</h2>
                    <h2 className="text-[10px] text-orange-900 font-bold tracking-[0.04em] mt-2">6 treatments <span className="text-gray-700 font-medium"> {" "}are in the current cutoff period (</span>1st -15th<span className="text-gray-700 font-medium"> ) and will be processed by PhilHealth after </span> April 15, 2026.</h2>
                    <h2 className="text-[10px] text-gray-700 font-medium tracking-[0.04em]">Payments status will be updated once PhilHealth approves or denies the claims.</h2>
                </div>


            </div>
        
        </div>
    )
}