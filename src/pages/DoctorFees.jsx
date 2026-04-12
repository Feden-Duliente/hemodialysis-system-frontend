import { useState, useEffect, useRef } from "react";

import paid from "../assets/paid.png";
import process from "../assets/process.png";
import pending from "../assets/pending.png";
import dollar from "../assets/dollar.png";
import download from "../assets/download.png";
import fee from "../assets/doctor-fee.png";
import feeStatus from "../assets/feeStatus.png";
import doctor from "../assets/doctor.png";

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
  { doctor: "Antonio Reyes", totalFees: 6800 },
  { doctor: "Jennifer Cortez", totalFees: 5200 },
  { doctor: "Ricardo Santos", totalFees: 7400 },
  { doctor: "Maria Lim", totalFees: 6100 },
  { doctor: "Elena Cruz", totalFees: 8300 },
];
// end: hardcoded data

const COLORS = ["#00682F", "#002060", "#C09200"];

export default function DoctorFees() {

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

                <div className="flex items-center justify-center">
                    <button className="px-2 py-1 flex items-center justify-center shadow-lg rounded-[1px] bg-[#00682F] gap-2 hover:bg-green-600">
                        <img src={download} className="w-3 h-3" />
                        <span className="text-white text-[9px] font-medium">
                            Download Fees Report
                        </span>
                    </button>
                </div>
            </div>

            {/* main content */}
            <div className="flex flex-col gap-3 mt-3 w-full">

                {/* cards */}
                <div className="w-full flex flex-wrap gap-3 justify-center">

                    {/* card 1 */}
                    <div className="w-[200px] h-[100px] bg-[#690B69]/10 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="h-full flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center bg-[#690B69] rounded-[5px] h-6 w-6">
                                    <img src={dollar} className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end mt-1 justify-center w-full">
                                <h2 className="text-[#690B69]/90 text-[16px] font-bold leading-none">
                                    ₱33,600.00
                                </h2>
                                <h2 className="text-[#690B69]/70 text-[9px] font-medium">
                                    5 doctors, 18 patients
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-[#690B69]/90 text-[12px] font-bold">
                                Total Professional Fees
                            </h2>
                            <h2 className="text-[#690B69]/80 text-[9px]">Daily total</h2>
                        </div>
                    </div>

                    {/* card 2 */}
                    <div className="w-[200px] h-[100px] bg-green-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="h-full flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center bg-[#00682F] rounded-[5px] h-6 w-6">
                                    <img src={paid} className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end mt-1 justify-center w-full">
                                <h2 className="text-green-900 text-[16px] font-bold leading-none">
                                    ₱7,200.00
                                </h2>
                                <h2 className="text-green-700 text-[9px] font-medium">1 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-green-900 text-[12px] font-bold">Paid</h2>
                            <h2 className="text-green-800 text-[9px]">Fees already disbursed</h2>
                        </div>
                    </div>

                    {/* card 3 */}
                    <div className="w-[200px] h-[100px] bg-blue-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="h-full flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center bg-[#002060] rounded-[5px] h-6 w-6">
                                    <img src={process} className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end mt-1 justify-center w-full">
                                <h2 className="text-blue-900 text-[16px] font-bold leading-none">
                                    ₱14,600.00
                                </h2>
                                <h2 className="text-blue-700 text-[9px] font-medium">1 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-blue-900 text-[12px] font-bold">Processed</h2>
                            <h2 className="text-blue-800 text-[9px]">Ready for payment</h2>
                        </div>
                    </div>

                    {/* card 4 */}
                    <div className="w-[200px] h-[100px] bg-orange-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out">
                        <div className="h-full flex items-center justify-between gap-2 w-full mt-1">
                            <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center bg-[#C09200] rounded-[5px] h-6 w-6">
                                    <img src={pending} className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex flex-col items-end mt-1 justify-center w-full">
                                <h2 className="text-orange-900 text-[16px] font-bold leading-none">
                                    ₱11,800.00
                                </h2>
                                <h2 className="text-orange-700 text-[9px] font-medium">2 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-orange-900 text-[12px] font-bold">Pending</h2>
                            <h2 className="text-orange-800 text-[9px]">Awaiting processing</h2>
                        </div>
                    </div>

                </div>

                {/* chart visulaization */}
                <div className="w-full flex justify-center">
                    
                    <div className="w-full h-[15rem] flex items-center justify-center gap-2">
                        <div className="bg-white w-1/2 h-full shadow-md p-4 flex flex-col items-center justify-center gap-2">
                            <div className="w-full flex items-center justify-start gap-1">
                                <img src={feeStatus} className="w-4 h-4" />
                                <h2 className="text-blue-900 font-bold text-[10px]">Fee Status Distribution</h2>
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

                        <div className="bg-white w-1/2 h-full shadow-md p-4 flex flex-col items-center justify-center gap-2">
                            <div className="w-full flex items-center justify-start gap-1">
                                <img src={fee} className="w-4 h-4" />
                                <h2 className="text-blue-900 font-bold text-[10px]">
                                    Fees by Specialty
                                </h2>
                            </div>
                            <div className="w-full flex items-center justify-center h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 17 }}>
                                        <XAxis
                                            dataKey="specialty"
                                            fontSize={8}
                                            interval={0}
                                            angle={-20}
                                            textAnchor="end"
                                            tick={{ fontSize: 8 }}
                                        />
                                        <YAxis tick={{ fontSize: 8 }} />
                                        <Tooltip />

                                        <Bar dataKey="totalFees" fill="#113479" radius={0} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="w-full h-[15rem] flex flex-col p-4 justify-center items-center shadow-md bg-white gap-2">
                    <div className="w-full flex items-center justify-start gap-1">
                        <img src={doctor} className="w-4 h-4" />
                        <h2 className="text-blue-900 font-bold text-[10px]">Doctor Fees Comparison</h2>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ComparisonData} margin={{ top: 10, right: 10, left: -5, bottom: 13 }} >

                            <XAxis
                                dataKey="doctor"
                                fontSize={8}
                                interval={0}
                                angle={-25}
                                textAnchor="end"
                            />
                            <YAxis tick={{ fontSize: 8 }} />
                            <Tooltip />

                            <Bar dataKey="totalFees" fill="#002060" radius={0} />

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}