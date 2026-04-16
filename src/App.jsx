import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DoctorFees from "./pages/DoctorFees";
import ActivityLogs from "./pages/ActivityLogs";
import ExpiringLabs from "./pages/ExpiringLabs";
import Philhealth from "./pages/PhilHealth";
import Schedules from "./pages/Schedules";
import ReportLayout from "./pages/philHealthReport";


export default function App() {
  return (
    <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/doctor-fees" element={<DoctorFees />} />
            <Route path="/activity-logs" element={<ActivityLogs />} />
            <Route path="/expiring-labs" element={<ExpiringLabs />} />
            <Route path="/philhealth" element={<Philhealth />} />
            <Route path="/schedules" element={<Schedules />} />
            <Route path="/report" element={<ReportLayout />} />
          </Route>
        </Routes>
    </Router>
  )
}