import { useState, useEffect, useRef } from "react";

import paid from "../assets/paid.png";
import process from "../assets/process.png";
import pending from "../assets/pending.png";
import dollar from "../assets/dollar.png";
import download from "../assets/download.png";
import fee from "../assets/doctor-fee.png";
import feeStatus from "../assets/feeStatus.png";
import doctor from "../assets/doctor.png";
import addPatient from "../assets/add-patient.png";
import close2 from "../assets/close2.png";
import logo from "../assets/hemodialysis.png";
import update from "../assets/update.png";


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

export default function DoctorFees() {
    const [status, setStatus] = useState("Process");
    const [openStatusMenu, setOpenStatusMenu] = useState(false);
    const [openAddDoctor, setOpenAddDoctor] = useState(false);
    const [openUpdateDoctor, setOpenUpdateDoctor] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editDoctor, setEditDoctor] = useState(null);
    const [openDownloadDropdown, setOpenDownloadDropdown] = useState(false);

    const statusStyle = {
        Paid: "bg-green-200 text-green-900",
        Process: "bg-blue-200 text-blue-900",
        Pending: "bg-orange-200 text-orange-900",
    };

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
                            
                            <button onClick={() => { downloadPDF(); setOpenDownloadDropdown(false); }}  className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (All Patients Report) </button>
                            <button onClick={() => { console.log("Download Excel"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > PDF (Patients Only) </button>
                            <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false); }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (All Patients Report) </button>
                            <button onClick={() => { console.log("Download CSV"); setOpenDownloadDropdown(false);  }} className="w-full text-left px-3 py-2 hover:bg-green-100" > Excel (Patients Only) </button>

                        </div>
                    )}

                </div>
            </div>

            {/* main content */}
            <div className="flex flex-col gap-3 mt-3 w-full">

                {/* cards */}
                <div className="w-full flex flex-wrap gap-3 justify-center">

                    {/* card 1 */}
                    <div className="w-[200px] h-[100px] bg-[#690B69]/10 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out rounded-[1px]">
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
                                <h2 className="text-[#690B69]/70 text-[10px] font-medium">
                                    5 doctors, 18 patients
                                </h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-[#690B69]/90 text-[12px] font-bold">
                                Total Professional Fees
                            </h2>
                            <h2 className="text-[#690B69]/80 text-[10px]">Daily total</h2>
                        </div>
                    </div>

                    {/* card 2 */}
                    <div className="w-[200px] h-[100px] bg-green-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center hover:scale-105 transition-transform duration-200 ease-in-out rounded-[1px]">
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
                                <h2 className="text-green-700 text-[10px] font-medium">1 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-green-900 text-[12px] font-bold">Paid</h2>
                            <h2 className="text-green-800 text-[10px]">Fees already disbursed</h2>
                        </div>
                    </div>

                    {/* card 3 */}
                    <div className="w-[200px] h-[100px] bg-blue-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center rounded-[1px] hover:scale-105 transition-transform duration-200 ease-in-out">
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
                                <h2 className="text-blue-700 text-[10px] font-medium">1 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-blue-900 text-[12px] font-bold">Processed</h2>
                            <h2 className="text-blue-800 text-[10px]">Ready for payment</h2>
                        </div>
                    </div>

                    {/* card 4 */}
                    <div className="w-[200px] h-[100px] bg-orange-100/80 shadow-md p-3 overflow-hidden gap-3 flex flex-col items-start justify-center rounded-[1px] hover:scale-105 transition-transform duration-200 ease-in-out">
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
                                <h2 className="text-orange-700 text-[10px] font-medium">2 doctor</h2>
                            </div>
                        </div>

                        <div className="flex flex-col items-start justify-center mb-2">
                            <h2 className="text-orange-900 text-[12px] font-bold">Pending</h2>
                            <h2 className="text-orange-800 text-[10px]">Awaiting processing</h2>
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
                                        <Legend wrapperStyle={{ fontSize: "10px" }} />
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
                                            tick={{ fontSize: 10 }}
                                        />
                                        <YAxis tick={{ fontSize: 10 }} />
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
                                fontSize={10}
                                interval={0}
                                angle={-25}
                                textAnchor="end"
                            />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip />

                            <Bar dataKey="totalFees" fill="#002060" radius={0} />

                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="w-full flex items-center justify-between mb-2 mt-2">
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-[1.2rem] w-[3px] bg-[#0B2A66] rounded-full"></div>
                        <div className="flex flex-col items-start justify-center">
                            <h2 className="text-blue-900 font-bold text-[12px]">
                                Doctor Fee Breakdown
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setOpenAddDoctor(true)} className="px-4 py-[6px] flex items-center justify-center shadow-lg rounded-[1px] bg-[#00682F] gap-2 hover:bg-green-600">
                            <img src={addPatient} className="w-3 h-3" />
                            <span className="text-white text-[10px] font-medium">
                                Add Doctor
                            </span>
                        </button>

                        

                        <button onClick={() => { if (!editDoctor) return; setOpenUpdateDoctor(true); }} className="px-4 py-[6px] flex items-center justify-center shadow-lg rounded-[1px] bg-[#C09200] gap-2 hover:bg-[#C09200]/70">
                            <img src={update} className="w-3 h-3" />
                            <span className="text-white text-[9px] font-medium"> Update Doctor </span>
                        </button>
                    </div>

                    {/* add doctor */}
                    {openAddDoctor && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white w-[18rem] px-4 py-4 shadow-lg relative flex flex-col items-center justify-center">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center justify-center gap-1">
                                        <img src={logo} className="h-9 w-9" />
                                        <h2 className="text-black font-bold text-[12px]">Add Doctor</h2>
                                    </div>
                                    <div onClick={() => setOpenAddDoctor(false)} className="flex items-center justify-center h-5 w-5 hover:bg-gray-300">
                                        <img src={close2} className="h-4 w-4" />
                                    </div>
                                </div>

                                <form action="" className="w-full px-2 py-2 mt-1">
                                    <div className="flex flex-col items-start justify-center">
                                        <label htmlFor="fullName" className="text-[10px]">Doctor Name</label>
                                        <input type="text" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">

                                        <label className="text-[10px]">Specialization</label>

                                        <select multiple className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" >
                                            <option value="nephrologist">Nephrologist</option>
                                            <option value="cardiologist">Cardiologist</option>
                                            <option value="internist">Internist</option>
                                            <option value="general">General Medicine</option>
                                            <option value="nephrologist">Nephrologist</option>
                                            <option value="cardiologist">Cardiologist</option>
                                            <option value="internist">Internist</option>
                                            <option value="general">General Medicine</option>
                                        </select>

                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">

                                        <label className="text-[10px]">Services</label>

                                        <select multiple  className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" >
                                            
                                            <option value="hemodialysis-supervision">Hemodialysis Supervision</option>
                                            <option value="medical-assessment">Medical Assessment</option>
                                            <option value="treatment-plan-review">Treatment Plan Review</option>
                                            <option value="patient-consultation"> Patient Consultation</option>
                                            <option value="lab-interpretation">Lab Interpretation</option>
                                            <option value="follow-up-care">Follow-up Care</option>

                                        </select>

                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">
                                        <label htmlFor="fullName" className="text-[10px]">Patients</label>
                                        <input type="number" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                    </div>

                                    <div className="flex items-center justify-between w-full mt-3 gap-2">
                                        <div className="flex flex-col items-start justify-center w-1/2">
                                            <label htmlFor="fullName" className="text-[10px]">Total Fee</label>
                                            <input type="text" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                        </div>

                                        <div className="flex flex-col items-start justify-center w-1/2">

                                            <label className="text-[10px]">Status</label>

                                            <select
                                                className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]"
                                            >
                                                <option value="new entry">New</option>
                                                <option value="scheduled">Paid</option>
                                                <option value="inprogress">Process</option>
                                                <option value="completed">Pending</option>
                                            </select>

                                        </div>
                                    </div>

                                    <button className="w-full py-1 bg-[#002060] hover:bg-blue-600 flex items-center rounded-[3px] justify-center shadow-md text-white text-[10px] mt-4 font-medium">Submit</button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* updtae doctor */}
                    {openUpdateDoctor && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                            <div className="bg-white w-[18rem] px-4 py-4 shadow-lg relative flex flex-col items-center justify-center">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center justify-center gap-1">
                                        <img src={logo} className="h-9 w-9" />
                                        <h2 className="text-black font-bold text-[12px]">Update Doctor</h2>
                                    </div>
                                    <div onClick={() => setOpenUpdateDoctor(false)} className="flex items-center justify-center h-5 w-5 hover:bg-gray-300">
                                        <img src={close2} className="h-4 w-4" />
                                    </div>
                                </div>

                                <form action="" className="w-full px-2 py-2 mt-1">
                                    <div className="flex flex-col items-start justify-center">
                                        <label htmlFor="fullName" className="text-[10px]">Doctor Name</label>
                                        <input type="text" value={editDoctor?.name || ""} onChange={(e) => setEditDoctor({ ...editDoctor, name: e.target.value }) } className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">
                                        <label className="text-[10px]">Specialization</label>
                                        <select multiple value={editDoctor?.specialization || []} onChange={(e) => { const selected = Array.from( e.target.selectedOptions, (option) => option.value ); setEditDoctor({ ...editDoctor, specialization: selected, }); }} className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" >
                                            <option value="nephrologist">Nephrologist</option>
                                            <option value="cardiologist">Cardiologist</option>
                                            <option value="internist">Internist</option>
                                            <option value="general">General Medicine</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">
                                        <label className="text-[10px]">Services</label>
                                        <select multiple value={editDoctor?.services || []} onChange={(e) => { const selected = Array.from( e.target.selectedOptions, (option) => option.value ); setEditDoctor({ ...editDoctor, services: selected, }); }}  className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" >
                                            <option value="hemodialysis-supervision">Hemodialysis Supervision</option>
                                            <option value="medical-assessment">Medical Assessment</option>
                                            <option value="treatment-plan-review">Treatment Plan Review</option>
                                            <option value="patient-consultation"> Patient Consultation</option>
                                            <option value="lab-interpretation">Lab Interpretation</option>
                                            <option value="follow-up-care">Follow-up Care</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col items-start justify-center mt-3">
                                        <label htmlFor="fullName" className="text-[10px]">Patients</label>
                                        <input value={editDoctor?.patients || ""} onChange={(e) => setEditDoctor({ ...editDoctor, patients: e.target.value }) } type="number" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                    </div>

                                    <div className="flex items-center justify-between w-full mt-3 gap-2">
                                        <div className="flex flex-col items-start justify-center w-1/2">
                                            <label htmlFor="fullName" className="text-[10px]">Total Fee</label>
                                            <input value={editDoctor?.totalFee || ""} onChange={(e) => setEditDoctor({ ...editDoctor, totalFee: e.target.value }) } type="text" className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" />
                                        </div>

                                        <div className="flex flex-col items-start justify-center w-1/2">
                                            <label className="text-[10px]">Status</label>
                                            <select value={editDoctor?.status || ""} onChange={(e) => setEditDoctor({ ...editDoctor, status: e.target.value }) } className="w-full mt-1 border border-gray-400 p-1 rounded-[2px] text-[10px] focus:outline-none focus:border-[#0B2A66]" >
                                                <option value="new entry">New</option>
                                                <option value="scheduled">Paid</option>
                                                <option value="inprogress">Process</option>
                                                <option value="completed">Pending</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button className="w-full py-1 bg-[#002060] hover:bg-blue-600 flex items-center justify-center rounded-[3px] shadow-md text-white text-[10px] mt-4 font-medium">Submit</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* table */}
                <div className="w-full h-[18rem] flex flex-col bg-white shadow-md p-4">
                    
                    <div className="h-full overflow-hidden">        
                        <div className="h-full overflow-y-auto no-scrollable">
                            <table className="w-full border-collapse">
                                <thead className="sticky top-0 bg-[#0B2A66] z-10 shadow-sm">
                                <tr>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Doctor Name</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Status</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Specialization</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Patients</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Rate per Patient</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Services</th>
                                    <th className="text-center py-1 px-4 text-[10px] font-medium text-white tracking-[0.1em]">Total Fee</th>
                                </tr>
                                </thead>
                                <tbody>

                                    <tr onClick={() => { if (selectedDoctor?.id === doctorData.id) { setSelectedDoctor(null); setEditDoctor(null); } else { setSelectedDoctor(doctorData); setEditDoctor({ ...doctorData, specialization: [...doctorData.specialization], services: [...doctorData.services], }); } }} className={`border-b border-gray-200 hover:bg-gray-200 cursor-pointer ${ selectedDoctor?.id === doctorData.id ? "bg-gray-300" : "" }`} >
                                        
                                        <td className="py-1 px-4 text-[10px] text-black text-center"> Dr. Jennifer Cortez</td>

                                        <td className="py-1 px-4 text-[10px] text-black text-center relative">
                                            <div onClick={() => setOpenStatusMenu(!openStatusMenu)} className={`w-[60px] flex items-center justify-center py-1 px-2 rounded-[1px] cursor-pointer ${statusStyle[status]}`} >
                                                <h2 className="text-[9px] font-bold">
                                                    {status}
                                                </h2>
                                            </div>

                                            {/* status menu */}
                                            {openStatusMenu && (
                                                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 w-24 bg-white shadow-lg border border-gray-300 z-50">

                                                    <div onClick={() => { setStatus("Paid"); setOpenStatusMenu(false); }} className="px-2 py-1 text-[10px] hover:bg-green-100 text-green-900 cursor-pointer" >
                                                        Paid
                                                    </div>

                                                    <div onClick={() => { setStatus("Process"); setOpenStatusMenu(false); }} className="px-2 py-1 text-[10px] hover:bg-blue-100 text-blue-900 cursor-pointer" >
                                                        Process
                                                    </div>

                                                    <div onClick={() => { setStatus("Pending"); setOpenStatusMenu(false);  }} className="px-2 py-1 text-[10px] hover:bg-orange-100 text-orange-900 cursor-pointer" >
                                                        Pending
                                                    </div>

                                                </div>
                                            )}

                                        </td>

                                        <td className="py-1 px-4 text-[10px] text-black text-center">Nephrologist</td>

                                        <td className="py-1 px-4 text-[10px] text-black text-center">4</td>

                                        <td className="py-1 px-4 text-[10px] text-black text-center">₱1,500.00</td>

                                        <td className="py-1 px-4 text-[10px] text-black text-left ml-2">
                                            <div className="flex flex-col gap-[2px]">
                                            <span>Hemodialysis Supervision</span>
                                            <span>Medical Assessment</span>
                                            <span>Treatment Plan Review</span>
                                            </div>
                                        </td>

                                        <td className="py-1 px-4 text-[10px] text-black text-center font-medium">₱7,200.00</td>

                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}