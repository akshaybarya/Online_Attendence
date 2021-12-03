import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Attendance from "./Attendance";
import FacultyHome from "./FacultyHome";
import TeacherDetals from "./TeacherDetals";
import MeetingDetails from "./MeetingDetails";
import Upload_CSV from "./Upload_CSV";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route path="/admin/upload-CSV" element={<Upload_CSV />} />
        <Route path="/online" element={<FacultyHome />} />
        <Route path="/online/:id" element={<TeacherDetals />} />
        <Route path="/online/meeting/:id" element={<MeetingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
