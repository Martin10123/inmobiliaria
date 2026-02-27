import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/features/auth/LoginPage"
import { RegisterPage } from "@/features/auth/RegisterPage"
import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage"
import { DashboardPage } from "./features/dashboard/DashboardPage"
import { ProjectsPage } from "./features/projects/ProjectsPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
