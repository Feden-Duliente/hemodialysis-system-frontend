const DASHBOARD_BASE_URL = "http://localhost:5139/api";

class DashboardApi {
  constructor() {
    this.baseURL = DASHBOARD_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const token = localStorage.getItem("token");

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, config);

    const raw = await response.text();

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      data = raw;
    }

    if (!response.ok) {
      console.error("API ERROR RESPONSE:", data);
      throw new Error(data.message || "Request failed");
    }

    return data;
  }

  getPatients({ page = 1, limit = 10, search = "", global = "" } = {}) {
    const params = new URLSearchParams({
      Page: page,
      Limit: limit,
      Search: search,
      Global: global,
    });

    return this.request(`/patients?${params.toString()}`);
  }

  getPatientSchedules() {
    return this.request(`/patient-schedules`);
  }

  getLaboratoryMonitoringSheets({
    page = 1,
    limit = 10,
    search = "",
    global = "",
    dateFrom = "",
    dateTo = "",
    expirationDateFrom = "",
    expirationDateTo = "",
    labTest = "",
    hgb = "",
    patientId = "",
    sortBy = "",
    sortDir = "",
  } = {}) {
    const params = new URLSearchParams({
      Page: page,
      Limit: limit,
      Search: search,
      Global: global,
      DateFrom: dateFrom,
      DateTo: dateTo,
      ExpirationDateFrom: expirationDateFrom,
      ExpirationDateTo: expirationDateTo,
      LabTest: labTest,
      HGB: hgb,
      PatientId: patientId,
      SortBy: sortBy,
      SortDir: sortDir,
    });

    return this.request(`/laboratory-monitoring-sheets?${params.toString()}`);
  }

  getEmployeeShifts() {
    return this.request("/employee-schedules");
  }

  getPatientsIn() {
    return this.request("/patients");
  }

  getEmployeeSchedules() {
    return this.request("/employee-schedules");
  }

  getShifts() {
    return this.request("/shifts");
  }

  // dcotors
  getDoctors() {
    return this.request("/doctors");
  }

  getNurseNotes() {
    return this.request("/nurse-notes");
  }

  getVitalSigns() {
    return this.request("/vital-signs");
  }

  getDoctorOrder() {
    return this.request("/doctor-orders");
  }

  // packages
  getPackages() {
    return this.request("/packages");
  }
}

export default new DashboardApi();
