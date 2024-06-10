import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";
import ProfileJobSeeker from "./Profile/ProfileJobSeeker";
import AddJob from "./AddJob/AddJob";
import JobDetails from "./Home/JobDetails";
import ProfileCompany from "./Profile/ProfileCompany";
import Applicants from "./Profile/Applicants";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/jobdescription/:jobId" element={<JobDetails />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/profilejobseeker/:userId"
            element={<ProfileJobSeeker />}
          />
          <Route path="/profilecompany/:userId" element={<ProfileCompany />} />
          <Route path="applicants/:jobId" element={<Applicants />} />
          <Route path="/new" element={<AddJob />} />
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
