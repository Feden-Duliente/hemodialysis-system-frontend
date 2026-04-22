import { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUpIcon, CurrencyDollarIcon, XMarkIcon    } from "@heroicons/react/24/solid";
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


const getIcon = (type) => {
  switch (type) {
    case "dialyzer":
      return <Package className="w-3 h-3 text-blue-900" />;
    case "tubing":
      return <Droplets className="w-3 h-3 text-blue-900" />;
    case "medication":
      return <Pill className="w-3 h-3 text-blue-900" />;
    default:
      return <Scissors className="w-3 h-3 text-blue-900" />;
  }
};

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
  { name: "Dialyzer", value: 500 },
  { name: "Tubing", value: 300 },
  { name: "Dialysate", value: 700 },
  { name: "Heparin", value: 200 },
  { name: "Saline", value: 150 },
  { name: "Needle", value: 100 },
  { name: "Gauze", value: 80 },
  { name: "Tape", value: 60 },
];

const PIECOLORS = [
  "#052e1f", 
  "#064e3b", 
  "#065f46", 
  "#047857", 
  "#10b981", 
  "#34d399", 
  "#6ee7b7", 
  "#d1fae5", 
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


export default function Home() {
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
                          <h2 className="text-[11px] font-semibold tracking-[0.1em]">DAILY PATIENT REPORT</h2>
                          <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">Summary of 12 patients, treatments, and financial record for April 14, 2026.</h2>
                      </div>
                  </div>
              </div>
            </div>

            {/* cards */}
            <div className="w-full  flex items-center justify-start gap-5">

                {/* card 1 */}
                <div className="flex items-center justify-between px-4 py-3 gap-4 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-blue-800 hover:border-white/25 transition-all duration-300 text-white">
                    <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex flex-col items-start justify-center leading-tight w-full">
                      <h2 className="text-[11px] tracking-wide text-white whitespace-nowrap"> SALES TODAY </h2> 
                      <h2 className="text-[16px] font-semibold tracking-tight text-white whitespace-nowrap"> ₱44, 000.00 </h2> 
                    </div> 
                </div>

                {/* card 2 */}
                <div className="flex items-center justify-between px-4 py-3 gap-4 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#0c5148]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-800 hover:border-white/25 transition-all duration-300 text-white">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md  border border-white/10"> 
                    <CurrencyDollarIcon className="h-6 w-6 text-white" /> 
                  </div>
                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                    <h2 className="text-[11px] tracking-wide text-white whitespace-nowrap"> ALL PATIENTS </h2> 
                    <h2 className="text-[18px] font-semibold tracking-tight text-white whitespace-nowrap"> 12 </h2> 
                  </div>
                </div>

                {/* card 3 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px]  bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/20  hover:border-green-900/20  transition-all duration-300 text-white">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10"> 
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-800" /> 
                  </div> 
                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                    <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> COMPLETED </h2> 
                    <h2 className="text-[18px] font-semibold tracking-tight text-black whitespace-nowrap"> 8 </h2> 
                  </div> 
                </div>

                {/* card 4 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15  shadow-[0_10px_35px_rgba(0,0,0,0.12)]  hover:bg-green-900/20 hover:border-green-900/20 transition-all duration-300 text-white">
                    <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md  border border-white/10"> 
                      <CurrencyDollarIcon className="h-6 w-6 text-gray-800" /> 
                    </div> 
                    <div className="flex flex-col items-start justify-center leading-tight w-full">
                      <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> IN PROGRESS </h2> 
                      <h2 className="text-[18px] font-semibold tracking-tight text-black whitespace-nowrap"> 4 </h2> 
                    </div> 
                </div>

                {/* card 5 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/20 hover:border-green-900/20 transition-all duration-300 text-white">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-800" />
                  </div>

                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                    <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> SCHEDULED </h2>
                    <h2 className="text-[18px] font-semibold tracking-tight text-black whitespace-nowrap"> 7 </h2>
                  </div>

                </div>
            </div>

            {/* start: main contents */}
              {/* pie and bar chart */}
              <div className=" w-full flex items-center justify-center gap-5">

                {/* pie chart */}
                <div className="flex flex-col items-center justify-start w-1/3 h-[250px] gap-2 rounded-[20px] bg-white/20  backdrop-blur-md border border-white/40 shadow-lg p-4 ">
                  <div className="w-full flex items-center justify-start gap-3">
                    <div className="w-1 h-5 bg-green-800 rounded-full"></div>
                    <h2 className="text-[10px] font-semibold text-gray-800 tracking-wide"> TOTAL SALES  </h2>
                  </div>
                  <div className="w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>

                        <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={23} outerRadius={58} paddingAngle={3} cornerRadius={6} >
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

                {/* bar chart */}
                <div className="relative flex items-center justify-between w-2/3 h-[250px] rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg px-4 overflow-hidden">
                  <div className="absolute top-4 left-18 flex items-center  py-2 px-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg">
                    <h2 className="text-[10px] font-semibold text-gray-800 tracking-[0.1em]">
                      CONSUMPTION SUPPLY SETS
                    </h2>
                  </div>
                  <div className="h-full left-3  w-[50px] z-10 py-4">
                    <div className="h-full bg-blue-900 backdrop-blur-md border border-indigo-500/30 rounded-full shadow-lg flex flex-col justify-between items-center px-2 py-3 text-white text-[10px] font-medium">
                      <div>{maxToday}</div>
                      <div>{Math.round(maxToday * 0.8)}</div>
                      <div>{Math.round(maxToday * 0.6)}</div>
                      <div>{Math.round(maxToday * 0.4)}</div>
                      <div>{Math.round(maxToday * 0.2)}</div>
                      <div>0</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-full  h-[260px] rounded-[25px] px-4 py-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data}
                        barCategoryGap="25%"
                        barGap={6}
                        margin={{ top: 40 }}
                        onMouseMove={(state) => {
                          if (!state.isTooltipActive) return;
                          const d = state.activePayload?.[0]?.payload;
                          if (!d) return;
                          setActive({ x: state.chartX, value: d.today, name: d.name, });
                        }}
                        onMouseLeave={() => setActive(null)}
                      >

                        <Tooltip
                          formatter={(value, name) => [ `${value.toLocaleString()}`, name, ]}
                          contentStyle={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.35)", fontSize: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.08)", color: "#000", }}
                          itemStyle={{ color: "#000" }}
                          labelStyle={{ color: "#000", fontWeight: 500 }}
                          cursor={{ fill: "rgba(0,0,0,0.05)" }}
                        />

                        <Legend
                          verticalAlign="top"
                          align="center"
                          iconType="circle"
                          wrapperStyle={{ fontSize: 11, paddingBottom: 10 }}
                        />

                        <XAxis
                          dataKey="name"
                          axisLine={{ stroke: "#94989e", strokeWidth: 1 }} 
                          tickLine={false}
                          tick={{ fontSize: 10, fill: "#505868" }}
                        />

                        <YAxis hide domain={[0, maxToday]} />

                        <Bar
                          dataKey="today"
                          fill="#0c5148"
                          radius={[999, 999, 999, 999]}
                          barSize={17}
                        >
                          <LabelList content={<ActiveLabel />} />
                        </Bar>

                        <Bar
                          dataKey="yesterday"
                          fill="#1b4486"
                          radius={[999, 999, 999, 999]}
                          barSize={17}
                        />

                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* table and line chart */}
              <div className="w-full h-[15.5rem] flex items-center justify-between gap-5 ">

                {/* table */}
                <div className="w-2/3 h-full rounded-[25px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-4 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-green-800 rounded-full"></div>
                    <h2 className="text-[10px] font-semibold  text-black tracking-[0.1em]"> DAILY CONSUMPTION SUPPLIES </h2>
                  </div>
                  <div className="w-full grid grid-cols-3 text-[10px] font-medium tracking-[0.1em] text-white bg-[#0c5148] flex items-center rounded-[3px] justify-center shadow-xl py-2 place-items-center text-center">
                    <div>NAME</div>
                    <div>TIME</div>
                    <div >STATUS</div>
                  </div>
                  <div className="flex flex-col gap-1 text-[10px] text-gray-800 overflow-y-auto custom-scrollbar gap-2 text-[9px] px-3 mt-2">
                    {[
                      { name: "JUAN DELA CRUZ", time: "08:00", status: "Completed" },
                      { name: "Maria Santos", time: "08:30", status: "Completed" },
                      { name: "Roberto Garcia", time: "09:00", status: "Completed" },
                      { name: "Rosa Reyes", time: "09:30", status: "Completed" },
                      { name: "Miguel Ramos", time: "10:00", status: "Completed" },
                      { name: "Jennifer Torres", time: "10:30", status: "Completed" },
                      { name: "William Cruz", time: "11:00", status: "Completed" },
                      { name: "Elena Mendoza", time: "11:30", status: "Completed" },
                    ].map((item, i) => (
                      <div key={i} className="w-full grid grid-cols-3 items-center text-center  hover:bg-green-900/20 hover:border-green-900/20 transition rounded-[12px] px-3 py-2 ">
                        <div className="font-medium">{item.name}</div>
                        <div className="text-gray-600">{item.time}</div>
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-green-900 font-semibold bg-green-900/40 !text-[9px] backdrop-blur-md border border-white/20 shadow-lg py-1 px-3 rounded-full">{item.status}</span>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
                
                {/* line chart */}
                <div className="w-1/2 flex flex-col items-center justify-between gap-2">
                  <div className="relative w-full h-full py-4 px-5 rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between mb-5">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-1 h-5 bg-green-800 rounded-full"></div>
                        <h2 className="text-[10px] font-semibold text-gray-800 tracking-wide"> TOTAL SALES </h2>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-700">
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#064e3b]"></span> Today
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-[#0c4a6e]"></span> Yesterday
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-full h-[180px]">
                      <ResponsiveContainer width="100%" height="100%"> 
                        <AreaChart data={linedata}> 
                          <defs> 
                            <linearGradient id="todayFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#064e3b" stopOpacity={0.95} />
                              <stop offset="40%" stopColor="#065f46" stopOpacity={0.75} />
                              <stop offset="100%" stopColor="#022c22" stopOpacity={0.2} />
                            </linearGradient>

                            <linearGradient id="yesterdayFill" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#0c4a6e" stopOpacity={0.95} />
                              <stop offset="40%" stopColor="#075985" stopOpacity={0.75} />
                              <stop offset="100%" stopColor="#082f49" stopOpacity={0.2} />
                            </linearGradient>
                          </defs>

                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255,255,255,0.12)"
                            vertical={false}
                          />

                          <XAxis
                            dataKey="time"
                            stroke="#6b7280"
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            axisLine={{ stroke: "rgba(0,0,0,0.08)" }}
                            tickLine={false}
                          />

                          <YAxis
                            stroke="#6b7280"
                            tick={{ fontSize: 10, fill: "#6b7280" }}
                            axisLine={false}
                            tickLine={false}
                          />
  
                          <Tooltip
                            contentStyle={{ background: "rgba(255,255,255,0.25)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.35)", fontSize: "12px", color: "#000", boxShadow: "0 12px 30px rgba(0,0,0,0.12)",  }}
                            itemStyle={{ color: "#000" }}
                            labelStyle={{ color: "#000", fontWeight: 600 }}
                            cursor={{ stroke: "rgba(6,78,59,0.25)", strokeWidth: 1 }}
                          />
  
                          <Area
                            type="monotone"
                            dataKey="today"
                            stroke="#064e3b"
                            strokeWidth={2.8}
                            fill="url(#todayFill)"
                          />
  
                          <Area
                            type="monotone"
                            dataKey="yesterday"
                            stroke="#0c4a6e"
                            strokeWidth={2.5}
                            fill="url(#yesterdayFill)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* consumtptions */}
              <div className="w-full grid grid-cols-2 flex items-center justify-center gap-5 ">

                {/* supplies consumption */}
                <div className="w-full  rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl p-4"> 
                  <div className="flex item-center justify-start px-4 bg-[#0c5148] py-2 shadow-xl rounded-[3px] mb-2 gap-3">
                    <div className="w-1 h-5 bg-white rounded-full"></div>
                    <h2 className="text-[10px] font-semibold  text-white tracking-[0.1em] mt-1"> DAILY CONSUMPTION SUPPLIES </h2>
                  </div> 
                  <div className="flex grid grid-cols-2 items-start justify-center gap-3 h-[260px] overflow-y-auto  mt-4 custom-scrollbar">

                      <div className="h-[50px] w-[230px] flex items-center justify-between rounded-[15px]  bg-white/20 backdrop-blur-xl border border-white/25 shadow-lg px-4 py-2 hover:bg-green-900/40 hover:border-green-900/40">
                        <div className="flex items-center justify-center gap-3">
                          <div className="flex items-center justify-center bg-red-900 p-2 rounded-full gap-3">
                            <CurrencyDollarIcon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex flex-col items-start justify-center">
                              <h2 className="text-black font-semibold text-[10px] tracking-[0.1em]">High-flux Dialyze</h2>
                              <h2 className="text-gray-700 font-semibold text-[8px] tracking-[0.1em]">Dialyzer</h2>
                            </div>
                        </div>

                          <div className="flex flex-col items-center justify-center">
                            <h2 className="text-black font-semibold text-[10px] tracking-[0.1em] text-center">12</h2>
                            <h2 className="text-gray-700 font-semibold text-[8px] tracking-[0.1em] text-center">pieces</h2>
                          </div>
                      </div>
                      
                  </div> 
                </div> 

                {/*  sales */}
                <div className="w-full rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl p-4"> 
                  <div className="flex item-center justify-start px-4 bg-[#0c5148] py-2 shadow-xl rounded-[3px] mb-2 gap-3">
                    <div className="w-1 h-5 bg-white rounded-full"></div>
                    <h2 className="text-[10px] font-semibold  text-white tracking-[0.1em] mt-1"> TOTAL DAILY SALES - SUPPLIES CONSUMPTION </h2>
                  </div> 

                  <div className="flex item-center justify-center grid grid-cols-2 gap-4 h-[260px] overflow-y-auto px-3 mt-4 custom-scrollbar"> 
                    

                     <div className="h-[110px] flex flex-col items-center justify-center gap-2 rounded-[15px]   bg-white/20 backdrop-blur-xl border border-white/25 shadow-lg p-4 hover:bg-green-900/40 hover:border-green-900/20">
                      <div className="w-full flex items-center justify-between gap-2">
                        <div className="flex items-center justify-center bg-red-900 p-2 rounded-full ">
                          <CurrencyDollarIcon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col items-end justify-end">
                          <h2 className="text-black font-semibold text-[10px] tracking-[0.1em] text-left">High-flux Dialyzer</h2>
                          <h2 className="text-gray-700 font-medium text-[10px] tracking-[0.1em] text-left">12 pieces</h2>
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-between">
                        
                          <h2 className="text-gray-700 font-medium text-[10px] tracking-[0.1em] text-left">Dialyzer</h2>
                          <div className="w-1 h-1 rounded-full bg-[#0c5148]"></div>
                          <h2 className="text-gray-700 font-medium text-[10px] tracking-[0.1em] text-left">₱1, 200.00 per piece</h2>
                      </div>

                      <div className="w-full flex items-center justify-between ">
                        
                          <h2 className="text-gray-700 font-medium text-[9px] tracking-[0.1em] text-left">TOTAL COST</h2>
                          <h2 className="text-[#0c5148] font-semibold text-[12px] tracking-[0.1em] text-left">₱15, 200.00 </h2>
                      </div>
                      
                      
                    </div>

                     
                  </div>
                </div>
              </div>
            {/* end:main contents */}
        </div>
    )
}