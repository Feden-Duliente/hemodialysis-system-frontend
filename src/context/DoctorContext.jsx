import { createContext, useContext, useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const DoctorContext = createContext();

export function DoctorProvider({ children }) {
  const [doctor, setDoctor] = useState([]);
  const [stafflogs, setStaffLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toArray = (res) => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.items)) return res.items;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  };

  const resolvePatientName = (schedule, patients) => {
    const fromSchedule =
      schedule?.patient?.firstName && schedule?.patient?.lastName
        ? `${schedule.patient.firstName} ${schedule.patient.lastName}`
        : null;

    const fromPatientsTable = patients.find(
      (p) => p.patientId === schedule.patientId,
    );

    const fromPatientsEndpoint = fromPatientsTable
      ? `${fromPatientsTable.firstName} ${fromPatientsTable.lastName}`
      : null;

    return (
      fromSchedule || fromPatientsEndpoint || `Patient #${schedule.patientId}`
    );
  };

  const buildActivities = (nurseNotes, doctorOrders, vitalSigns) => {
    return [
      ...toArray(nurseNotes),
      ...toArray(doctorOrders),
      ...toArray(vitalSigns),
    ].map((item) => ({
      employeeId: item.employeeId,
      text:
        item.note || item.description || item.order || item.value || "activity",
    }));
  };

  const calculateHours = (employeeId, patientSchedules) => {
    const schedules = toArray(patientSchedules);
    let total = 0;

    schedules.forEach((s) => {
      if (s.employeeId !== employeeId) return;
      if (!s.shift?.startTime || !s.shift?.endTime) return;

      const [sh, sm] = s.shift.startTime.split(":").map(Number);
      const [eh, em] = s.shift.endTime.split(":").map(Number);

      if (isNaN(sh) || isNaN(eh)) return;

      let start = sh + (sm || 0) / 60;
      let end = eh + (em || 0) / 60;

      let diff = end - start;
      if (diff < 0) diff += 24;

      total += diff;
    });

    return total;
  };

  const calculateShiftHours = (employeeSchedules = []) => {
    let total = 0;

    employeeSchedules.forEach((emp) => {
      const shifts = emp.shifts || [];

      shifts.forEach((s) => {
        const time = s.time;
        if (!time || typeof time !== "string") return;

        const [startRaw, endRaw] = time.split(" - ");
        if (!startRaw || !endRaw) return;

        const [sh, sm, ss] = startRaw.split(":").map(Number);
        const [eh, em, es] = endRaw.split(":").map(Number);

        if (isNaN(sh) || isNaN(eh)) return;

        const start = sh + (sm || 0) / 60;
        const end = eh + (em || 0) / 60;

        let diff = end - start;
        if (diff < 0) diff += 24;

        total += diff;
      });
    });

    return total;
  };

  const buildStaffLogs = (
    employeeSchedules,
    patientSchedules,
    patients,
    activities,
    doctorList,
  ) => {
    const employees = toArray(employeeSchedules);
    const schedules = toArray(patientSchedules);
    const patientList = toArray(patients);
    const doctors = toArray(doctorList);

    // for staffs data
    const staffLogs = employees.map((row) => {
      const emp = row.employee || {};
      const empId = row.employeeId;

      const fullName = `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim();

      const totalHours = calculateHours(empId, schedules);

      const empSchedules = schedules.filter((p) => p.employeeId === empId);

      const empPatients = empSchedules.map((s) => ({
        id: s.patientId,
        name: resolvePatientName(s, patientList),
        date: s.date,
        status: s.status,
      }));

      const empActivities = activities.filter((a) => a.employeeId === empId);

      return {
        id: empId,
        name: fullName || "Unknown",
        role: emp.roleType || emp.position || "Staff",
        hours: `${totalHours}`,
        patients: empPatients.length,
        patientList: empPatients,
        activities: empActivities,
      };
    });

    // doctors data
    const doctorLogs = doctors.map((d) => {
      const doctorSchedules = employeeSchedules.filter(
        (e) => e.employeeId === d.id,
      );

      const doctorHours = calculateShiftHours(doctorSchedules);

      const doctorPatients = doctorSchedules.flatMap((e) =>
        toArray(e.shifts).flatMap((s) =>
          (s.patients || []).map((p) => ({
            id: p.patientId,
            name: `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim(),
            status: p.status || "Scheduled",
          })),
        ),
      );

      return {
        id: d.id,
        name: `Dr. ${d.firstName} ${d.lastName}`,
        role: "Doctor",
        doctorType: d.doctorType || "General",
        hours: `${doctorHours}`,
        patients: doctorPatients.length,
        patientList: doctorPatients,
        activities: [],
      };
    });

    return [...staffLogs, ...doctorLogs];
  };

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        doctors,
        patientSchedules,
        employeeSchedules,
        patients,
        nurseNotes,
        doctorOrders,
        vitalSigns,
      ] = await Promise.all([
        dashboardApi.getDoctors(),
        dashboardApi.getPatientSchedules(),
        dashboardApi.getEmployeeSchedules(),
        dashboardApi.getPatientsIn(),
        dashboardApi.getNurseNotes(),
        dashboardApi.getDoctorOrder(),
        dashboardApi.getVitalSigns(),
      ]);

      const activities = buildActivities(nurseNotes, doctorOrders, vitalSigns);

      const logs = buildStaffLogs(
        employeeSchedules,
        patientSchedules,
        patients,
        activities,
        doctors,
      );

      setDoctor(toArray(doctors));
      setStaffLogs(logs);

      console.log(
        "\n-----------------------staff and doctors----------------------",
      );
      logs.forEach((s) => {
        console.log(`NAME: ${s.name}`);
        console.log(`ROLE: ${s.role}`);
        console.log(`SPECIALTY: ${s.doctorType}`);
        console.log(`HOURS: ${s.hours}`);
        console.log(`PATIENTS: ${s.patients}`);
        console.log("-----------------------------------");
      });
    } catch (error) {
      console.log("Error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DoctorContext.Provider
      value={{
        doctor,
        stafflogs,
        loading,
        error,
        reload: loadData,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}

export function useDoctor() {
  return useContext(DoctorContext);
}
