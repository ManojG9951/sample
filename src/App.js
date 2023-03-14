import Login from "./Pages/Login.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUsPage from "./Pages/ContactUs.js";
import StudentForm from "./Pages/StudentForm.js";
import TrainingForm from "./Pages/TrainingForm.js";
import FacultyForm from "./Pages/FacultyForm.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="contact-us" element={<ContactUsPage />} />
          <Route path="student-details" element={<StudentForm />} />
          <Route path="training-form" element={<TrainingForm />} />
          <Route path="faculty-form" element={<FacultyForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
