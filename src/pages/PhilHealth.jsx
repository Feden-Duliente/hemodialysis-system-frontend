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

const barData = [
  { name: "Paid", Payment: 8, Approval: 6 },
  { name: "Unpaid", Payment: 4, Approval: 2 },
  { name: "Pending", Payment: 6, Approval: 4 },
  { name: "Pending Review", Payment: 2, Approval: 0 },
  { name: "Approved", Payment: 7, Approval: 8 },
  { name: "Denied", Payment: 1, Approval: 2 },
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

const pieDataStatus = [
  { name: "Paid", value: 500 },
  { name: "UnPaid", value: 300 },
  { name: "Pending", value: 700 },
];

const pieDataApproval = [
  { name: "Paid", value: 500 },
  { name: "UnPaid", value: 300 },
  { name: "Pending", value: 700 },
];

const PIECOLORSAPPROVAL = [
  "#02367b", 
  "#006ca4", 
  "#0496c7", 
];
const PIECOLORSTATUS = [
  "#052e1f", 
  "#085f47", 
  "#0d7658", 
]

const COLORS = ["#0c5148", "#1b4486", "#bd7d0f", "#b80f0f"];



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


export default function Philhealth() {
  const [openDownload, setOpenDownload] = useState(false);
  const [openSearchPatient, setOpenSearchPatient] = useState(false);  
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
                          <h2 className="text-[11px] font-semibold tracking-[0.1em]">PHILHEAL PAYMENT & APPROVAL STATUS</h2>
                          <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">PhilHealth processes claims biweekly. Treatments in current cutoff period (<span className="text-[#770e0e]">16th</span> - <span className="text-[#770e0e]">30th</span>) are pending approval. Cutoff ends on <span className="text-[#770e0e]">April 30, 2026</span>.</h2>
                      </div>
                  </div>
              </div>
            </div>

            {/* start: main contents */} 
            <div className="w-full flex-1 min-h-0 flex items-stretch justify-between gap-5 mt-5">

                <div className="w-[200px] shrink-0 flex flex-col items-center justify-center gap-2 mb-2  rounded-[20px] bg-white/20 backdrop-blur-md border border-white/40 shadow-lg p-4">

                    {/* cards */}
                    <div className="w-full flex flex-col items-center justify-between h-[340px] gap-4">
                        <div className="w-full flex items-center justify-start">

                    

                        <div className=" flex items-center justify-center py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40">
                            <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                            <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]"> PAYMENT STATUS </h2>
                        </div>
                        </div>


                        <div className="w-full h-[90px] flex flex-col items-center justify-center px-2 py-4 gap-3 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-[18px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">12</h2>
                                </div>
                            
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-justify">PAID</h2>
                                <h2 className="text-[8px] text-white/70  font-medium tracking-[0.1em] text-justify">33% of total patients</h2>
                            </div>
                        </div>

                        <div className="w-full h-[90px] flex flex-col items-center justify-center px-2 py-4 gap-3 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-[18px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">2</h2>
                                </div>
                            
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-justify">Unpaid (Denied)</h2>
                                <h2 className="text-[8px] text-white/70  font-medium tracking-[0.1em] ">Claims rejected by PhilHealth</h2>
                            </div>
                        </div>

                        <div className="w-full h-[90px] flex flex-col items-center justify-center px-2 py-4 gap-3 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-[18px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">6</h2>
                                </div>
                            
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-justify">Pending</h2>
                                <h2 className="text-[8px] text-white/70  font-medium tracking-[0.1em] ">Awaiting cutoff processing</h2>
                            </div>
                        </div>
                        

                        

                    </div>

                    <div className="w-full border-b border-gray-300 mt-5"></div>
                    

                    {/* pie chart */}
                    <div className="w-full flex flex-col items-start justify-center h-[260px] gap-2 ">
                        <div className="w-full flex items-center justify-start">
                            <div className=" flex items-center justify-start py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40">
                                <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                                <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]">DISTRIBUTION</h2>
                            </div>
                        </div> 

                        <div className="w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={200}>
                                <PieChart>
                                    <Pie data={pieDataStatus} dataKey="value" nameKey="name" innerRadius={18} outerRadius={54} paddingAngle={3} cornerRadius={6} cx="50%" cy="50%">
                                        {pieDataStatus.map((entry, index) => (
                                            <Cell key={index} fill={PIECOLORSTATUS[index % PIECOLORSTATUS.length]} />
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
                                            transform: "translateY(10px)"
                                        }}
                                        formatter={(value) => <span style={{ color: "#000" }}>{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col  items-start justify-start gap-2 mb-2  gap-5"> 
                    <div className="flex  items-center justify-start gap-5">
                        <div className="flex items-center justify-start"> 
                            {/* cards */}
                            <div className="w-full flex flex-col  items-center justify-between gap-4 ">
                                <div className="w-full flex items-center justify-start">
                                    <div className=" flex items-center justify-center py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40">
                                        <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                                        <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]"> PAYMENT STATUS </h2>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-center gap-5">
                                
                                <div className="w-[135px] h-[130px] flex flex-col items-center justify-center px-4 py-4 gap-2 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                                    <div className="w-full flex flex-col items-center justify-center gap-2">
                                        <div className="flex items-center justify-center p-1 rounded-xl shadow-xl bg-white/40 backdrop-blur-md border border-white/45">
                                            <CurrencyDollarIcon className="h-5 w-5 text-black" />
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <h2 className="text-[14px] text-black whitespace-nowrap font-semibold tracking-[0.1em]">12</h2>
                                        </div>
                                    
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center ">
                                        <h2 className="text-[10px] text-black  font-semibold tracking-[0.1em] text-center">Total Patients</h2>
                                        <h2 className="text-[9px] text-gray-800  font-medium tracking-[0.1em] text-center">All treatment records</h2>
                                    </div>
                                </div>
                                
                                <div className="w-[135px] h-[130px] flex flex-col items-center justify-center px-4 py-4 gap-2 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                                    <div className="w-full flex flex-col items-center justify-center gap-2">
                                        <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                            <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <h2 className="text-[14px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">12</h2>
                                        </div>
                                    
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center ">
                                        <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-center">Approved</h2>
                                        <h2 className="text-[9px] text-white/60  font-medium tracking-[0.1em] text-center">33% approval rate</h2>
                                    </div>
                                </div>

                                <div className="w-[135px] h-[130px] flex flex-col items-center justify-center px-4 py-4 gap-2 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                                    <div className="w-full flex flex-col items-center justify-center gap-2">
                                        <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                            <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <h2 className="text-[14px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">2</h2>
                                        </div>
                                    
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center ">
                                        <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-center">Denied</h2>
                                        <h2 className="text-[9px] text-white/60  font-medium tracking-[0.1em] text-center">Claims need review</h2>
                                    </div>
                                </div>

                                <div className="w-[135px] h-[130px] flex flex-col items-center justify-center px-4 py-4 gap-2 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-red-900/40 hover:border-red-900/40 transition-all duration-300 text-white">
                                    <div className="w-full flex flex-col items-center justify-center gap-2">
                                        <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                            <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <h2 className="text-[14px] text-white whitespace-nowrap font-semibold tracking-[0.1em]">6</h2>
                                        </div>
                                    
                                    </div>
                                    <div className="w-full flex flex-col items-center justify-center ">
                                        <h2 className="text-[10px] text-white/80  font-semibold tracking-[0.1em] text-center">Pending Review</h2>
                                        <h2 className="text-[8px] text-white/60  font-medium tracking-[0.1em] text-center">Awaiting PhilHealth decision</h2>
                                    </div>
                                </div>
                            </div>


                                            <div className="w-full flex items-center justify-start mt-5 gap-2">
                                                <div className="w-1 h-6 rounded-full bg-[#1b4486]"></div>
                                    <h2 className="text-[11px] font-semibold text-[#1b4486] tracking-[0.1em]"> PAYMENT VERSUS APPROVAL COMPARISON </h2>
                                            </div>
                                

                                

                                

                            </div>
                        </div>

                        <div className="w-[270px] flex items-center justify-center">  
                            <div className="w-full flex flex-col items-start justify-center h-[230px] gap-3 mt-6 "> 
                                <div className="w-full flex flex-col p-4 items-center justify-center rounded-[20px] bg-white/20 backdrop-blur-md border border-white/40 shadow-lg">
                                    <div className="w-full flex items-center justify-start">
                                        <div className=" flex items-center justify-start py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40">
                                            <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                                            <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]">DISTRIBUTION</h2>
                                        </div>
                                    </div>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <PieChart>
                                            <Pie data={pieDataApproval} dataKey="value" nameKey="name" innerRadius={18} outerRadius={54} paddingAngle={3} cornerRadius={6} cx="45%" cy="50%">
                                                {pieDataApproval.map((entry, index) => (
                                                    <Cell key={index} fill={PIECOLORSAPPROVAL[index % PIECOLORSAPPROVAL.length]} />
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
                                                layout="vertical"
                                                verticalAlign="middle"
                                                align="right"
                                                iconType="circle"
                                                wrapperStyle={{
                                                    fontSize: "10px",
                                                    color: "#000",
                                                }}
                                                iconSize={8}
                                                formatter={(value) => (
                                                    <span style={{ color: "#000" }}>
                                                    {value}
                                                    </span>
                                                )}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="w-full h-[15rem] mt-4 flex items-center justify-center rounded-[20px] p-4 bg-white/20 backdrop-blur-md border border-white/40 shadow-lg">
                        <div className="w-full mt-4">
                            <ResponsiveContainer width="100%" height={180}>
                                <BarChart data={barData} barGap={6}>
                                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />

                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10, fill: "#000" }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    tick={{ fontSize: 10, fill: "#000" }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <Tooltip
                                    contentStyle={{
                                    background: "rgba(255,255,255,0.25)",
                                    backdropFilter: "blur(14px)",
                                    borderRadius: "12px",
                                    border: "1px solid rgba(255,255,255,0.35)",
                                    fontSize: "11px",
                                    }}
                                />

                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{
                                        fontSize: "10px",
                                        fontWeight: 500, // medium
                                        color: "#000",
                                    }}
                                    formatter={(value) => (
                                        <span style={{ fontSize: "10px", fontWeight: 500, color: "#000" }}>
                                        {value}
                                        </span>
                                    )}
                                />

                                <Bar
                                    dataKey="Payment"
                                    fill="#0c5148"
                                    radius={[6, 6, 0, 0]}
                                />

                                <Bar
                                    dataKey="Approval"
                                    fill="#1b4486"
                                    radius={[6, 6, 0, 0]}
                                />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                
                </div>

            </div> 
            {/* end:main contents */}
        </div>
    )
}