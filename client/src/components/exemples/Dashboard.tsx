import { AuthProvider } from "../../contexts/AuthContext";
import Dashboard from "../../pages/dashboard";
import "tailwindcss";

export default function DashboardExample() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
