import { createContext, useContext, useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const DashboardContext = createContext();

export function DashboarProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [patientSchedules, setPatientSchedules] = useState([]);
  const [employeeSchedules, setEmployeeSchedules] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [labs, setLabs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [totalPatients, setTotalPatients] = useState(0);
  const [statusCount, setStatusCount] = useState({
    completed: 0,
    inProgress: 0,
    scheduled: 0,
  });

  const normalizeStatus = (status) => {
    const s = status?.toLowerCase().replace(/\s/g, "");

    if (s === "completed") return "completed";
    if (s === "inprogress") return "inProgress";
    if (s === "scheduled") return "scheduled";

    return "unknown";
  };

  const [groupedStaff, setGroupedStaffed] = useState([]);
  const [stats, setStats] = useState({
    staffMembers: 0,
    totalShifts: 0,
    totalPatients: 0,
    completed: 0,
    ongoing: 0,
    scheduled: 0,
  });

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        patientRes,
        patientSchedulesRes,
        employeeSchedulesRes,
        shiftsRes,
        labRes,
      ] = await Promise.all([
        dashboardApi.getPatients(),
        dashboardApi.getPatientSchedules() ?? [],
        dashboardApi.getEmployeeSchedules() ?? [],
        dashboardApi.getShifts() ?? [],
        dashboardApi.getLaboratoryMonitoringSheets() ?? [],
      ]);

      const patientsRaw = patientRes?.items || patientRes || [];
      const schedulesRaw = Array.isArray(patientSchedulesRes)
        ? patientSchedulesRes
        : [];

      setPatientSchedules(schedulesRaw);
      setEmployeeSchedules(employeeSchedulesRes);
      setShifts(shiftsRes);
      setLabs(labRes?.items || labRes || []);

      // merging patient and schedule
      const merged = patientsRaw.map((patient) => {
        const patientSchedulesList = schedulesRaw.filter(
          (s) => Number(s.patientId) === Number(patient.id),
        );

        const schedule = patientSchedulesList.sort(
          (a, b) => new Date(b.date) - new Date(a.date),
        )[0];

        return {
          id: patient.id,
          code: patient.code,
          firstName: patient.firstName,
          lastName: patient.lastName,
          date: schedule?.date || null,
          status: normalizeStatus(schedule?.status),
        };
      });

      setPatients(merged);
      setTotalPatients(merged.length);

      const counts = {
        completed: 0,
        inProgress: 0,
        scheduled: 0,
      };

      merged.forEach((p) => {
        if (p.status === "completed") counts.completed++;
        else if (p.status === "inProgress") counts.inProgress++;
        else if (p.status === "scheduled") counts.scheduled++;
      });

      setStatusCount(counts);

      // maping schedule data
      const staffMap = new Map();

      employeeSchedulesRes.forEach((es) => {
        const emp = es.employee;
        const shift = es.shift;

        if (!staffMap.has(es.employeeId)) {
          staffMap.set(es.employeeId, {
            employeeId: es.employeeId,
            employee: emp,
            shifts: [],
          });
        }

        const patientInShifts = schedulesRaw
          .filter(
            (ps) =>
              ps.employeeId === es.employeeId &&
              ps.shiftId === es.shiftId &&
              ps.date === es.date,
          )
          .map((ps) => ps.patient);

        staffMap.get(es.employeeId).shifts.push({
          shiftName: shift?.name || `Shift ${es.shiftId || "N/A"}`,
          time: shift ? `${shift.startTime} - ${shift.endTime}` : "N/A",
          patients: patientInShifts,
          status:
            patientInShifts.length >= (shiftsRes?.maxNoOfPatients || 0)
              ? "Completed"
              : "Scheduled",
        });
      });

      let staffMembers = staffMap.size;
      let totalShifts = 0;
      let totalPatients = 0;
      let completed = 0;
      let ongoing = 0;
      let scheduled = 0;

      staffMap.forEach((staff) => {
        totalShifts += staff.shifts.length;

        staff.shifts.forEach((s) => {
          totalPatients += s.patients.length || 0;

          if (s.status === "Completed") completed++;
          else if (s.status === "Ongoing") ongoing++;
          else scheduled++;
        });
      });

      setStats({
        staffMembers,
        totalShifts,
        totalPatients,
        completed,
        ongoing,
        scheduled,
      });

      setGroupedStaffed(Array.from(staffMap.values()));
      console.table(Array.from(staffMap.values()));
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        patients,
        patientSchedules,
        employeeSchedules,
        shifts,
        labs,
        loading,
        error,

        //
        totalPatients,
        statusCount,

        // schedule
        groupedStaff,
        stats,

        // action
        reload: loadDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
