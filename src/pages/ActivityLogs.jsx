import { useState } from "react";
import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  BeakerIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  CalendarDaysIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import {
  Package,
  Pill,
  Syringe,
  Droplets,
  Scissors,
  Bandage,
  FlaskConical,
  UserIcon,
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
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { useDoctor } from "../context/DoctorContext";

export default function ActivityLogs() {
  const [search, setSearch] = useState("");
  const [openSearchStaff, setOpenSearchStaff] = useState(false);

  const { stafflogs, error, loading } = useDoctor();

  const totalStaff = stafflogs.length;

  const safeStaffLogs = stafflogs || [];

  const totalHours = safeStaffLogs.reduce((sum, s) => {
    const hours = parseFloat(s.hours) || 0;
    return sum + hours;
  }, 0);

  const doctors = safeStaffLogs.filter(
    (s) => s.role?.toLowerCase() === "doctor",
  ).length;
  const nurses = safeStaffLogs.filter(
    (s) => s.role?.toLowerCase() === "nurses",
  ).length;
  const others = safeStaffLogs.filter((s) => {
    const role = s.role?.toLowerCase();
    return role !== "doctor" && role !== "nurses";
  }).length;

  const filterStaffs = safeStaffLogs.filter((staff) => {
    const term = search.toLowerCase().trim();

    const fullName = (
      staff.name ||
      `${staff.firstName || ""} ${staff.middleName || ""} ${staff.lastName || ""}`
    )
      .toLowerCase()
      .trim();

    const role = (staff.role || "").toLowerCase();

    return fullName.includes(term) || role.includes(term);
  });

  return (
    <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar mr-5">
      <div className="w-full flex items-center justify-between mt-2 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-[12px] font-semibold uppercase">
              Clinic Staff Activity Logs
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-5">
        {/* card 1 */}
        <div className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px]  bg-gradient-to-br from-white/40 via-white/20 to-white/10  backdrop-blur-2xl border border-gray-200  shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group">
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/30 border border-white/20 shadow-inner">
            <ClockIcon className="h-7 w-7 text-blue-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              {" "}
              total hours
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {totalHours} Hrs
            </h2>
          </div>
        </div>

        {/* card 2 */}
        <div className="relative flex items-center justify-between px-4 py-4 gap-3 rounded-[5px]  bg-gradient-to-br from-white/40 via-white/20 to-white/10  backdrop-blur-2xl border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden group">
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/30 border border-white/20 shadow-inner">
            <UserGroupIcon className="h-7 w-7 text-green-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              All Staffs
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {totalStaff}
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
            <BeakerIcon className="h-7 w-7 text-red-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              Doctors
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {doctors}
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
            <AcademicCapIcon className="h-7 w-7 text-yellow-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] font-semibold tracking-[0.15em] text-gray-600 uppercase">
              nurses
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {nurses}
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
          <div className="flex items-center justify-center p-2 rounded-lg bg-white/30 border border-white/20 shadow-inner">
            <WrenchScrewdriverIcon className="h-7 w-7 text-gray-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] text-gray-600 uppercase font-semibold">
              others
            </h2>

            <h2 className="text-[15px] font-semibold text-gray-900">
              {others}
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-[12px] font-semibold text-black uppercase">
            Staff Shifting Schedule
          </h2>

          <div className="flex items-center gap-2">
            <div
              onClick={() => setOpenSearchStaff(true)}
              className="flex items-center justify-center py-1 px-4 rounded-[5px] 
                            bg-blue-500 border-[1px] border-gray-900/10 
                            hover:bg-blue-300 hover:border-white/10 cursor-pointer"
            >
              <h2 className="text-[10px] font-medium text-white tracking-[0.1em]">
                {" "}
                SEARCH{" "}
              </h2>
              <MagnifyingGlassIcon className="w-3 h-3 ml-2 text-white" />
            </div>

            {openSearchStaff && (
              <input
                autoFocus
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Patient name..."
                className="text-[10px] font-medium rounded-[5px] border border-[#1b4486]/20  px-3 py-1 outline-none transition-all duration-300 ease-in-out w-48"
              />
            )}
          </div>
        </div>

        {!loading &&
          !error &&
          (filterStaffs || []).map((item, i) => {
            const bgStyle =
              i % 4 === 0
                ? "bg-gradient-to-br from-indigo-100/70 to-white/60"
                : i % 4 === 1
                  ? "bg-gradient-to-br from-green-100/70 to-white/60"
                  : i % 4 === 2
                    ? "bg-gradient-to-br from-yellow-100/70 to-white/60"
                    : "bg-gradient-to-br from-purple-100/70 to-white/60";

            return (
              <div
                key={i}
                className={`w-full rounded-xl p-5 
                ${bgStyle}
                backdrop-blur-2xl 
                border border-white/40 
                shadow-[0_10px_40px_rgba(0,0,0,0.12)]
                hover:shadow-[0_12px_50px_rgba(0,0,0,0.18)]
                transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 shadow-md">
                      <UserIcon className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <div className="text-[15px] font-semibold text-gray-900 tracking-wide">
                        {item.name}
                      </div>
                      <div className="text-[10px] font-semibold uppercase text-gray-500 tracking-wider">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[18px] font-bold text-indigo-600">
                      {item.hours}h
                    </div>
                    <div className="text-[10px] uppercase text-gray-400 font-semibold tracking-wider">
                      Total Hours
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-semibold text-gray-600 mb-2 uppercase tracking-wider">
                    Patients Attended ({item.patientList?.length || 0})
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {(item.patientList || []).map((p, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between 
                        bg-white/80 backdrop-blur-md 
                        border border-gray-200 
                        rounded-lg px-3 py-2 
                        shadow-sm hover:shadow-md transition"
                      >
                        <span className="text-[12px] text-gray-800 font-medium">
                          {p.name}
                        </span>
                        <span className="text-[11px] text-indigo-600 font-semibold">
                          {item.hours}h
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] text-gray-600 font-semibold mb-2 uppercase tracking-wider">
                    Daily Activities
                  </div>

                  {item.activities && item.activities.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.activities.map((a, idx) => (
                        <div
                          key={idx}
                          className="text-[11px] font-medium px-3 py-1.5 
                          rounded-full 
                          bg-gradient-to-r from-gray-100 to-gray-200 
                          text-gray-700 
                          border border-gray-200 
                          shadow-sm hover:scale-105 transition"
                        >
                          {a.text}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[11px] italic text-gray-400">
                      No daily activities
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
