import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "@/features/auth/LoginPage"
import { RegisterPage } from "@/features/auth/RegisterPage"
import { ForgotPasswordPage } from "@/features/auth/ForgotPasswordPage"
import { DashboardPage } from "./features/dashboard/DashboardPage"
import { ProjectsPage } from "./features/projects/ProjectsPage"
import { ProjectDetailPage } from "./features/projects/ProjectDetailPage"
import InventoryPage from "./features/inventory/InventoryPage"
import InventoryDetailPage from "./features/inventory/InventoryDetailPage"
import { CustomersPage } from "./features/customers/CustomersPage"
import { CustomerDetailPage } from "./features/customers/CustomerDetailPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:id" element={<InventoryDetailPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/:id" element={<CustomerDetailPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
