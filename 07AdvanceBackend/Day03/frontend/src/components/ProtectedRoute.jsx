import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/useAuthStore.js';

export default function ProtectedRoute() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  if (loading) return <div className="grid min-h-screen place-items-center text-slate-500">Checking session…</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
