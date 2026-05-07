import { useState } from "react";
import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  XMarkIcon,
  UserIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  BeakerIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  CalendarIcon,
  ArrowPathIcon,
  ClockIcon,
  PlayCircleIcon,
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

export default function Schedules() {
  const [search, setSearch] = useState("");
  const [openSearchStaff, setOpenSearchStaff] = useState(false);
  const { groupedStaff, stats } = useDashboard();

  const parseShiftTime = (timeStr) => {
    if (!timeStr) {
      return {
        startTime: "-",
        endTime: "-",
        startDate: null,
        endDate: null,
      };
    }

    const [startRaw, endRaw] = timeStr.split(" - ");

    const parse12hToDate = (t) => {
      if (!t) return null;

      let [time, modifier] = t.trim().split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const date = new Date();
      date.setHours(hours, minutes, 0, 0);

      return date;
    };

    const formatTime = (t) =>
      new Date(`1970-01-01T${t.replace(/ AM| PM/, "")}`).toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        },
      );

    return {
      startTime: startRaw ? formatTime(startRaw) : "-",
      endTime: endRaw ? formatTime(endRaw) : "-",
      startDate: parse12hToDate(startRaw),
      endDate: parse12hToDate(endRaw),
    };
  };

  const getShiftStatus = (startDate, endDate, now = new Date()) => {
    if (!startDate || !endDate) return "UPCOMING";

    if (now >= startDate && now <= endDate) return "ONGOING";
    if (now > endDate) return "COMPLETED";

    return "UPCOMING";
  };

  //  for staff profile color if no image
  const stringToColor = (str = "") => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
      "#1b4486",
      "#0c5148",
      "#b80f0f",
      "#bd7d0f",
      "#6b21a8",
      "#0ea5e9",
      "#f97316",
    ];

    return colors[Math.abs(hash) % colors.length];
  };

  // searching and filtering
  const filteredStaffs = groupedStaff.filter((staff) => {
    const term = search.toLowerCase().trim();

    const fullName = [
      staff.employee?.firstName,
      staff.employee?.middleName,
      staff.employee?.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const code = (staff.employee?.code || "").toLowerCase();

    return fullName.includes(term) || code.includes(term);
  });

  return (
    <div className="w-full min-h-full flex flex-col gap-5 p-8 no-scrollbar items-start justify-start">
      {/* head */}
      <div className="w-full flex items-center justify-between mt-2 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-[12px] font-semibold  uppercase">
                Staff Shifting Schedule
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
            <AcademicCapIcon className="h-7 w-7 text-blue-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              {" "}
              STAFF MEMBERS
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {stats.staffMembers}
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
            <UserGroupIcon className="h-7 w-7 text-gray-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] font-semibold text-gray-600 uppercase">
              All Patients
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {stats.totalPatients}
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
              {stats.completed}
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
              ONGOING
            </h2>
            <h2 className="text-[15px] font-semibold text-gray-900">
              {stats.ongoing}
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
            <CalendarDaysIcon className="h-7 w-7 text-blue-700" />
          </div>

          <div className="flex flex-col items-start justify-center leading-tight w-full">
            <h2 className="text-[9px] tracking-[0.15em] text-gray-600 uppercase font-semibold">
              Scheduled
            </h2>

            <h2 className="text-[15px] font-semibold text-gray-900">5</h2>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-2">
        <div className="w-1/2 flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-gray-800 capitalize uppercase">
            staff adn patient schedules
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setOpenSearchStaff(true)}
            className="flex items-center justify-center py-1 px-4 rounded-[5px] bg-blue-500 border-[1px] border-gray-900/10 hover:bg-blue-300 hover:border-white/10 cursor-pointer"
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
              placeholder="Staff name..."
              className="text-[10px] font-medium rounded-[5px] border border-[#1b4486]/20  px-3 py-1 outline-none transition-all duration-300 ease-in-out w-48"
            />
          )}
        </div>
      </div>

      {/* start: main contents */}
      <div className="w-full flex flex-col gap-4">
        {filteredStaffs.map((staff, index) => (
          <div
            key={staff.employeeId || `staff-${index}`}
            className="w-full rounded-[5px] 
      bg-white/10 backdrop-blur-xl border-[1px] border-gray-200 shadow-lg
      overflow-hidden"
          >
            <div
              className="flex items-center justify-between px-5 py-4 
        border-b border-white/30
        bg-gradient-to-r from-white/40 to-white/10"
            >
              <div className="flex items-center gap-3">
                {staff.employee?.profileImage ? (
                  <img
                    src={staff.employee.profileImage}
                    className="w-12 h-12 rounded-full object-cover border border-white/40 shadow-sm"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{
                      backgroundColor: stringToColor(
                        staff.employee?.firstName || "",
                      ),
                    }}
                  >
                    {staff.employee?.firstName?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex flex-col">
                  <h2 className="font-semibold text-[14px] text-gray-900">
                    {staff.employee?.firstName +
                      " " +
                      (staff.employee?.middleName
                        ? staff.employee.middleName + ". "
                        : "") +
                      staff.employee?.lastName}
                  </h2>

                  <div className="flex gap-2 mt-1">
                    {/* <span className="text-[10px] bg-purple-500/10 text-purple-700 px-2 py-[2px] rounded-md font-medium">
                {staff.employee?.role}
              </span> */}
                    <span className="text-[12px] font-medium text-gray-500">
                      ID: {staff.employee?.code}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-[12px] flex gap-2 bg-blue-500/10 text-blue-700 px-4 py-1 border border-gray-200 rounded-[5px] font-semibold">
                  <CalendarDaysIcon className="w-4 h-4" />
                  {new Set(staff?.shifts?.map((s) => s.shiftId)).size || 0}{" "}
                  Shifts
                </div>

                <div className="text-[12px] bg-green-500/10 flex gap-2 text-green-700 px-4 py-1 border border-gray-200 rounded-[5px] font-semibold">
                  <UserGroupIcon className="w-4 h-4" />
                  {staff.shifts?.reduce(
                    (t, s) => t + (s.patients?.length || 0),
                    0,
                  )}{" "}
                  Patients
                </div>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2">
              {Object.values(
                staff.shifts.reduce((acc, shift) => {
                  const hour = parseInt(
                    shift.time.split(" - ")[0].split(":")[0],
                    10,
                  );

                  const label =
                    hour < 12
                      ? "Morning Shift"
                      : hour < 18
                        ? "Afternoon Shift"
                        : "Evening Shift";

                  const key = `${label}-${shift.shiftName}-${shift.time}`;

                  if (!acc[key]) {
                    acc[key] = {
                      ...shift,
                      patients: [...shift.patients],
                      label,
                    };
                  } else {
                    acc[key].patients.push(...shift.patients);
                  }

                  return acc;
                }, {}),
              ).map((shift, idx) => {
                const { startTime, endTime, startDate, endDate } =
                  parseShiftTime(shift.time);
                const status = getShiftStatus(startDate, endDate);

                return (
                  <div
                    key={idx}
                    className="rounded-lg p-4
                                bg-green-900/10
                                border border-white/30 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full 
                                      bg-gradient-to-br from-green-600 to-green-400 
                                      text-white text-[12px] font-semibold flex items-center justify-center shadow"
                        >
                          {idx + 1}
                        </div>

                        <span className="text-[12px] font-semibold text-gray-800 tracking-wide">
                          {shift.label}
                        </span>
                      </div>

                      <span
                        className="text-[12px] 
                                    bg-yellow-400/20 text-yellow-700 
                                    px-3 py-1 rounded-[5px] font-semibold border border-gray-200"
                      >
                        {startTime} - {endTime}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      {shift.patients.length > 0 ? (
                        shift.patients.map((p, i) => {
                          const fullName = `${p.firstName} ${p.middleName || ""} ${p.lastName}`;

                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between 
                                          bg-white/70 border border-white/40 
                                          rounded-md px-3 py-2 backdrop-blur-sm"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex items-center font-semibold justify-center text-[12px] bg-gray-200 rounded">
                                  {i + 1}
                                </div>

                                <span className="text-[12px] text-gray-700 font-semibold">
                                  {fullName}
                                </span>
                              </div>

                              <div
                                className={`text-[9px] px-3 py-1 rounded-full font-semibold border border-gray-200
                          ${
                            status === "COMPLETED"
                              ? "bg-green-500/20 text-green-700"
                              : status === "ONGOING"
                                ? "bg-blue-500/20 text-blue-700"
                                : "bg-gray-300/40 text-gray-600"
                          }`}
                              >
                                {status}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <span className="text-gray-400 text-[10px]">
                          No patients
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* end: main contents */}
    </div>
  );
}
