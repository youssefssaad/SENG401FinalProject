import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Budget from "./pages/Budget";
import Education from "./pages/Education";
import Expenses from "./pages/Expenses";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthProvider, useAuth } from "./components/AuthContext";
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
    const { user, signOut } = useAuth(); // Using AuthContext

    return (
        <>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
            <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
            <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Loading />} />
        </Routes>
            {user && (
                <div style={{ color: "black", position: 'fixed', top: 0, right: 0, padding: '10px', }}>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            )}
        </>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </AuthProvider>
    );
}
export default App;
