import { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUpIcon, CurrencyDollarIcon, MagnifyingGlassIcon    } from "@heroicons/react/24/solid";
import {
  Package,
  Pill,
  Syringe,
  Droplets,
  Scissors,
  Bandage,
  FlaskConical,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,PieChart, Pie, Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";


const doctorsData = [
  { name: "BILLIE DELA CRUZ", specialty: "Neurologist", contribution: 50, total: 100 },
  { name: "WEI WUXIAN", specialty: "Neurologist", contribution: 71, total: 100 },
  { name: "XIA BAO", specialty: "Neurologist", contribution: 14, total: 100 },
  { name: "DYLAN WANG", specialty: "Cardiologist", contribution: 46, total: 100 },
  { name: "SAN LANG", specialty: "Endocrinologist", contribution: 80, total: 100 },
  { name: "BILLIE DELA CRUZ", specialty: "Neurologist", contribution: 50, total: 100 },
  { name: "WEI WUXIAN", specialty: "Neurologist", contribution: 71, total: 100 },
  { name: "XIA BAO", specialty: "Neurologist", contribution: 14, total: 100 },
  { name: "DYLAN WANG", specialty: "Cardiologist", contribution: 46, total: 100 },
  { name: "SAN LANG", specialty: "Endocrinologist", contribution: 80, total: 100 },
  { name: "BILLIE DELA CRUZ", specialty: "Neurologist", contribution: 50, total: 100 },
  { name: "WEI WUXIAN", specialty: "Neurologist", contribution: 71, total: 100 },
  { name: "XIA BAO", specialty: "Neurologist", contribution: 14, total: 100 },
  { name: "DYLAN WANG", specialty: "Cardiologist", contribution: 46, total: 100 },
  { name: "SAN LANG", specialty: "Endocrinologist", contribution: 80, total: 100 },
];

const data = [
  { name: "High-flux Dialyzer", type: "dialyzer", qty: 12, unit: "pieces" },
  { name: "Blood Tubing Set", type: "tubing", qty: 12, unit: "sets" },
  { name: "Dialysate Solution (4L)", type: "other", qty: 48, unit: "bags" },
  { name: "Heparin (5000 IU)", type: "medication", qty: 12, unit: "vials" },
  { name: "Saline Solution (500ml)", type: "medication", qty: 24, unit: "bags" },
  { name: "Needle Set", type: "other", qty: 24, unit: "sets" },
  { name: "Gauze Pads", type: "other", qty: 120, unit: "pieces" },
  { name: "Medical Tape", type: "other", qty: 12, unit: "rolls" },
];

const rawData = [
  { name: "Dialyzer", today: 18, yesterday: 14 },
  { name: "Tubing", today: 22, yesterday: 26 },
  { name: "Dialysate", today: 70, yesterday: 58 },
  { name: "Heparin", today: 16, yesterday: 10 },
  { name: "Saline", today: 38, yesterday: 30 },
  { name: "Needle", today: 42, yesterday: 28 },
  { name: "Gauze", today: 120, yesterday: 23 },
  { name: "Tape", today: 20, yesterday: 16 },
];

const pieData = [
  { name: "Pending", value: 500 },
  { name: "In Progress", value: 300 },
  { name: "Pending", value: 700 },
];

const PIECOLORS = [
  "#671f19", 
  "#901d12", 
  "#ae1717", 
];

const COLORS = ["#0c5148", "#1b4486", "#bd7d0f", "#b80f0f"];

const linedata = [
  { time: "9AM", today: 1020, yesterday: 980 },
  { time: "9:30AM", today: 1280, yesterday: 1120 },
  { time: "10AM", today: 1900, yesterday: 1450 },
  { time: "10:30AM", today: 2300, yesterday: 1750 },
  { time: "11AM", today: 2650, yesterday: 2050 },
  { time: "11:30AM", today: 2480, yesterday: 2200 },
  { time: "12PM", today: 3200, yesterday: 2700 },
  { time: "12:30PM", today: 3050, yesterday: 2550 },
  { time: "1PM", today: 2920, yesterday: 2400 },
  { time: "1:15PM", today: 2700, yesterday: 2250 },
  { time: "1:30PM", today: 2550, yesterday: 2100 },
  { time: "1:45PM", today: 2900, yesterday: 2350 },
  { time: "2PM", today: 4200, yesterday: 3150 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 backdrop-blur-md border border-white/30 shadow-lg rounded-[12px] px-3 py-2 text-[11px]">
        <p className="font-semibold text-gray-700 mb-1">{label}</p>
        <p className="text-[#0c5148]">Today: ₱{payload[0].value}</p>
        <p className="text-gray-500">Yesterday: ₱{payload[1].value}</p>
      </div>
    );
  }
  return null;
};


