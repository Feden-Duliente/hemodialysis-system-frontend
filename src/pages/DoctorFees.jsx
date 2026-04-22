import { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUpIcon, CurrencyDollarIcon   } from "@heroicons/react/24/solid";
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
  "#02367b", 
  "#006ca4", 
  "#0496c7", 
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


export default function DoctorFees() {
  const [openDownload, setOpenDownload] = useState(false);
    
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
        <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar mr-5">

            {/* head */}
            <div className="w-full flex items-center justify-between mt-2 ">
              <div className="flex items-start justify-center gap-3">
                  <div className="flex items-center justify-center gap-3 ">
                      <div className="w-[5px] h-8 bg-green-900 rounded-full"></div>
                      <div className="flex flex-col items-start justify-center">
                          <h2 className="text-[11px] font-semibold tracking-[0.1em]">DOCTOR PROFESSIONAL FEES REPORT</h2>
                          <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">Professional fees for five doctors attending 18 patients today</h2>
                      </div>
                  </div>
              </div>
            </div>

            {/* start: main contents */}

                {/* cards, table and pie chart */}
                <div className=" w-full flex items-center justify-center gap-5">

                    {/* cards */}
                    <div className="flex grid grid-cols-2 items-center justify-between  h-[250px] gap-2 w-2/7 ">

                        {/* card 1 */}
                        <div className="w-full flex flex-col items-center justify-center px-2 py-3 gap-2 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-blue-900/40 hover:border-blue-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-end justify-center">
                                    <h2 className="text-[11px] font-medium tracking-[0.1em] text-white whitespace-nowrap"> ₱833,600.00  </h2>
                                </div>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h2 className="text-[9px]   text-white whitespace-nowrap font-medium tracking-[0.1em]">PROFESSIONAL FEES</h2> 
                                <h2 className="text-[9px]   text-white/70 whitespace-nowrap tracking-[0.1em]">5 doctors</h2> 
                                <h2 className="text-[9px]   text-white/70 whitespace-nowrap tracking-[0.1em]">18 patients</h2> 
                            </div>
                        </div>

                         {/* card 2 */}
                        <div className="w-full h-[103px] flex flex-col items-center justify-between px-2 py-3 gap-2 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/40 hover:border-green-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-end justify-center">
                                    <h2 className="text-[12px] font-medium tracking-[0.1em] text-white whitespace-nowrap"> ₱7,200.00  </h2>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[9px]   text-white whitespace-nowrap font-medium tracking-[0.1em]">PAID</h2> 
                                <h2 className="text-[9px]   text-white/70 whitespace-nowrap tracking-[0.1em]">5 doctors</h2> 
                            </div>
                        </div>


                        {/* card 3 */}
                        <div className="w-full h-[103px] flex flex-col items-center justify-between px-2 py-3 gap-2 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/40 hover:border-green-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-end justify-center">
                                    <h2 className="text-[12px] font-medium tracking-[0.1em] text-white whitespace-nowrap"> ₱14,200.00  </h2>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[9px]   text-white whitespace-nowrap font-medium tracking-[0.1em]">PROCCESSED</h2> 
                                <h2 className="text-[9px]   text-white/70 whitespace-nowrap tracking-[0.1em]">1 doctor</h2> 
                            </div>
                        </div>
                        
                        {/* card 4 */}
                        <div className="w-full h-[103px] flex flex-col items-center justify-between px-2 py-3 gap-2 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/40 hover:border-green-900/40 transition-all duration-300 text-white">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                                    <CurrencyDollarIcon className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex items-end justify-center">
                                    <h2 className="text-[12px] font-medium tracking-[0.1em] text-white whitespace-nowrap"> ₱11,800.00  </h2>
                                </div>
                            </div>
                            <div className="w-full flex flex-col items-start justify-center">
                                <h2 className="text-[9px]   text-white whitespace-nowrap font-medium tracking-[0.1em]">PENDING</h2> 
                                <h2 className="text-[9px]   text-white/70 whitespace-nowrap tracking-[0.1em]">2 doctors</h2> 
                            </div>
                        </div>
                    </div>

                    {/* contribution bar */}
                    <div className=" w-4/7 flex flex-col items-start justify-start  h-[250px] rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg px-5 py-4 overflow-hidden gap-2">
                        <div className=" flex items-center justify-center  py-1 px-3 gap-2 rounded-full  backdrop-blur-xl border border-green-900/20 shadow-xl bg-green-900/40 ">
                        <div className="w-1 h-4 rounded-full bg-[#0c5148]"></div>
                        <h2 className="text-[9px] font-semibold text-[#0c5148] tracking-[0.1em]"> CONSUMPTION SUPPLY SETS </h2>
                        </div>

                        <div className="w-full  mx-auto flex flex-col gap-3">

                            {/* Header */}
                            <div className="w-full flex items-center justify-between rounded-[3px] bg-[#0c5148] px-12 py-2 shadow-lg">
                                <h2 className="text-[10px] font-medium text-white"> DOCTOR </h2>
                                <h2 className="text-[10px] font-medium text-white"> SPECIALTY </h2>
                                <h2 className="text-[10px] font-medium text-white"> CONTRIBUTION </h2>
                            </div>

                            {/* Content */}
                            <div className="max-h-[150px] overflow-y-auto  custom-scrollbar flex flex-col items-center justify-center px-4 gap-2">
                                {doctorsData.map((doctor, index) => { const percentage = (doctor.contribution / doctor.total) * 100;

                                    // color logic
                                    const barColor = percentage <= 50 ? "bg-[#1b4486]" : "bg-[#0c5148]";

                                    return (
                                        <div key={index} className="w-full flex items-start justify-between px-3  " >
                                            <h2 className="text-[9px] font-medium text-black w-1/3"> {doctor.name} </h2> 
                                            <h2 className="text-[9px] font-medium text-black text-left w-1/3"> {doctor.specialty} </h2>

                                            <div className="relative group w-[170px] h-[8px] rounded-full overflow-visible bg-gray-900/20 mt-[3px]">
                                                <div className="h-full rounded-full overflow-hidden " >
                                                    <div className={`h-full ${barColor} transition-all duration-500 rounded-full`} style={{ width: `${percentage}%` }} />
                                                </div>
                                                <div className="absolute right-[50px]  top-8 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50">
                                                    <div className="px-4 py-3 text-[10px] text-white bg-[#1b4486]  rounded-md shadow-lg whitespace-nowrap"> {doctor.name}: {percentage.toFixed(1)}% </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    
                    {/* pie chart */}
                    <div className="flex flex-col items-start justify-center w-1/5 h-[250px] gap-2 rounded-[20px] bg-white/20  backdrop-blur-md border border-white/40 shadow-lg p-4 ">
                        <div className=" flex items-center justify-center  py-1 px-3 gap-2 rounded-full  backdrop-blur-xl border border-blue-900/20 shadow-xl bg-blue-900/40 ">
                            <div className="w-1 h-4 rounded-full bg-[#1b4486]"></div>
                            <h2 className="text-[9px] font-semibold text-[#1b4486] tracking-[0.1em]"> TOTAL SALES </h2>
                        </div>

                        <div className="w-full flex items-center justify-center">
                            <ResponsiveContainer width="100%" height={160}>
                                <PieChart>

                                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={18} outerRadius={48} paddingAngle={3} cornerRadius={6} cx="50%" cy="55%" >
                                    {pieData.map((entry, index) => ( <Cell key={index} fill={PIECOLORS[index % PIECOLORS.length]} /> ))}
                                </Pie>

                                <Tooltip 
                                    formatter={(value, name) => [ `₱${value.toLocaleString()}`, name, ]}
                                    contentStyle={{ background: "rgba(255, 255, 255, 0.25)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderRadius: "12px",  border: "1px solid rgba(255, 255, 255, 0.35)", fontSize: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", color: "#000", }}
                                    itemStyle={{ color: "#000", }}
                                    labelStyle={{ color: "#000", fontWeight: 500, }}
                                    cursor={{ fill: "rgba(59,130,246,0.08)" }} 
                                />

                                <Legend
                                    layout="horizontal"
                                    verticalAlign="bottom"
                                    align="center"
                                    iconType="circle"
                                    wrapperStyle={{ fontSize: "10px", paddingTop: "10px", transform: "translateY(17px)", color: "#000",  }}
                                    formatter={(value) => ( <span style={{ color: "#000" }}>{value}</span> )}
                                />

                                </PieChart>
                            </ResponsiveContainer>
                        </div> 
                    </div>
                
                </div>
            
                {/* bar and side chart */}
                <div className="w-full h-[15.5rem] flex items-center justify-between gap-5 ">

                    {/* bar chart */}
                    <div className="w-2/3 h-full rounded-[25px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg py-4 px-5 flex flex-col">
                        <div className="relative z-10 flex items-center justify-between mb-2">
                            <div className=" flex items-center justify-center  py-1 px-3 gap-2 rounded-full  backdrop-blur-xl border border-green-900/20 shadow-xl bg-green-900/40 ">
                                <div className="w-1 h-4 rounded-full bg-[#0c5148]"></div>
                                <h2 className="text-[9px] font-semibold text-[#0c5148] tracking-[0.1em]"> TOTAL SALES  </h2>
                            </div>
                        </div>
                    
                        <div className="w-full h-[220px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={[
                                        { name: "Jennifer Cortez", fees: 2000 },
                                        { name: "Ricardo Santos", fees: 4000 },
                                        { name: "Maria Lim", fees: 3000 },
                                        { name: "Antonio Reyes", fees: 6000 },
                                        { name: "Elena Cruz", fees: 4500 },
                                    ]}
                                    margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
                                >
                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    angle={-25}
                                    textAnchor="end"
                                    interval={0}
                                    axisLine={{ stroke: "#9e9a9a" }}
                                    tickLine={false}
                                />

                                <YAxis
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                    domain={[0, 7000]}
                                />

                                <Tooltip
                                    contentStyle={{
                                    background: "rgba(255,255,255,0.25)",
                                    backdropFilter: "blur(16px)",
                                    borderRadius: "14px",
                                    border: "1px solid rgba(255,255,255,0.35)",
                                    fontSize: "12px",
                                    color: "#000",
                                    }}
                                    itemStyle={{ color: "#000" }}
                                    labelStyle={{ color: "#000", fontWeight: 600 }}
                                />

                                <Bar
                                    dataKey="fees"
                                    fill="#1b4486"
                                    barSize={65}
                                    radius={[4, 4, 0, 0]}
                                />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    {/* side bar chart */}
                    <div className="w-1/2 flex flex-col items-center justify-between gap-2">
                    <div className="relative w-full h-full py-4 px-5 rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg overflow-hidden">
                        <div className="relative z-10 flex items-center justify-between mb-2">
                            <div className=" flex items-center justify-center  py-1 px-3 gap-2 rounded-full  backdrop-blur-xl border border-green-900/20 shadow-xl bg-green-900/40 ">
                                <div className="w-1 h-4 rounded-full bg-[#0c5148]"></div>
                                <h2 className="text-[9px] font-semibold text-[#0c5148] tracking-[0.1em]">
                                TOTAL SALES
                                </h2>
                            </div>
                        </div>
                        <div className="relative z-10 w-full h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={[
                                    { name: "Nephrologist", value: 7200 },
                                    { name: "Nephrologist", value: 7800 },
                                    { name: "Internal Med", value: 5600 },
                                    { name: "Cardiologist", value: 6800 },
                                    { name: "Endocrinologist", value: 4500 },
                                ]}
                                layout="vertical"
                                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                            >
                                <defs>
                                    <linearGradient id="barFill" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#064e3b" stopOpacity={0.9} />
                                        <stop offset="100%" stopColor="#0c4a6e" stopOpacity={0.9} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.12)"
                                    horizontal={true}
                                    vertical={false}
                                />

                                <XAxis
                                    type="number"
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    axisLine={false}
                                    tickLine={false}
                                />

                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tick={{ fontSize: 10, fill: "#6b7280" }}
                                    axisLine={{ stroke: "#acafb5" }}
                                    tickLine={false}
                                    width={90}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "rgba(255,255,255,0.25)",
                                        backdropFilter: "blur(16px)",
                                        borderRadius: "14px",
                                        border: "1px solid rgba(255,255,255,0.35)",
                                        fontSize: "12px",
                                        color: "#000",
                                    }}
                                />

                                <Bar
                                    dataKey="value"
                                    fill="#0c5148"
                                    radius={[0, 3, 3, 0]}
                                    barSize={15}
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