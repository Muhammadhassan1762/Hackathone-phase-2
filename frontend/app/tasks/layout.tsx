import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-primary-bg dark:bg-primary-bg-dark">
          {children}
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}