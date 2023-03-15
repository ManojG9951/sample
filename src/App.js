import Login from "./Pages/Login.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactUsPage from "./Pages/ContactUs.js";
import StudentForm from "./Pages/StudentForm.js";
import TrainingForm from "./Pages/TrainingForm.js";
import FacultyForm from "./Pages/FacultyForm.js";
import Popup from "./Pages/EditPopup.js";

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
          <Route path="popup" element={<Popup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
