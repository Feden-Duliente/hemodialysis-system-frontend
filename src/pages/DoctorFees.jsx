import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  BanknotesIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  BeakerIcon,
  CpuChipIcon,
  CubeIcon,
  UserIcon,
  Cog8ToothIcon,
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
import { useDoctor } from "../context/DoctorContext";

const specialtyFeesData = [
  { name: "Nephrologist", value: 18200 },
  { name: "Cardiologist", value: 14650 },
  { name: "Endocrinologist", value: 11200 },
  { name: "Neurologist", value: 9800 },
  { name: "Internal Med", value: 13500 },
  { name: "Urologist", value: 7600 },
  { name: "Pulmonologist", value: 8900 },
];

const pieData = [
  { name: "Pending", value: 500 },
  { name: "In Progress", value: 300 },
  { name: "Pending", value: 700 },
];

const PIECOLORS = ["#2563eb", "#16a34a", "#f59e0b"];

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

export default function DoctorFees() {
  const { stafflogs, loading, error } = useDoctor();

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
    <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar mr-5">
      {/* head */}
      <div className="w-full flex items-center justify-between mt-2 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-[12px] font-semibold text-gray-800 uppercase">
                doctor professional fees report
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-4">
        {/* card 2 */}
        <div
          className="relative w-full px-5 py-4 rounded-[5px]
                    bg-gradient-to-br from-white/50 via-white/20 to-white/10
                    backdrop-blur-2xl border border-white/25
                    shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                    overflow-hidden transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-2">
              <BanknotesIcon className="h-7 w-7 text-emerald-600" />
              <span className="text-[10px]  text-gray-500 uppercase font-medium ">
                total fees
              </span>
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                ₱33,200.00
              </span>
              <span className="text-[10px] font-medium text-gray-500 ">
                7 doctors
              </span>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div
          className="relative w-full px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-white/25
                      shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                      overflow-hidden transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-1">
              <CheckCircleIcon className="h-7 w-7 text-green-600" />
              <span className="text-[10px]  text-gray-500 uppercase font-medium ">
                Paid
              </span>
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                ₱7,200.00
              </span>
              <span className="text-[10px] font-medium text-gray-500 ">
                5 doctors
              </span>
            </div>
          </div>
        </div>

        {/* card 3 */}
        <div
          className="relative w-full px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-white/25
                      shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                      overflow-hidden transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start gap-1">
              <Cog6ToothIcon className="h-7 w-7 text-blue-600" />
              <span className="text-[10px]  text-gray-500 uppercase font-medium ">
                Processed
              </span>
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                ₱14,200.00
              </span>
              <span className="text-[10px] font-medium  text-gray-500 ">
                1 doctor
              </span>
            </div>
          </div>
        </div>

        <div
          className="relative w-full px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-white/25
                      shadow-[0_10px_35px_rgba(0,0,0,0.12)]
                      overflow-hidden transition-all duration-300
                      hover:shadow-[0_14px_50px_rgba(0,0,0,0.18)]"
        >
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 bg-gradient-to-r from-yellow-400/10 to-transparent pointer-events-none" />

          <div className="flex items-start justify-between">
            <div className="flex flex-col items-start justify-between h-full gap-1">
              <ClockIcon className="h-7 w-7 text-amber-600" />

              <span className="text-[10px]  text-gray-500 uppercase font-medium ">
                Pending
              </span>
            </div>

            <div className="flex flex-col items-end justify-center text-right ">
              <span className="text-[18px] font-semibold text-gray-900 tracking-tight">
                ₱11,800.00
              </span>

              <span className="text-[10px] font-medium text-gray-500 ">
                2 doctors
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center gap-2">
        <h2 className="text-[12px] font-semibold text-gray-800  uppercase">
          doctor fee breakdown
        </h2>
      </div>

      <div className="w-full h-[500px] flex items-center justify-start gap-5">
        <div className="w-full h-full rounded-[5px] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl px-4 py-2 relative overflow-hidden flex flex-col min-h-0">
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 py-4 patient-scroll flex flex-col gap-2">
            {!loading &&
              !error &&
              (stafflogs || []).map((item, i) => {
                return (
                  <div
                    key={`${item.role}-${item.id}-${i}`}
                    className="w-full flex items-center justify-center gap-1 rounded-[5px] p-4 border border-gray-600/20 shrink-0"
                  >
                    <div className="w-full flex items-center gap-2">
                      <div className="flex items-center justify-center bg-blue-800 p-2 rounded-[3px]">
                        <BeakerIcon className="h-9 w-9 text-white" />
                      </div>

                      <div className="flex flex-col items-start justify-center">
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-black font-semibold text-[12px] uppercase">
                            {item.name}
                          </div>

                          <div className="px-2 w-[70px] items-center flex justify-center py-1 bg-green-200 rounded-[5px] text-[9px] font-semibold text-green-800 uppercase border-[1px] border-green-400">
                            Paid
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2 mt-1">
                          <div className="flex flex-col items-start leading-tight">
                            <div className="flex items-center gap-2 text-[11px] text-gray-800 font-normal">
                              <div className="flex items-center gap-1">
                                <UserIcon className="h-3.5 w-3.5 text-gray-600" />
                                <span>
                                  {item.doctorType ||
                                    item.role ||
                                    "Not Specified"}
                                </span>
                              </div>

                              <span>•</span>

                              <div className="flex items-center gap-1">
                                <UserGroupIcon className="h-3.5 w-3.5 text-gray-600" />
                                <span>{item.patients} patients</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2 overflow-x-auto flex-nowrap">
                          <div className="px-2 shrink-0 whitespace-nowrap items-center flex justify-center bg-blue-200 rounded-[5px] py-[2px] text-[10px] font-normal text-blue-800 capitalize border-[1px] border-blue-300">
                            Hemodialysis Supervision
                          </div>

                          <div className="px-2 shrink-0 whitespace-nowrap items-center flex justify-center bg-blue-200 rounded-[5px] py-[2px] text-[10px] font-normal text-blue-800 capitalize border-[1px] border-blue-300">
                            Medical Assessment
                          </div>

                          <div className="px-2 shrink-0 whitespace-nowrap items-center flex justify-center bg-blue-200 rounded-[5px] py-[2px] text-[10px] font-normal text-blue-800 capitalize border-[1px] border-blue-300">
                            Treatment Plan Review
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-end gap-5">
                      <div className="w-[1.3px] h-[60px] bg-gray-900/10"></div>

                      <div className="flex flex-col items-end justify-center">
                        <CheckCircleIcon className="h-7 w-7 text-green-600" />
                        <h2 className="text-blue-800 font-bold  text-[20px]">
                          ₱7,200.00
                        </h2>
                        <h2 className="text-gray-800 font-normal text-[10px] ">
                          ₱1,500.00 per patient
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* start: main contents */}
      <div className="w-full flex  items-center justify-between">
        <div className="w-1/3 flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-gray-800  uppercase">
            Fee Status Distribution
          </h2>
        </div>

        <div className="w-2/3 ml-5 flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-gray-800  uppercase">
            Fees by Specialty
          </h2>
        </div>
      </div>
      <div className=" w-full flex items-center justify-center gap-5">
        <div className="w-1/3 flex flex-col items-start justify-center  gap-2 rounded-[5px] bg-white/20  backdrop-blur-md border border-white/40 shadow-lg p-4 ">
          <div className="w-full h-[230px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={68}
                  paddingAngle={3}
                  cornerRadius={6}
                  cx="50%"
                  cy="55%"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={PIECOLORS[index % PIECOLORS.length]}
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
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{
                    fontSize: "10px",
                    paddingTop: "10px",
                    transform: "translateY(17px)",
                    color: "#000",
                  }}
                  formatter={(value) => (
                    <span style={{ color: "#000" }}>{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* bar chart */}
        <div className="w-2/3 h-full rounded-[5px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg py-4 px-5 flex flex-col">
          <div className="w-full h-[220px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={specialtyFeesData}
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

                <Bar dataKey="value" fill="#2563eb" barSize={55} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center gap-2">
        <h2 className="text-[12px] font-semibold text-gray-800  uppercase">
          Doctor Fees Comparison
        </h2>
      </div>

      {/* bar and side chart */}
      <div className="w-full h-[18rem] flex items-center justify-between gap-5 ">
        {/* bar chart */}
        <div className="w-full h-full rounded-[5px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg py-4 px-5 flex flex-col">
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

                <Bar dataKey="fees" fill="#16a34a" barSize={65} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* end:main contents */}
    </div>
  );
}
