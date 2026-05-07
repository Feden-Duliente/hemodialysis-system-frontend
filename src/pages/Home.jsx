import { useState } from "react";
import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  XMarkIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  CalendarIcon,
  BeakerIcon,
  WrenchScrewdriverIcon,
  CpuChipIcon,
  CubeIcon,
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
import { useDashboard } from "../context/DashboardContext";
import { usePackages } from "../context/PackageContext";

export default function Home() {
  const { patients, totalPatients, statusCount } = useDashboard();
  const { fluids } = usePackages();

  const formatQty = (value) => {
    const num = parseFloat(String(value));
    return Number.isFinite(num) ? Math.floor(num) : 0;
  };

  // bar chart
  const barDataMap = {};

  for (const fluid of fluids || []) {
    const packageName = fluid.packageName || "Unknown";
    const items = fluid.packageDetails?.split("||") || [];

    if (!barDataMap[packageName]) {
      barDataMap[packageName] = {
        name: packageName,
        totalCost: 0,
      };
    }

    let packageTotal = 0;

    for (const item of items) {
      const parts = item.split("|");

      const get = (key) =>
        parts
          .find((p) => p.trim().startsWith(key))
          ?.split(":")[1]
          ?.trim();

      const qty = Number(get("Qty")) || 0;
      const price = Number(get("Price")) || 0;

      packageTotal += qty * price;
    }

    barDataMap[packageName].totalCost += packageTotal;
  }

  const barData = Object.values(barDataMap);

  const maxToday = Math.max(...barData.map((d) => d.totalCost || 0));

  const totalSales = barData.reduce((sum, item) => {
    return sum + (item.totalCost || 0);
  }, 0);

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

  const getPackageStyle = (name) => {
    const lower = name?.toLowerCase();

    if (lower.includes("dialyzer")) {
      return {
        icon: BeakerIcon,
        bg: "bg-blue-600",
        label: "Dialyzer",
      };
    }

    if (lower.includes("tubing")) {
      return {
        icon: WrenchScrewdriverIcon,
        bg: "bg-green-600",
        label: "Tubing",
      };
    }

    if (lower.includes("heparin") || lower.includes("saline")) {
      return {
        icon: CpuChipIcon,
        bg: "bg-red-600",
        label: "Medication",
      };
    }

    return {
      icon: CubeIcon,
      bg: "bg-green-900/10",
      label: "Other",
    };
  };

  return (
    <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar mr-5">
      {/* head */}
      <div className="w-full flex items-center justify-between mt-2 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-[12px] font-semibold text-gray-800  ">
                DAILY PATIENT REPORT
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* cards */}
      <div className="w-full flex items-center justify-start gap-5">
        {/* card 1 */}
        <div
          className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px] 
                      bg-gradient-to-br from-white/40 via-white/20 to-white/10 
                      backdrop-blur-2xl border border-gray-200
                      shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group"
        >
          <div
            className="flex items-center justify-center p-2 rounded-lg 
                        bg-white/30 border border-white/20 shadow-inner"
          >
            <CurrencyDollarIcon className="h-7 w-7 text-blue-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              Sales Today
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              ₱
              {totalSales.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>
        </div>

        {/* card 2 */}
        <div
          className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px] 
                      bg-gradient-to-br from-white/40 via-white/20 to-white/10 
                      backdrop-blur-2xl border border-gray-200
                      shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group"
        >
          <div
            className="flex items-center justify-center p-2 rounded-lg 
                        bg-white/30 border border-white/20 shadow-inner"
          >
            <UserGroupIcon className="h-7 w-7 text-green-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              All Patients
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {totalPatients || 0}
            </h2>
          </div>
        </div>

        {/* card 3 */}
        <div
          className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px] 
                      bg-gradient-to-br from-white/40 via-white/20 to-white/10 
                      backdrop-blur-2xl border border-gray-200
                      shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group"
        >
          <div
            className="flex items-center justify-center p-2 rounded-lg 
      bg-white/30 border border-white/20 shadow-inner"
          >
            <CheckCircleIcon className="h-7 w-7 text-green-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              Completed
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {statusCount.completed || 0}
            </h2>
          </div>
        </div>

        {/* card 4 */}
        <div
          className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px] 
                  bg-gradient-to-br from-white/40 via-white/20 to-white/10 
                  backdrop-blur-2xl border border-gray-200
                  shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group"
        >
          <div
            className="flex items-center justify-center p-2 rounded-lg 
                      bg-white/30 border border-white/20 shadow-inner"
          >
            <ClockIcon className="h-7 w-7 text-yellow-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] font-semibold tracking-[0.15em] text-gray-600 uppercase">
              In Progress
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {statusCount.inProgress || 0}
            </h2>
          </div>
        </div>

        {/* card 5 */}
        <div
          className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px] 
                      bg-gradient-to-br from-white/40 via-white/20 to-white/10 
                      backdrop-blur-2xl border border-gray-200
                      shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group"
        >
          <div
            className="flex items-center justify-center p-2 rounded-lg 
                      bg-white/30 border border-white/20 shadow-inner"
          >
            <CalendarIcon className="h-7 w-7 text-green-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] text-gray-600 uppercase font-semibold">
              Scheduled
            </h2>

            <h2 className="text-[15px] font-semibold text-gray-900">
              {statusCount.scheduled || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <h2 className="text-[12px] font-semibold text-gray-800  uppercase">
          consumption supplies
        </h2>
      </div>

      {/* start: main contents */}
      <div className=" w-full flex items-center justify-center gap-5">
        <div className="relative flex items-center justify-between w-full h-[250px] rounded-[5px] bg-white/10 backdrop-blur-xl border-[1px] border-gray-200 shadow-lg px-4 overflow-hidden">
          <div className="h-full left-3  w-[80px] z-10 py-4">
            <div className="h-full bg-red-800 backdrop-blur-md border border-indigo-500/30  shadow-lg flex flex-col justify-between items-center px-2 py-3 text-white text-[10px] font-medium">
              <div>{Math.floor(maxToday)}</div>
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
                data={barData}
                barCategoryGap="25%"
                barGap={6}
                margin={{ top: 40 }}
                onMouseMove={(state) => {
                  if (!state.isTooltipActive) return;
                  const d = state.activePayload?.[0]?.payload;
                  if (!d) return;
                  setActive({ x: state.chartX, value: d.today, name: d.name });
                }}
                onMouseLeave={() => setActive(null)}
              >
                <Tooltip
                  formatter={(value) => [
                    `₱${Number(value).toFixed(2)}`,
                    "TotalCost",
                  ]}
                  contentStyle={{
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.35)",
                    fontSize: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    color: "#000",
                  }}
                  itemStyle={{ color: "#000" }}
                  labelStyle={{ color: "#000", fontWeight: 500 }}
                  cursor={{ fill: "rgba(0,0,0,0.05)" }}
                />

                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: "#787b76", strokeWidth: 1 }}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#505868" }}
                />

                <YAxis hide domain={[0, maxToday]} />

                <Bar
                  dataKey="totalCost"
                  fill="#1e750e"
                  // radius={[8, 8, 0, 0]}
                  barSize={70}
                >
                  <LabelList content={<ActiveLabel />} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* header */}
      <div className="w-full flex items-center justify-center">
        <div className="w-1/2 flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-gray-800 uppercase">
            Daily Patients List
          </h2>
        </div>

        <div className="w-1/2 flex items-center gap-2 ml-7">
          <h2 className="text-[12px] font-semibold text-gray-800 uppercase">
            Daily Supplies Consumption
          </h2>
        </div>
      </div>

      {/* table  */}
      <div className="w-full h-[30rem] flex items-center justify-between gap-8 ">
        {/* table */}
        <div
          className="w-1/2 relative h-full rounded-[6px] 
                      bg-white/10 backdrop-blur-xl border-[1px] border-gray-200 shadow-lg
                      p-4 flex flex-col overflow-hidden"
        >
          {/* soft glow background */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* content */}
          <div className="w-full z-10 flex flex-col h-full">
            {/* rows */}
            <div className="w-full flex-1 min-h-0 flex flex-col  text-gray-800 overflow-y-auto mt-2 gap-2 scrollbar-hide patient-scroll ">
              {patients.map((item, i) => (
                <div
                  key={i}
                  className="w-full flex justify-between items-center text-center 
                              px-3 py-2 rounded-[5px] border-[1px] border-gray-600/20
                              hover:scale-105 transition-transform duration-200 hover:border-none
                              transition-all duration-200"
                >
                  {/* CODE */}

                  {/* NAME with user icon */}
                  <div className="flex items-center justify-center gap-2 font-medium text-gray-900 uppercase">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-900/10">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-7 h-7 text-blue-900"
                      >
                        <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6z" />
                      </svg>
                    </div>

                    <div className="flex flex-col items-start justify-center">
                      <span className="uppercase text-[11px] font-semibold">
                        {item.firstName} {item.lastName}
                      </span>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[9px] text-gray-700">
                          {item.code}
                        </span>
                        <span className="text-gray-500/50 font-normal text-[9px]">
                          |
                        </span>
                        <div className="font-medium text-gray-700 text-[9px]">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DATE */}

                  {/* STATUS */}
                  <div className="flex items-center justify-center">
                    <span
                      className={`text-[10px] font-medium px-4 py-1.5 rounded-[10px] capitalize border
              ${
                item.status === "completed"
                  ? "bg-green-100 text-green-700 border-green-200"
                  : item.status === "inprogress"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : item.status === "scheduled"
                      ? "bg-blue-300/50 text-blue-800 border-blue-300/70"
                      : "bg-gray-100 text-gray-600 border-gray-200"
              }`}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* supplies consumption */}
        {/* fluids table */}
        <div
          className="w-1/2 relative h-full rounded-[6px] 
  bg-white/10 backdrop-blur-xl border-[1px] border-gray-200 shadow-lg
  p-4 flex flex-col overflow-hidden"
        >
          {/* soft glow background */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* rows */}
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto scrollbar-hide flex flex-col gap-2 patient-scroll mt-2">
            {fluids?.map((fluid, i) =>
              fluid.packageDetails?.split("||")?.map((item, j) => {
                const parts = item.split("|");

                const get = (key) =>
                  parts
                    .find((p) => p.trim().startsWith(key))
                    ?.split(":")[1]
                    ?.trim();

                const style = getPackageStyle(fluid.packageName);
                const Icon = style.icon;

                return (
                  <div
                    key={`${i}-${j}`}
                    className="flex items-center justify-between px-4 py-2 rounded-[5px]
              border-[1px] border-gray-600/20
            hover:scale-105 transition-transform duration-200 hover:border-none
              transition-all duration-200 group"
                  >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-3">
                      {/* icon */}
                      <div
                        className={`p-2 rounded-[5px] ${style.bg} shadow-md`}
                      >
                        <Icon className="h-7 w-7 text-green-800" />
                      </div>

                      {/* text */}
                      <div className="flex flex-col ">
                        <h2 className="text-[10px] font-semibold text-gray-900 uppercase">
                          {get("Type") || "Unknown"}
                        </h2>

                        <h2 className="text-[9px] text-gray-700 uppercase font-medium">
                          {fluid.packageName}
                        </h2>
                      </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-col items-end">
                      <h2 className="text-[14px] font-semibold text-gray-900">
                        {formatQty(get("Qty")?.replace(/[^\d.]/g, ""))}
                      </h2>
                      <h2 className="text-[9px] text-gray-700 lowecaser font-medium">
                        pieces
                      </h2>
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center gap-2">
        {/* <div className="w-1 h-5 bg-gradient-to-b from-green-700 to-green-400 rounded-full"></div> */}
        <h2 className="text-[12px] font-semibold text-gray-800 uppercase">
          Total Daily Sales - Supplies Consumption
        </h2>
      </div>

      {/* consumtptions */}
      <div className="w-full h-[500px] flex items-center justify-start gap-5">
        {/* sales */}
        <div className="w-2/3 h-full  rounded-[5px] bg-white/10 backdrop-blur-2xl border-[1px] border-gray-200 shadow-xl px-4 py-2 relative overflow-hidden flex flex-col min-h-0">
          {/* soft glow background */}
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* FIXED SCROLL AREA (same pattern as working table) */}
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 py-4 patient-scroll flex flex-col gap-2">
            {fluids.map((fluid, i) =>
              fluid.packageDetails?.split("||")?.map((item, j) => {
                const parts = item.split("|");

                const get = (key) =>
                  parts
                    .find((p) => p.trim().startsWith(key))
                    ?.split(":")[1]
                    ?.trim();

                const price = parseFloat(
                  get("Price")?.replace(/[^\d.]/g, "") || 0,
                );
                const qty = parseFloat(get("Qty")?.replace(/[^\d.]/g, "") || 0);

                const totalCost = price * qty;
                const style = getPackageStyle(fluid.packageName);

                return (
                  <div
                    key={`${i}-${j}`}
                    className="w-full flex items-center justify-center gap-1 rounded-[5px] p-4 border-[1px] border-gray-600/20 shrink-0 hover:scale-105 transition-transform duration-200 hover:border-none"
                  >
                    <div className="w-full flex items-center justify-cneter gap-2">
                      <div
                        className={`${style.bg} flex items-center justify-center bg-green-900/10 p-2 rounded-[3px]`}
                      >
                        <BeakerIcon className="h-7 w-7 text-green-900" />
                      </div>

                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-black font-semibold text-[10px] text-left uppercase">
                          {get("Type") || "Unknown"}
                        </h2>

                        <div className="w-full flex items-center justify-between gap-2">
                          <h2 className="text-gray-800 font-medium text-[9px] text-left uppercase">
                            {fluid.packageName}
                          </h2>

                          <div className="w-1 h-1 rounded-full bg-[#0c5148]"></div>

                          <h2 className="text-gray-800 uppercase font-medium text-[9px] text-left">
                            ₱{price.toFixed(2)} per piece
                          </h2>
                        </div>
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-end gap-5">
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="text-gray-800 font-medium text-[9px]">
                          Quantity
                        </h2>
                        <h2 className="font-semibold text-[12px]">
                          {formatQty(get("Qty")?.replace(/[^\d.]/g, ""))}
                        </h2>
                        <h2 className="text-gray-800 font-medium text-[9px]">
                          pieces
                        </h2>
                      </div>

                      <div className="w-[1.3px] h-[40px] bg-gray-900/10"></div>

                      <div className="flex flex-col items-end justify-center">
                        <h2 className="text-gray-700 font-medium text-[9px] uppercase">
                          total cost
                        </h2>
                        <h2 className="text-green-700 uppercase font-semibold tracking-[0.1em] text-[18px] text-left">
                          ₱{totalCost.toFixed(2) || "0.00"}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              }),
            )}
          </div>
        </div>
      </div>
      {/* end:main contents */}
    </div>
  );
}
