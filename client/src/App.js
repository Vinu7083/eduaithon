import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Extra from "./extra/announcement";
import Dept from "./extra/department";
import Club from "./extra/clubs";
import Event from "./extra/UpcomingEvents";
import Internship from "./extra/Internships";
import About from "./extra/AboutRVCollege";
import TeacherQADashboard from "./components/qa/TeacherQADashboard";
import StudentQAView from "./components/qa/StudentQAView";
import TeacherRemedialClasses from "./components/qa/TeacherRemedialClasses";
import TeacherRemedialReport from "./components/qa/TeacherRemedialReport";
import StudentRemedialClasses from "./components/qa/StudentRemedialClasses";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

export default function App() {

  const {user} = useContext(AuthContext)
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={user?<Home />:<Register/>} />
        <Route path="/login" element={user?<Home />:<Login />} />
        <Route path="/register" element={user?<Home />:<Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/Announcements" element={<Extra />} />
        <Route path="/Department" element={<Dept />} />
        <Route path="/Clubs" element={<Club />} />
        <Route path="/Events" element={<Event />} />
        <Route path="/Internships" element={<Internship />} />
        <Route path="/About" element={<About />} />
        <Route 
          path="/teacher-qa-dashboard" 
          element={user?.isAdmin ? <TeacherQADashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/qa-history" 
          element={user ? <StudentQAView /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/teacher-remedial-classes" 
          element={user?.isAdmin ? <TeacherRemedialClasses teacherId={user._id} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/teacher-remedial-report" 
          element={user?.isAdmin ? <TeacherRemedialReport /> : <Navigate to="/" />} 
        />
        <Route 
          path="/student-remedial-classes" 
          element={user ? <StudentRemedialClasses studentId={user._id} /> : <Navigate to="/login" />} 
        />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);