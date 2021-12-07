import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Attendance from "./Attendance";
import FacultyHome from "./FacultyHome";
import TeacherDetals from "./TeacherDetals";
import MeetingDetails from "./MeetingDetails";
import Upload_CSV from "./Upload_CSV";
import Login from "./Login";
import Online from "./Online";
import Header from "./Header";
import Meeting from "./Meeting";
import Register from "./Register";
import Subjects from "./Subjects";
import Add_Subjects from "./Add_Subjects";
import SubjectDetails from "./Subject-Details";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Attendance />} />
        <Route exact path="/online/" element={<Online />} />
        <Route path="/online/login" element={<Login />} />
        <Route path="/online/admin" element={<FacultyHome />} />
        <Route path="/online/admin/register" element={<Register />} />
        <Route path="/online/admin/upload-CSV" element={<Upload_CSV />} />
        <Route exact path="/online/meeting" element={<Meeting />} />
        <Route exact path="/online/add-subjects" element={<Add_Subjects />} />
        <Route exact path="/online/subjects" element={<Subjects />} />
        <Route path="/online/subjects/:id" element={<SubjectDetails />} />
        <Route path="/online/:id" element={<TeacherDetals />} />
        <Route path="/online/meeting/:id" element={<MeetingDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
