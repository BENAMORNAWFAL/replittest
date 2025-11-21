import { AuthProvider } from "@/contexts/AuthContext";
import Dashboard from "@/pages/dashboard";

export default function DashboardExample() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}
