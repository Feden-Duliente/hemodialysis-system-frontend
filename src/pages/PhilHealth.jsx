import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  CheckBadgeIcon,
  XCircleIcon,
  ClockIcon,
  UserGroupIcon,
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
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

const barData = [
  { name: "Paid", Payment: 8, Approval: 6 },
  { name: "Unpaid", Payment: 4, Approval: 2 },
  { name: "Pending", Payment: 6, Approval: 4 },
  { name: "Pending Review", Payment: 2, Approval: 0 },
  { name: "Approved", Payment: 7, Approval: 8 },
  { name: "Denied", Payment: 1, Approval: 2 },
];

const pieDataApproval = [
  { name: "Paid", value: 500 },
  { name: "UnPaid", value: 300 },
  { name: "Pending", value: 700 },
];

const PIECOLORSAPPROVAL = ["#02367b", "#006ca4", "#0496c7"];
const PIECOLORSTATUS = ["#052e1f", "#085f47", "#0d7658"];

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
  const ActiveLabel = ({ x, y, width, value, payload }) => {
    if (!payload?.isMax) return null;

    return (
      <g>
        <rect
          x={x + width / 2 - 65}
          y={y - 35}
          width={130}
          height={24}
          rx={8}
          fill="#6366F1"
        />
        <text
          x={x + width / 2}
          y={y - 18}
          fill="#fff"
          textAnchor="middle"
          fontSize={12}
          fontWeight={500}
        >
          {" "}
          {value} – {payload?.name} – Today{" "}
        </text>
        <polygon
          points={` ${x + width / 2 - 6},${y - 11} ${x + width / 2 + 6},${y - 11} ${x + width / 2},${y - 2} `}
          fill="#6366F1"
        />
      </g>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  p-8 no-scrollbar mr-">
      {/* head */}
      <div className="w-full flex items-center justify-between mt-5 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex items-center justify-center gap-3 ">
            {/* <div className="w-[5px] h-8 bg-green-900 rounded-full"></div> */}
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-[11px] font-semibold tracking-[0.1em]">
                PHILHEALTH PAYMENT & APPROVAL STATUS
              </h2>
              {/* <h2 className="text-[10px] text-[#064e3b] font-semibold tracking-[0.1em]">PhilHealth processes claims biweekly. Treatments in current cutoff period (<span className="text-[#770e0e]">16th</span> - <span className="text-[#770e0e]">30th</span>) are pending approval. Cutoff ends on <span className="text-[#770e0e]">April 30, 2026</span>.</h2> */}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-stretch justify-start mt-2 gap-2">
        {/* PAID */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold text-green-800 ">PAID</span>
            <span className="text-[20px] text-black font-bold leading-tight">
              4
            </span>
            <span className="text-[10px] text-green-800 font-semibold break-words ">
              33% of total patients
            </span>
          </div>
        </div>

        {/* UNPAID */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold text-green-800">
              UNPAID (Denied)
            </span>
            <span className="text-[20px] text-black font-bold">2</span>
            <span className="text-[10px] text-green-800 font-semibold break-words ">
              Claims rejected by PhilHealth
            </span>
          </div>
        </div>

        {/* PENDING */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold text-green-800">
              PENDING
            </span>
            <span className="text-[20px] text-black font-bold">6</span>
            <span className="text-[10px] text-green-800 font-semibold break-words">
              Awaiting cutoff processing
            </span>
          </div>
        </div>

        {/* APPROVED */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold text-green-800 ">
              APPROVED
            </span>
            <span className="text-[20px] text-black font-bold">4</span>
            <span className="text-[10px] text-green-800 font-semibold break-words">
              33% approval rate
            </span>
          </div>
        </div>

        {/* DENIED */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold text-green-800 tracking-[0.12em]">
              DENIED
            </span>
            <span className="text-[20px] text-black font-bold">2</span>
            <span className="text-[10px] text-green-800 font-semibold break-words">
              Claims need review
            </span>
          </div>
        </div>

        {/* PENDING REVIEW */}
        <div
          className="relative flex-1 h-[95px] px-3 py-2 rounded-[5px]
 bg-white border border-gray-900/10
  shadow-[0_10px_35px_rgba(0,0,0,0.12)]
  overflow-hidden"
        >
          <div className="flex flex-col justify-center h-full">
            <span className="text-[10px] font-bold uppercase text-green-800">
              Pending Review
            </span>
            <span className="text-[20px] text-black font-bold">6</span>
            <span className="text-[10px] text-green-800 font-semibold break-words">
              Awaiting PhilHealth decision
            </span>
          </div>
        </div>
      </div>

      {/* header */}
      <div className="w-full flex items-center justify-center mt-4">
        <div className="w-1/2 flex items-center gap-2">
          {/* <div className="w-1 h-5 bg-gradient-to-b from-green-700 to-green-400 rounded-full"></div> */}
          <h2 className="text-[12px] font-semibold text-gray-800 capitalize">
            Daily Patients List
          </h2>
        </div>

        <div className="w-1/2 flex items-center gap-2 ml-7">
          {/* <div className="w-1 h-5 bg-gradient-to-b from-green-700 to-green-400 rounded-full"></div> */}
          <h2 className="text-[12px] font-semibold text-gray-800 capitalize">
            Daily Supplies Consumption
          </h2>
        </div>
      </div>

      {/* start: main contents */}
      <div className="w-full flex-1 min-h-0 flex items-center justify-between gap-5 mt-4 ">
        <div className="w-1/2 flex items-center justify-center gap-2 mb-2  gap-5">
          <div className="w-full flex  items-center justify-start gap-5">
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center h-[230px] gap-3  ">
                <div className="w-full flex border-[1px] border-gray-200 flex-col p-4 items-center justify-center rounded-[5px] bg-white/20 backdrop-blur-md  shadow-lg">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieDataApproval}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={88}
                        paddingAngle={3}
                        cornerRadius={6}
                        cx="45%"
                        cy="50%"
                      >
                        {pieDataApproval.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={
                              PIECOLORSAPPROVAL[
                                index % PIECOLORSAPPROVAL.length
                              ]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value, name) => [
                          `₱${value.toLocaleString()}`,
                          name,
                        ]}
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
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "12px",
                          color: "#000",
                          transform: "translateX(-50px)", // 👈 move LEFT (negative = closer to chart)
                        }}
                        formatter={(value) => (
                          <span style={{ color: "#000" }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-center gap-2 mb-2  gap-5">
          <div className="w-full flex  items-center justify-start gap-5">
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex flex-col items-start justify-center h-[230px] gap-3  ">
                <div className="w-full flex flex-col p-4 items-center justify-center rounded-[5px] bg-white/20 backdrop-blur-md border-[1px] border-gray-200 shadow-lg">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieDataApproval}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={88}
                        paddingAngle={3}
                        cornerRadius={6}
                        cx="45%"
                        cy="50%"
                      >
                        {pieDataApproval.map((entry, index) => (
                          <Cell
                            key={index}
                            fill={
                              PIECOLORSAPPROVAL[
                                index % PIECOLORSAPPROVAL.length
                              ]
                            }
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value, name) => [
                          `₱${value.toLocaleString()}`,
                          name,
                        ]}
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
                        iconSize={10}
                        wrapperStyle={{
                          fontSize: "12px",
                          color: "#000",
                          transform: "translateX(-50px)",
                        }}
                        formatter={(value) => (
                          <span style={{ color: "#000" }}>{value}</span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* header */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full flex items-center gap-2 mt-4">
          <h2 className="text-[12px] font-semibold text-gray-800 capitalize">
            Daily Supplies Consumption
          </h2>
        </div>
      </div>

      <div className="w-full h-[15rem] mt-4 flex items-center justify-center rounded-[5px] p-4 bg-white/20 backdrop-blur-md border-[1px] border-gray-200 shadow-lg">
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
                  <span
                    style={{ fontSize: "10px", fontWeight: 500, color: "#000" }}
                  >
                    {value}
                  </span>
                )}
              />

              <Bar
                dataKey="Payment"
                fill="#11651f"
                // radius={[6, 6, 0, 0]}
              />

              <Bar
                dataKey="Approval"
                fill="blue"
                // radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* end:main contents */}
    </div>
  );
}
