import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RideProvider } from './context/RideContext';

// Pages
import Landing      from './pages/Landing';
import Onboarding   from './pages/Onboarding';
import Login        from './pages/Login';
import RiderSignup  from './pages/signup/RiderSignup';
import DriverSignup from './pages/signup/DriverSignup';

// Rider
import RiderHome     from './pages/rider/RiderHome';
import RiderTracking from './pages/rider/RiderTracking';
import RiderHistory  from './pages/rider/RiderHistory';
import RiderProfile  from './pages/rider/RiderProfile';
import RiderRate     from './pages/rider/RiderRate';

// Driver
import DriverDashboard from './pages/driver/DriverDashboard';
import DriverEarnings  from './pages/driver/DriverEarnings';
import DriverProfile   from './pages/driver/DriverProfile';

// Admin
import AdminLogin    from './pages/admin/AdminLogin';
import AdminOverview from './pages/admin/AdminOverview';
import AdminUsers    from './pages/admin/AdminUsers';
import AdminRides    from './pages/admin/AdminRides';
import AdminSafety   from './pages/admin/AdminSafety';
import AdminAI       from './pages/admin/AdminAI';

// Guard: redirect to / if not logged in
function RequireAuth({ children, allowedRole }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"             element={<Landing />} />
      <Route path="/onboarding"   element={<Onboarding />} />
      <Route path="/login"        element={<Login />} />
      <Route path="/signup/rider" element={<RiderSignup />} />
      <Route path="/signup/driver"element={<DriverSignup />} />
      <Route path="/admin/login"  element={<AdminLogin />} />

      {/* Rider */}
      <Route path="/rider"         element={<RequireAuth allowedRole="rider"><RiderHome /></RequireAuth>} />
      <Route path="/rider/tracking"element={<RequireAuth allowedRole="rider"><RiderTracking /></RequireAuth>} />
      <Route path="/rider/history" element={<RequireAuth allowedRole="rider"><RiderHistory /></RequireAuth>} />
      <Route path="/rider/profile" element={<RequireAuth allowedRole="rider"><RiderProfile /></RequireAuth>} />
      <Route path="/rider/rate"    element={<RequireAuth allowedRole="rider"><RiderRate /></RequireAuth>} />

      {/* Driver */}
      <Route path="/driver"          element={<RequireAuth allowedRole="driver"><DriverDashboard /></RequireAuth>} />
      <Route path="/driver/earnings" element={<RequireAuth allowedRole="driver"><DriverEarnings /></RequireAuth>} />
      <Route path="/driver/profile"  element={<RequireAuth allowedRole="driver"><DriverProfile /></RequireAuth>} />

      {/* Admin */}
      <Route path="/admin"          element={<RequireAuth allowedRole="admin"><AdminOverview /></RequireAuth>} />
      <Route path="/admin/users"    element={<RequireAuth allowedRole="admin"><AdminUsers /></RequireAuth>} />
      <Route path="/admin/rides"    element={<RequireAuth allowedRole="admin"><AdminRides /></RequireAuth>} />
      <Route path="/admin/safety"   element={<RequireAuth allowedRole="admin"><AdminSafety /></RequireAuth>} />
      <Route path="/admin/ai"       element={<RequireAuth allowedRole="admin"><AdminAI /></RequireAuth>} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RideProvider>
          <AppRoutes />
        </RideProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
