import { AuthProvider } from "../../contexts/AuthContext";
import LoginPage from "../../pages/login";
import "tailwindcss";

export default function LoginPageExample() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
