import { useState, useMemo } from "react";
import {
  ChevronUpIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  UserIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import {
  Package,
  Pill,
  Syringe,
  Droplets,
  Scissors,
  Bandage,
  FlaskConical,
  Clock10Icon,
  Clock11Icon,
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

export default function ExpiringLabs() {
  const { labs = [], patients = [] } = useDashboard();

  const [openSearchPatient, setOpenSearchPatient] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const formatted = useMemo(() => {
    const today = new Date();

    return labs.map((x) => {
      const dueDate = new Date(x.expirationDate);

      let status = "Valid";
      const diffDays = (dueDate - today) / (1000 * 60 * 60 * 24);

      if (diffDays < 0) status = "Expired";
      else if (diffDays <= 5) status = "Expired Soon";

      const patient = patients.find(
        (p) =>
          String(p.patientId || p.id) === String(x.patientId || x.patientsId),
      );

      return {
        ID: x.id,
        PATIENT_CODE: patient?.code || `P-${x.patientId}`,
        PATIENT_NAME: patient
          ? `${patient.firstName || ""} ${patient.lastName || ""}`
          : `Patient ${x.patientId}`,
        STATUS: status,
        DUE: x.expirationDate,
        LAB_TESTS: x.labTest,
      };
    });
  }, [labs, patients]);

  // for status
  const stats = useMemo(() => {
    return {
      expired: formatted.filter((x) => x.STATUS === "Expired").length,
      soon: formatted.filter((x) => x.STATUS === "Expired Soon").length,
      valid: formatted.filter((X) => X.STATUS === "Valid").length,
    };
  }, [formatted]);

  // filte rin search
  const filteredPatients = formatted.filter((row) => {
    const term = searchItem.toLowerCase();

    return (
      row.PATIENT_NAME?.toLowerCase().includes(term) ||
      row.PATIENT_CODE?.toLowerCase().includes(term) ||
      row.STATUS?.toLowerCase().includes(term) ||
      row.LAB_TESTS?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center  p-8 no-scrollbar mr-5">
      {/* head */}
      <div className="w-full flex items-center justify-between mt-5 ">
        <div className="flex items-start justify-center gap-3">
          <div className="flex items-center justify-center gap-3 ">
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-[12px] font-semibold tracking-[0.1em]">
                EXPIRING LAB RESULT
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start justify-start gap-4 mt-2">
        {/* card 2 */}
        <div
          className="w-[150px] relative px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-gray-200
                      shadow-lg
                      overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                {stats.expired}
              </span>
              <span className="text-[10px] uppercase font-medium text-gray-500 mt-1">
                Expired lab
              </span>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div
          className="w-[150px] relative px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-gray-200
                      shadow-lg
                      overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start gap-2">
              <Clock11Icon className="h-6 w-6 text-yellow-600" />
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                {stats.soon}
              </span>
              <span className="text-[10px] uppercase font-medium text-gray-500 mt-1">
                Expired Soon
              </span>
            </div>
          </div>
        </div>

        {/* card 2 */}
        <div
          className="w-[150px] relative px-5 py-4 rounded-[5px]
                      bg-gradient-to-br from-white/50 via-white/20 to-white/10
                      backdrop-blur-2xl border border-gray-200
                      shadow-lg
                      overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-start gap-2">
              <CheckCircleIcon className="h-7 w-7 text-green-600" />
            </div>

            <div className="flex flex-col items-end leading-tight text-right">
              <span className="text-[18px] font-semibold text-gray-900">
                {stats.valid}
              </span>
              <span className="text-[10px] uppercase font-medium text-gray-500 mt-1">
                valid
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-between mt-2">
        <div className="w-1/2 flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-gray-800 capitalize uppercase">
            Patients with expired laboratory result
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div
            onClick={() => setOpenSearchPatient(true)}
            className="flex items-center justify-center py-1 px-4 rounded-[5px] bg-blue-500 border-[1px] border-gray-900/10 hover:bg-blue-300 hover:border-white/10 cursor-pointer"
          >
            <h2 className="text-[10px] font-medium text-white tracking-[0.1em]">
              {" "}
              SEARCH{" "}
            </h2>
            <MagnifyingGlassIcon className="w-3 h-3 ml-2 text-white" />
          </div>

          {openSearchPatient && (
            <input
              autoFocus
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Patient name..."
              className="text-[10px] font-medium rounded-[5px] border border-[#1b4486]/20  px-3 py-1 outline-none transition-all duration-300 ease-in-out w-48"
            />
          )}
        </div>
      </div>

      {/* consumptions */}
      <div className="w-full h-[500px] flex items-center justify-start gap-5 mt-2">
        <div className="w-full h-full rounded-[5px] bg-white/10 backdrop-blur-2xl border-[1px] border-gray-200 shadow-xl px-4 py-2 relative overflow-hidden flex flex-col min-h-0">
          <div className="absolute inset-0 opacity-60 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-green-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          </div>

          {/* scroll area */}
          <div className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 py-4 patient-scroll flex flex-col gap-2">
            {filteredPatients.map((item, i) => {
              const today = new Date();
              const dueDate = new Date(item.DUE);
              const diffDays = Math.ceil(
                (today - dueDate) / (1000 * 60 * 60 * 24),
              );

              let status = "Valid";

              if (diffDays < 0) status = "Expired";
              else if (diffDays <= 10) status = "Expired Soon";

              return (
                <div
                  key={item.ID || i}
                  className={`w-full flex items-center justify-center gap-1 rounded-[5px] p-4 border border-gray-900/10  shrink-0
                  ${
                    item.STATUS === "Expired"
                      ? "bg-red-100/50 border-red-200"
                      : item.STATUS === "Expired Soon"
                        ? "bg-yellow-100/50 border-yellow-200"
                        : "bg-green-100/50 border-green-200"
                  }`}
                >
                  <div className="w-full flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center p-2 rounded-[3px]
                      ${
                        item.STATUS === "Expired"
                          ? "bg-red-800"
                          : item.STATUS === "Expired Soon"
                            ? "bg-yellow-800"
                            : "bg-green-700"
                      }`}
                    >
                      <UserIcon className="h-7 w-7 text-white" />
                    </div>

                    <div className="flex flex-col items-start justify-center gap-1">
                      <div className="flex items-center justify-between gap-2 ml-2">
                        <div className="text-black font-semibold text-[14px] uppercase ">
                          {item.PATIENT_NAME}
                        </div>

                        <div
                          className={`px-5  items-center flex justify-center py-1  rounded-[7px] text-[10px] font-semibold uppercase border-[1px] 
                          ${
                            item.STATUS === "Expired"
                              ? "bg-red-200 text-red-800 border-red-300"
                              : item.STATUS === "Expired Soon"
                                ? "bg-yellow-200 text-yellow-800 border-yellow-300"
                                : "bg-green-200 text-green-800 border-green-300"
                          } `}
                        >
                          {item.STATUS}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-2 ml-2">
                        <div className="flex flex-col items-start leading-tight">
                          <div className="flex items-center gap-2 text-[11px] text-gray-800 font-normal tracking-[0.08em]">
                            <div className="flex items-center font-medium gap-1">
                              <UserIcon className="h-3.5 w-3.5 text-gray-600" />
                              <span>
                                Expires:{" "}
                                {new Date(item.DUE).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2 overflow-x-auto flex-nowrap ml-2">
                        {item.LAB_TESTS?.split(",").map((test, idx) => (
                          <div
                            key={idx}
                            className="px-2 shrink-0 whitespace-nowrap items-center flex justify-center bg-white/60 rounded-[5px] py-[2px] text-[10px] font-normal text-gray-800 capitalize border-[1px] border-gray-900/10"
                          >
                            {test.trim()}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-end gap-5">
                    <div className="w-[1.3px] h-[60px] bg-gray-900/10"></div>

                    <div className="flex flex-col items-end justify-center">
                      {/* ICON */}
                      {item.STATUS === "Expired" && (
                        <ExclamationTriangleIcon className="h-7 w-7 text-red-800" />
                      )}

                      {item.STATUS === "Expired Soon" && (
                        <ClockIcon className="h-7 w-7 text-yellow-600" />
                      )}

                      {item.STATUS === "Valid" && (
                        <CheckCircleIcon className="h-7 w-7 text-green-600" />
                      )}

                      <h2
                        className={`font-semibold text-[16px] ${
                          item.STATUS === "Expired"
                            ? "text-red-800"
                            : item.STATUS === "Expired Soon"
                              ? "text-yellow-700"
                              : "text-green-700"
                        }`}
                      >
                        {item.STATUS === "Expired"
                          ? `Expired ${Math.abs(diffDays)} days ago`
                          : item.STATUS === "Expired Soon"
                            ? `${Math.abs(diffDays)} days remaining`
                            : `Valid (${Math.abs(diffDays)} days left)`}
                      </h2>

                      <h2 className="text-gray-800 font-normal text-[10px]">
                        PATIENT CODE: {item.PATIENT_CODE}
                      </h2>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* end:main contents */}
    </div>
  );
}
