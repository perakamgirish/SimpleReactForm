import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Routes/HomePage";
import FormPage from "./Routes/FormPage";
import SummaryPage from "./Routes/SummaryPage";
import ErrorPage from "./Routes/ErrorPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
//import Protechted from "./Routes/Protected";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Form" element={<FormPage />} />
        <Route path="/Summary" element={<SummaryPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}
//ProtectedRoute Component={SummaryPage}
export default App;
//</Routes><Route path="/formedit" element={</>}
