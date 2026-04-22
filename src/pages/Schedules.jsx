import { useState } from "react";
import { createPortal } from "react-dom";
import { ChevronUpIcon, CurrencyDollarIcon, XMarkIcon ,UserIcon ,CheckCircleIcon ,
  HomeIcon,
  BeakerIcon,
  IdentificationIcon,
  CalendarDaysIcon, 
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/solid";
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
import wanglin from "../assets/wanglin.png"


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


function AvatarTooltip({ patient, children }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div
        className="relative"
        onMouseEnter={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setPos({
            x: rect.left + rect.width / 2,
            y: rect.top
          });
          setShow(true);
        }}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>

      {show &&
        createPortal(
          <div
            className="fixed z-[99999] px-3 py-2 rounded-lg bg-white/80 backdrop-blur-xl text-[10px] shadow-lg border border-white/40 pointer-events-none"
            style={{
              left: pos.x,
              top: pos.y,
              transform: "translate(-50%, -120%)"
            }}
          >
            <div className="font-medium">{patient.name}</div>
            <div className="text-gray-600">{patient.status}</div>
          </div>,
          document.body
        )}
    </>
  );
}



export default function Schedules() {
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
        <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar items-center">

            {/* head */}
            <div className="w-full flex items-center justify-between mt-2 ">
              <div className="flex items-start justify-center gap-3">
                  <div className="flex items-center justify-center gap-3 ">
                      <div className="w-[5px] h-8 bg-green-900 rounded-full"></div>
                      <div className="flex flex-col items-start justify-center">
                          <h2 className="text-[11px] font-semibold tracking-[0.1em]">Staff Shifting Schedule</h2>
                          <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">Maximum 4 shifts per staff, 3 patients per shift.</h2>
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
                        <h2 className="text-[16px] font-semibold tracking-tight text-white whitespace-nowrap">4</h2> 
                        <h2 className="text-[11px] tracking-wide text-white whitespace-nowrap"> Staff Members </h2>
                    </div> 
                </div>

                {/* card 2 */}
                <div className="flex items-center justify-between px-4 py-3 gap-4 rounded-[14px] bg-[#0c5148] backdrop-blur-2xl border border-[#0c5148]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-800 hover:border-white/25 transition-all duration-300 text-white">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md  border border-white/10"> 
                    <CurrencyDollarIcon className="h-6 w-6 text-white" /> 
                  </div>
                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                        <h2 className="text-[16px] font-semibold tracking-tight text-white whitespace-nowrap">13 / 16</h2> 
                        <h2 className="text-[11px] tracking-wide text-white whitespace-nowrap"> Total Shifts </h2>
                    </div>
                </div>

                {/* card 3 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px]  bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/20  hover:border-green-900/20  transition-all duration-300 text-white">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10"> 
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-800" /> 
                  </div> 
                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                        <h2 className="text-[16px] font-semibold tracking-tight text-black whitespace-nowrap">39</h2> 
                        <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> Total Patiests </h2>
                    </div> 
                </div>

                {/* card 4 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15  shadow-[0_10px_35px_rgba(0,0,0,0.12)]  hover:bg-green-900/20 hover:border-green-900/20 transition-all duration-300 text-black">
                    <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md  border border-white/10"> 
                      <CurrencyDollarIcon className="h-6 w-6 text-gray-800" /> 
                    </div> 
                    <div className="flex flex-col items-start justify-center leading-tight w-full">
                        <h2 className="text-[16px] font-semibold tracking-tight text-black whitespace-nowrap">28</h2> 
                        <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> Completed</h2>
                    </div> 
                </div>

                {/* card 5 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/20 hover:border-green-900/20 transition-all duration-300 text-black">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-800" />
                  </div>

                  <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                        <h2 className="text-[16px] font-semibold tracking-tight text-black whitespace-nowrap">6</h2> 
                        <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> Ongoing</h2>
                  </div>

                </div>

                {/* card 6 */}
                <div className="flex items-center justify-between  px-4 py-3 gap-4 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-green-900/20 hover:border-green-900/20 transition-all duration-300 text-black">
                  <div className="flex items-center justify-center p-3 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                    <CurrencyDollarIcon className="h-6 w-6 text-gray-800" />
                  </div>

                    <div className="flex flex-col items-start justify-center leading-tight w-full"> 
                        <h2 className="text-[16px] font-semibold tracking-tight text-black whitespace-nowrap">5</h2> 
                        <h2 className="text-[11px] tracking-wide text-black whitespace-nowrap"> Scheduled</h2>
                    </div>

                </div>
            </div>

            {/* start: main contents */}
            <div className="w-full flex items-start justify-start grid grid-cols-2 gap-5">
               <div className="w-full flex flex-col items-center justify-center px-4 py-3 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
 
                  <div className="w-full flex items-center justify-between border-b border-gray-900/10 py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={wanglin} className="w-15 h-15 rounded-full object-cover border border-gray-200" alt="" />
                      <div className="flex flex-col gap-[2px]">
                        <h2 className="text-black font-semibold text-[14px]">Sarah Dimaculangan</h2>
                        <h2 className="text-blue-800 font-medium text-[12px]">Nurse</h2>
                        <h2 className="text-gray-800 font-medium text-[10px]">ID: Staff-001</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">2 Shifts</h2>
                      </div>

                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">6 Patients</h2>
                      </div>
                    </div>
                  </div>
  
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-[10px]">

                      <thead className="bg-[#1b4486] backdrop-blur-xl">
                        <tr className="border-b border-gray-900/10 text-white/90">
                          <th className="py-2 px-2 text-left font-medium text-[9px]">#</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Shift</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Time</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Patients</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Status</th>
                        </tr>
                      </thead>

                      <tbody> 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold">
                              1
                            </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr> 

                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 2 </div>
                          </td>

                          <td className="px-2 text-gray-600">Afternoon Shift</td>
                          <td className="px-2 text-gray-600">13:00 - 17:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Anna Dizon", status: "Completed" },
                                { name: "Sophia Garcia", status: "Completed" },
                                { name: "Isabella Tan", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="w-full flex flex-col items-center justify-center px-4 py-3 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
                  {/* header */}
                  <div className="w-full flex items-center justify-between border-b border-gray-900/10 py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={wanglin} className="w-15 h-15 rounded-full object-cover border border-gray-200" alt="" />
                      <div className="flex flex-col gap-[2px]">
                        <h2 className="text-black font-semibold text-[14px]">Sarah Dimaculangan</h2>
                        <h2 className="text-blue-800 font-medium text-[12px]">Nurse</h2>
                        <h2 className="text-gray-800 font-medium text-[10px]">ID: Staff-001</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">2 Shifts</h2>
                      </div>

                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">6 Patients</h2>
                      </div>
                    </div>
                  </div>

                  {/* table */}
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-[10px]">

                      <thead className="bg-[#1b4486] backdrop-blur-xl">
                        <tr className="border-b border-gray-900/10 text-white/90">
                          <th className="py-2 px-2 text-left font-medium text-[9px]">#</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Shift</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Time</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Patients</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Status</th>
                        </tr>
                      </thead>

                      <tbody>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 2 </div>
                          </td>

                          <td className="px-2 text-gray-600">Afternoon Shift</td>
                          <td className="px-2 text-gray-600">13:00 - 17:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Anna Dizon", status: "Completed" },
                                { name: "Sophia Garcia", status: "Completed" },
                                { name: "Isabella Tan", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="w-full flex flex-col items-center justify-center px-4 py-3 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
                  {/* header */}
                  <div className="w-full flex items-center justify-between border-b border-gray-900/10 py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={wanglin} className="w-15 h-15 rounded-full object-cover border border-gray-200" alt="" />
                      <div className="flex flex-col gap-[2px]">
                        <h2 className="text-black font-semibold text-[14px]">Sarah Dimaculangan</h2>
                        <h2 className="text-blue-800 font-medium text-[12px]">Nurse</h2>
                        <h2 className="text-gray-800 font-medium text-[10px]">ID: Staff-001</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">2 Shifts</h2>
                      </div>

                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">6 Patients</h2>
                      </div>
                    </div>
                  </div>

                  {/* table */}
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-[10px]">

                      <thead className="bg-[#1b4486] backdrop-blur-xl">
                        <tr className="border-b border-gray-900/10 text-white/90">
                          <th className="py-2 px-2 text-left font-medium text-[9px]">#</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Shift</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Time</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Patients</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Status</th>
                        </tr>
                      </thead>

                      <tbody>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 2 </div>
                          </td>

                          <td className="px-2 text-gray-600">Afternoon Shift</td>
                          <td className="px-2 text-gray-600">13:00 - 17:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Anna Dizon", status: "Completed" },
                                { name: "Sophia Garcia", status: "Completed" },
                                { name: "Isabella Tan", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                </div>

                <div className="w-full flex flex-col items-center justify-center px-4 py-3 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)]">
                  {/* header */}
                  <div className="w-full flex items-center justify-between border-b border-gray-900/10 py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img src={wanglin} className="w-15 h-15 rounded-full object-cover border border-gray-200" alt="" />
                      <div className="flex flex-col gap-[2px]">
                        <h2 className="text-black font-semibold text-[14px]">Sarah Dimaculangan</h2>
                        <h2 className="text-blue-800 font-medium text-[12px]">Nurse</h2>
                        <h2 className="text-gray-800 font-medium text-[10px]">ID: Staff-001</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">2 Shifts</h2>
                      </div>

                      <div className="flex items-center rounded-lg p-2 bg-black/10 backdrop-blur-2xl border border-gray-200 shadow-xl gap-3">
                        <CalendarDaysIcon className="h-4 w-4 text-gray-700" />
                        <h2 className="font-medium text-gray-700 text-[10px]">6 Patients</h2>
                      </div>
                    </div>
                  </div>

                  {/* table */}
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-[10px]">

                      <thead className="bg-[#1b4486] backdrop-blur-xl">
                        <tr className="border-b border-gray-900/10 text-white/90">
                          <th className="py-2 px-2 text-left font-medium text-[9px]">#</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Shift</th>
                          <th className="py-2 px-2 text-left font-medium text-[9px] uppercase">Time</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Patients</th>
                          <th className="py-2 px-2 text-center font-medium text-[9px] uppercase">Status</th>
                        </tr>
                      </thead>

                      <tbody>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>
 
                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 2 </div>
                          </td>

                          <td className="px-2 text-gray-600">Afternoon Shift</td>
                          <td className="px-2 text-gray-600">13:00 - 17:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Anna Dizon", status: "Completed" },
                                { name: "Sophia Garcia", status: "Completed" },
                                { name: "Isabella Tan", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                        <tr className="border-b border-gray-900/5">
                          <td className="py-2 px-2">
                            <div className="h-6 w-6 flex items-center justify-center bg-[#1b4486] rounded-[2px] text-white text-[10px] font-semibold"> 1 </div>
                          </td>

                          <td className="px-2 text-gray-600">Morning Shift</td>
                          <td className="px-2 text-gray-600">08:00 - 12:00</td>

                          <td className="px-2">
                            <div className="flex justify-center gap-2">

                              {[
                                { name: "Liam Santos", status: "Completed" },
                                { name: "Noah Reyes", status: "Completed" },
                                { name: "Ethan Cruz", status: "Completed" }
                              ].map((patient, i) => (
                                <AvatarTooltip key={i} patient={patient}>
                                  <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(patient.name)}`}
                                    className="w-6 h-6 rounded-full cursor-pointer"
                                    alt="avatar"
                                  />
                                </AvatarTooltip>
                              ))}

                            </div>
                          </td>

                          <td className="px-2">
                            <div className="flex justify-center">
                              <div className="flex items-center py-1 px-2 gap-1 bg-green-500/20 border border-green-500/20 rounded-full">
                                <CheckCircleIcon className="w-4 h-4 text-green-800" />
                                <span className="text-green-800 font-medium">Completed</span>
                              </div>
                            </div>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

                </div>

    
    
            </div>
            {/* end: main contents */}

            
        </div>
    )
}