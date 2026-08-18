import LoginForm from "@/components/admin/login/LoginForm/LoginForm";

export const metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return <LoginForm />;
}