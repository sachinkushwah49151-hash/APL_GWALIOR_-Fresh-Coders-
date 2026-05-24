import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppStateProvider, useAppState } from './context/AppState';

// Layout components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';

// Page components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import UploadCenter from './pages/UploadCenter';
import EventAgent from './pages/EventAgent';
import SentimentEngagement from './pages/SentimentEngagement';
import ROIAgent from './pages/ROIAgent';
import Copilot from './pages/Copilot';
import AdGenerator from './pages/AdGenerator';
import Reports from './pages/Reports';
import AdminPanel from './pages/AdminPanel';

// Route Guard / Wrapper to apply workspace sidebar & navbar layouts
const WorkspaceLayout = ({ children }) => {
  const { user } = useAppState();
  const location = useLocation();

  // Route protection simulation: if user is not logged in, take them back to login page
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-dark-950 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Panel Content container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Navbar filters */}
        <Navbar />

        {/* Dynamic page content scrollable box */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// Inner App containing routers (separated so useLocation is valid)
const AppContent = () => {
  return (
    <div className="relative min-h-screen">
      <Routes>
        {/* Public Landing & Authentication */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Private Workspace views */}
        <Route path="/dashboard" element={<WorkspaceLayout><Dashboard /></WorkspaceLayout>} />
        <Route path="/upload-center" element={<WorkspaceLayout><UploadCenter /></WorkspaceLayout>} />
        <Route path="/event-agent" element={<WorkspaceLayout><EventAgent /></WorkspaceLayout>} />
        <Route path="/sentiment-engagement" element={<WorkspaceLayout><SentimentEngagement /></WorkspaceLayout>} />
        <Route path="/roi-agent" element={<WorkspaceLayout><ROIAgent /></WorkspaceLayout>} />
        <Route path="/copilot" element={<WorkspaceLayout><Copilot /></WorkspaceLayout>} />
        <Route path="/ad-generator" element={<WorkspaceLayout><AdGenerator /></WorkspaceLayout>} />
        <Route path="/reports" element={<WorkspaceLayout><Reports /></WorkspaceLayout>} />
        <Route path="/admin-panel" element={<WorkspaceLayout><AdminPanel /></WorkspaceLayout>} />

        {/* Fallback to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Floating Global AI Assistant - available everywhere */}
      <AIAssistant />
    </div>
  );
};

function App() {
  return (
    <AppStateProvider>
      <Router>
        <AppContent />
      </Router>
    </AppStateProvider>
  );
}

export default App;