export default function ExpiringLabs() {
  const [openDownload, setOpenDownload] = useState(false);
  const [openSearchPatient, setOpenSearchPatient] = useState(false);
    
  const [active, setActive] = useState(null);

  const maxToday = Math.max(...rawData.map(d => d.today || 0));

  const data = rawData.map(d => ({ ...d, isMax: d.today === maxToday, }));

  const ActiveLabel = ({ x, y, width, value, payload }) => {
    if (!payload?.isMax) return null;

    return (
      <g>
        <rect x={x + width / 2 - 65} y={y - 35} width={130} height={24} rx={8} fill="#6366F1" />
        <text x={x + width / 2} y={y - 18} fill="#fff" textAnchor="middle" fontSize={12} fontWeight={500} > {value} – {payload?.name} – Today </text>
        <polygon points={` ${x + width / 2 - 6},${y - 11} ${x + width / 2 + 6},${y - 11} ${x + width / 2},${y - 2} `} fill="#6366F1" />
      </g>
    );
  };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center  p-8 no-scrollbar mr-5">

            {/* head */}
            <div className="w-full flex items-center justify-between mt-5 ">
              <div className="flex items-start justify-center gap-3">
                  <div className="flex items-center justify-center gap-3 ">
                      <div className="w-[5px] h-8 bg-green-900 rounded-full"></div>
                      <div className="flex flex-col items-start justify-center">
                          <h2 className="text-[11px] font-semibold tracking-[0.1em]">EXPIRING LAB RESULT</h2>
                          <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">Lab results are valid for 30 days from test date. Monitor and renew expired or expiring results.</h2>
                      </div>
                  </div>
              </div>
            </div>

            {/* start: main contents */}
            <div className="w-full flex-1 min-h-0 flex items-stretch justify-between gap-5 mt-2">
                <div className="w-[280px] shrink-0 flex flex-col items-center justify-center gap-4 mb-2">

                    {/* cards */}
                    <div className="w-full flex flex-col items-center justify-between h-[210px] gap-4">

                        {/* card 1 */}
                        <div className="w-full h-[110px] flex flex-col items-center justify-center px-4 py-3 gap-2 rounded-[14px] bg-[#770e0e] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-7 w-7 text-white" />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-[20px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">12</h2>
                                    <h2 className="text-[10px] text-white whitespace-nowrap font-medium tracking-[0.1em]">EXPIRED LAB RESULTS</h2>
                                </div>
                            
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[8px] text-white/80  font-medium tracking-[0.1em] text-justify">12 patients have expired lab results. Please schedule laboratory tests as soon as possible to maintain compliance.</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 items-center justify-between h-[240px] gap-4">
                            {/* card 2 */}
                            <div className="w-full h-[90px] flex flex-col items-center justify-between px-5 py-3 gap-2 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-blue-900/40 hover:border-blue-900/40 transition-all duration-300 text-white">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                        <CurrencyDollarIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <h2 className="text-[20px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">12</h2>
                                        
                                    </div>
                                
                                </div>
                                <h2 className="text-[10px] text-white whitespace-nowrap font-medium tracking-[0.1em]">EXPIRED SOON</h2>
                            </div>

                            {/* card 3 */}
                            <div className="w-full h-[90px] flex flex-col items-center justify-between px-5 py-3 gap-2 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/40 hover:border-green-900/40 transition-all duration-300 text-white">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                        <CurrencyDollarIcon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="flex items-center justify-center gap-2">
                                        <h2 className="text-[20px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">0</h2>
                                        
                                    </div>
                                
                                </div>
                                <h2 className="text-[10px] text-white whitespace-nowrap font-medium tracking-[0.1em]">VALID RESULTS</h2>
                            </div>
                        </div>

                    </div>
                    

                    {/* pie chart */}
                    <div className="w-full flex flex-col items-start justify-center h-[280px] gap-2 rounded-[20px] bg-white/20 backdrop-blur-md border border-white/40 shadow-lg p-4">
                        <div className="flex items-center justify-center py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40">
                            <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                            <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]"> TOTAL SALES </h2>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={25} outerRadius={68} paddingAngle={3} cornerRadius={6} cx="50%" cy="45%">
                                        {pieData.map((entry, index) => (
                                            <Cell key={index} fill={PIECOLORS[index % PIECOLORS.length]} />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value, name) => [`₱${value.toLocaleString()}`, name]}
                                        contentStyle={{
                                            background: "rgba(255, 255, 255, 0.25)",
                                            backdropFilter: "blur(14px)",
                                            WebkitBackdropFilter: "blur(14px)",
                                            borderRadius: "12px",
                                            border: "1px solid rgba(255, 255, 255, 0.35)",
                                            fontSize: "12px",
                                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                            color: "#000",
                                        }}
                                        itemStyle={{ color: "#000" }}
                                        labelStyle={{ color: "#000", fontWeight: 500 }}
                                        cursor={{ fill: "rgba(59,130,246,0.08)" }}
                                    />

                                    <Legend
                                        layout="horizontal"
                                        verticalAlign="bottom"
                                        align="center"
                                        iconType="circle"
                                        wrapperStyle={{
                                            fontSize: "10px",
                                            paddingTop: "10px",
                                            color: "#000",
                                        }}
                                        formatter={(value) => <span style={{ color: "#000" }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="flex-1 min-w-0 h-[505px] mt-5 flex flex-col items-start justify-start rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg px-5 py-4 gap-2">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center justify-center py-1 px-4 gap-7 rounded-full backdrop-blur-xl border border-green-900/20 shadow-xl bg-green-900/40">
                        
                        <div className="flex items-cneter justify-center gap-3">
                            <div className="w-1 h-4 rounded-full bg-[#0c5148]"></div>
                            <h2 className="text-[9px] font-semibold text-[#0c5148] tracking-[0.1em]"> CONSUMPTION SUPPLY SETS </h2>
                        </div>
                        
                    </div>

                    <div className="flex items-center gap-2"> 
                        <div onClick={() => setOpenSearchPatient(true)} className="flex items-center justify-center py-1 px-4 rounded-full backdrop-blur-xl border border-[#1b4486]/20 shadow-xl bg-[#1b4486]/40 hover:bg-white/10 hover:border-white/10 cursor-pointer" >
                            <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]"> SEARCH </h2>
                            <MagnifyingGlassIcon className="w-3 h-3 ml-2 text-[#1b4486]" />
                        </div>

                        {openSearchPatient && (
                            <input
                                autoFocus
                                type="text"
                                placeholder="Patient name..."
                                className="text-[10px] font-medium rounded-full border border-[#1b4486]/20 shadow-xl px-3 py-1 outline-none transition-all duration-300 ease-in-out w-48"
                            />
                        )}

                    </div> 
                </div>
                    

                <div className="w-full h-full flex flex-col flex-1 min-h-0"> 
                    <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar mt-1"> 
                        <div className="rounded-[6px] overflow-hidden "> 
                            <table className="w-full border-collapse">
                                <thead className="shadow-xl">
                                    <tr>
                                        <th className="bg-[#0c5148] text-[10px] font-medium text-white text-left px-4 py-2 rounded-l-[6px]">
                                            ID
                                        </th>

                                        <th className="bg-[#0c5148] text-[10px] font-medium text-white text-left px-4 py-2">
                                            PATIENT NAME
                                        </th>

                                        <th className="bg-[#0c5148] text-[10px] font-medium text-white text-left px-4 py-2">
                                            STATUS
                                        </th>

                                        <th className="bg-[#0c5148] text-[10px] font-medium text-white text-left px-4 py-2">
                                            DUE
                                        </th>

                                        <th className="bg-[#0c5148] text-[10px] font-medium text-white text-left px-4 py-2 rounded-r-[6px]">
                                            LAB TEST
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="">
                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">03</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">HARRY POTTER</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[70px] flex items-center justify-center py-1 bg-red-900/30 rounded-fulltext-green-900 font-semibold bg-green-900/40 !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                    <tr className="hover:bg-red-900/10">
                                        <td className="px-4 py-2 text-[10px] font-medium">04</td>
                                        <td className="px-4 py-2 text-[10px] font-semibold">JOHN DOE</td>
                                        <td className=" text-[9px] font-medium">
                                            <div className="w-[100px] flex items-center justify-center py-1 bg-[#ffbe01]/30 rounded-full text-[#ffbe01] font-semibold  !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">
                                                <h2 className="font-medium text-red-900">EXPIRED SOON</h2>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-[10px] font-medium">APRIL 19, 2026</td>
                                        <td className="flex flex-col px-4 py-2 text-[9px] font-medium">
                                            <span>CBC</span>
                                            <span>Potassium</span>
                                            <span>Calcium</span>
                                        </td>
                                    </tr>

                                </tbody>
                            </table> 
                        </div>
                    </div>
                </div>
                </div>

            </div>
                
            {/* end:main contents */}
        </div>
    )
}