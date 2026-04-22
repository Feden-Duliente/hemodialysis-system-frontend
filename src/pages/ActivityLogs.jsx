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
     RadialBarChart,
  RadialBar,
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

const activityData = [
  { name: "Monitoring", value: 38, fill: "#0c5148" },
  { name: "Medication", value: 25, fill: "#1b4486" },
  { name: "Equipment", value: 22, fill: "#2364ce" },
  { name: "Consultation", value: 15, fill: "#60a5fa" },
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



const PIECOLORS = [
  "#02367b", 
  "#006ca4", 
  "#0496c7", 
];






export default function ActivityLogs() {
  const [active, setActive] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleRow = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const staffData = [
    {
      name: "Sarah Dimaculangan",
      role: "nurse",
      hours: "17h",
      patients: [
        "Juan dela Cruz 4.5h",
        "Maria Santos 4h",
        "Roberto Garcia 4.5h",
        "Rosa Reyes 4h",
      ],
      activities: [
        "Pre-dialysis assessment",
        "Medication administration",
        "Patient monitoring",
        "Post-dialysis care",
      ],
    },
    {
      name: "Miguel Santiago",
      role: "technician",
      hours: "17h",
      patients: [
        "Miguel Ramos 4h",
        "Jennifer Torres 4.5h",
        "William Cruz 4h",
        "Elena Mendoza 4.5h",
      ],
      activities: [
        "Machine setup",
        "Equipment maintenance",
        "Water treatment monitoring",
        "Technical support",
      ],
    },
    {
      name: "Dr. Jennifer Cortez",
      role: "doctor",
      hours: "4h",
      patients: [
        "David Flores 1h",
        "Linda Bautista 1.5h",
        "Jose Aquino 0.5h",
        "Barbara Villanueva 1h",
      ],
      activities: [
        "Medical consultation",
        "Treatment plan review",
        "Emergency response",
        "Clinical documentation",
      ],
    },
  ];

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
          <div className=" w-full flex items-center justify-start gap-5">

            {/* cards wrapper */}
            <div className="w-2/7 h-[150px] grid grid-rows-2 gap-y-4 mb-7">

              <div className="grid grid-cols-2 gap-2">

                {/* card 1 */}
                <div className="w-full h-[70px] flex flex-col items-start justify-center px-2 py-3 gap-3 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-blue-900/40 hover:border-blue-900/40 transition-all duration-300 text-white">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center justify-start">
                      <h2 className="text-[14px] font-semibold tracking-[0.1em] text-white whitespace-nowrap"> 57 </h2>
                    </div>
                  </div>

                  <h2 className="text-[9px] text-left text-white whitespace-nowrap font-medium tracking-[0.1em]"> TOTAL HOURS </h2>
                </div>

                {/* card 2 */}
                <div className="w-full h-[70px] flex flex-col items-start justify-center px-2 py-3 gap-3 rounded-[14px] bg-[#1b4486] backdrop-blur-2xl border border-[#1b4486]/15 shadow-[0_10px_35px_rgba(0,0,0,0.12)] hover:bg-blue-900/40 hover:border-blue-900/40 transition-all duration-300 text-white">
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex items-center justify-start">
                      <h2 className="text-[14px] font-semibold tracking-[0.1em] text-white whitespace-nowrap"> 5 </h2>
                    </div>
                  </div>

                  <h2 className="text-[9px] text-left text-white whitespace-nowrap font-medium tracking-[0.1em]"> ALL STAFFS </h2>
                </div>

              </div>

              <div className="grid grid-cols-3 gap-3">

                {/* CARD 3 */}
                <div className="w-[90px] h-[103px] flex flex-col items-center justify-center px-2 py-3 gap-2 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 text-black">

                  <div className="flex flex-col items-center justify-center">

                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-5 w-5 text-black" />
                    </div>

                    <h2 className="text-[14px] font-semibold tracking-[0.1em] text-black mt-2">
                      2
                    </h2>

                    <h2 className="text-[9px] text-black whitespace-nowrap font-medium tracking-[0.1em]">
                      NURSES
                    </h2>

                  </div>
                </div>

                {/* CARD 4 */}
                <div className="w-[90px] h-[103px] flex flex-col items-center justify-center px-2 py-3 gap-2 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 text-black">
                  <div className="flex flex-col items-center justify-center"> 
                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-5 w-5 text-black" />
                    </div> 
                    <h2 className="text-[14px] font-semibold tracking-[0.1em] text-black mt-2"> 2  </h2> 
                    <h2 className="text-[9px] text-black whitespace-nowrap font-medium tracking-[0.1em]"> NURSES </h2> 
                  </div>
                </div>

                {/* CARD 4 */}
                <div className="w-[90px] h-[103px] flex flex-col items-center justify-center px-2 py-3 gap-2 rounded-[14px] bg-white/30 backdrop-blur-2xl border border-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 text-black">
                  <div className="flex flex-col items-center justify-center"> 
                    <div className="flex items-center justify-center p-1 rounded-xl shadow-lg bg-white/10 backdrop-blur-md border border-white/10">
                      <CurrencyDollarIcon className="h-5 w-5 text-black" />
                    </div> 
                    <h2 className="text-[14px] font-semibold tracking-[0.1em] text-black mt-2"> 2 </h2> 
                    <h2 className="text-[9px] text-black whitespace-nowrap font-medium tracking-[0.1em]"> NURSES </h2> 
                  </div>
                </div>

              </div>

            </div>

            {/* table */}
            <div className="w-2/3 h-[290px] rounded-[25px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg p-4 flex flex-col">

              <div className="flex items-center gap-2 mb-3 flex-shrink-0">
                <div className="w-1 h-5 bg-green-800 rounded-full"></div>
                <h2 className="text-[10px] font-semibold text-black tracking-[0.1em]"> STAFF ACTIVITY LOGS </h2>
              </div>
 
              <div className="flex-shrink-0 w-full grid grid-cols-4 text-[10px] font-medium tracking-[0.1em] text-white bg-[#0c5148] rounded-[3px] shadow-xl py-2 text-center">
                <div>NAME</div>
                <div>ROLE</div>
                <div>HOURS</div>
                <div>PATIENTS</div>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar mt-2">

                {staffData.map((item, i) => {
                  const isOpen = openIndex === i;

                    return (
                      <div key={i} className="flex flex-col"> 
                        <div onDoubleClick={() => toggleRow(i)} className="w-full grid grid-cols-4 items-center text-center hover:bg-green-900/20 transition rounded-[12px] px-3 py-2 cursor-pointer text-[10px]" >
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-gray-600 capitalize">{item.role}</div>
                          <div className="text-gray-700 font-medium">{item.hours}</div>
                          <div className="text-gray-600">{item.patients.length}</div>
                        </div> 
                        <div className={` overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[200px] opacity-100 mt-2 px-12" : "max-h-0 opacity-0"} `} >
                          <div className="flex justify-center"> 
                            <div className="w-[90%] px-3 py-3 rounded-[12px] bg-white/20 border border-white/10 text-[10px]"> 
                              <div className="grid grid-cols-2 gap-4"> 
                                <div className="ml-4">
                                  <h2 className="font-semibold text-[#0c5148] tracking-[0.1em] mb-2"> PATIENTS </h2> 
                                  <div className="flex flex-col gap-[2px] text-black text-[10px] font-medium">
                                    {item.patients.map((p, idx) => (
                                      <div key={idx} className="flex items-start gap-1">
                                        <span className="text-[#0c5148]">-</span>
                                        <span>{p}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
 
                                <div>
                                  <h2 className="font-semibold text-[#0c5148] tracking-[0.1em] mb-2"> DAILY ACTIVITIES </h2> 
                                  <div className="grid grid-cols-1 gap-[2px] text-black text-[10px] font-medium">
                                    {item.activities.map((a, idx) => (
                                      <div key={idx} className="flex items-start gap-1">
                                        <span className="text-[#0c5148]">-</span>
                                        <span>{a}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                              </div> 
                            </div> 
                          </div>
                        </div>
                     </div>
                    );
                })}

              </div>

            </div>
                          
          </div>
            
          <div className="w-full h-[15.5rem] flex items-center justify-between gap-5 ">

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

              <div className="w-1/3 flex flex-col items-center justify-between gap-2">

                <div className="relative w-full h-full py-4 px-5 rounded-[25px] bg-white/10 backdrop-blur-xl border border-white/25 shadow-lg overflow-hidden">

                  {/* header */}
                  <div className="relative z-10 flex items-center justify-between mb-2">

                    <div className="flex items-center justify-center py-1 px-3 gap-2 rounded-full backdrop-blur-xl border border-green-900/20 shadow-xl bg-green-900/40">
                      <div className="w-1 h-4 rounded-full bg-[#0c5148]"></div>
                      <h2 className="text-[9px] font-semibold text-[#0c5148] tracking-[0.15em] uppercase"> Activity Breakdown </h2>
                    </div>

                  </div>
  
                  <div className="relative z-10 w-full h-[180px]">

                    <ResponsiveContainer width="100%" height="100%"> 
                      <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="40%"
                        outerRadius="86%"
                        barSize={15}
                        data={activityData}
                      >
                        <Tooltip
                          contentStyle={{
                            fontSize: "10px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            border: "1px solid #e5e7eb"
                          }}
                          formatter={(value, name, props) => {
                            return [`${value}`, props.payload.name];
                          }}
                        />
    
                        <RadialBar
                          minAngle={10}
                          background
                          clockWise
                          dataKey="value"
                          cornerRadius={12}
                          fill="#0c5148"
                          background={{ fill: "#bebcbc" }} 
                        />
    
                        <text
                          x="50%"
                          y="55%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-[8px] fill-gray-700 font-medium"
                        >
                          Total Activities
                        </text>

                        <text
                          x="50%"
                          y="48%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-[12px] fill-[#0c5148] font-semibold"
                        >
                          100%
                        </text>

                      </RadialBarChart> 
                    </ResponsiveContainer>

                  </div>

                </div>
              </div>
          </div>
          {/* end:main contents */}
        </div>
    )
}