import { createContext, useContext, useEffect, useState } from "react";
import dashboardApi from "../services/dashboardApi";

const DoctorContext = createContext();

export function DoctorProvider({ children }) {
    const [doctor, setDoctor] = useState([]);
    const [staffLogs, setStaffLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            (p) => p.patientId === schedule.patientId
        );

        const fromPatientsEndpoint = fromPatientsTable
            ? `${fromPatientsTable.firstName} ${fromPatientsTable.lastName}`
            : null;

        return (
            fromSchedule ||
            fromPatientsEndpoint ||
            `Patient #${schedule.patientId}`
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
                item.note ||
                item.description ||
                item.order ||
                item.value ||
                "activity",
        }));
    };

    // ================================
    // 🔥 FIXED SHIFT CALCULATION (REAL DATA)
    // ================================
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

    const buildStaffLogs = (
        employeeSchedules,
        patientSchedules,
        patients,
        activities
    ) => {
        const employees = toArray(employeeSchedules);
        const schedules = toArray(patientSchedules);
        const patientList = toArray(patients);

        return employees.map((row) => {
            const emp = row.employee || {};

            const fullName =
                `${emp.firstName ?? ""} ${emp.lastName ?? ""}`.trim();

            // 🔥 FIX: HOURS NOW COME FROM PATIENT SCHEDULES SHIFT DATA
            const totalHours = calculateHours(row.employeeId, schedules);

            const empSchedules = schedules.filter(
                (p) => p.employeeId === row.employeeId
            );

            const empPatients = empSchedules.map((s) => ({
                id: s.patientId,
                name: resolvePatientName(s, patientList),
                date: s.date,
                status: s.status,
            }));

            const empActivities = activities.filter(
                (a) => a.employeeId === row.employeeId
            );

            return {
                name: fullName || "Unknown",
                role: emp.roleType || emp.position || "Unknown",
                hours: `${totalHours}h`,
                patients: empPatients.length,
                patientList: empPatients,
                activities: empActivities,
            };
        });
    };

    const loadDoctors = async () => {
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

            const activities = buildActivities(
                nurseNotes,
                doctorOrders,
                vitalSigns
            );

            const logs = buildStaffLogs(
                employeeSchedules,
                patientSchedules,
                patients,
                activities
            );

            setDoctor(toArray(doctors));
            setStaffLogs(logs);

            console.log("\n================ STAFF ACTIVITY LOGS ================\n");

            logs.forEach((s) => {
                console.log(`NAME: ${s.name}`);
                console.log(`ROLE: ${s.role}`);
                console.log(`HOURS: ${s.hours}`);
                console.log(`PATIENTS: ${s.patients}`);

                console.log("\nPATIENT LIST:");
                s.patientList.length
                    ? s.patientList.forEach((p) =>
                          console.log(`- ${p.name} (${p.status})`)
                      )
                    : console.log("- none");

                console.log("\nDAILY ACTIVITIES:");
                s.activities.length
                    ? s.activities.forEach((a) => console.log(`- ${a.text}`))
                    : console.log("- none");

                console.log("\n-------------------------------------\n");
            });

        } catch (err) {
            console.log("Error:", err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDoctors();
    }, []);

    return (
        <DoctorContext.Provider
            value={{
                doctor,
                staffLogs,
                loading,
                error,
                reload: loadDoctors,
            }}
        >
            {children}
        </DoctorContext.Provider>
    );
}

export function useDoctor() {
    return useContext(DoctorContext);
}