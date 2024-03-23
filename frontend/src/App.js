import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Budget from "./pages/Budget";
import Education from "./pages/Education";
import Expenses from "./pages/Expenses";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthProvider, useAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <RoutesApp />
            </BrowserRouter>
        </AuthProvider>
    );
}

function RoutesApp() {
    const { user, signOut } = useAuth();

    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/budget" element={<ProtectedRoute><Budget /></ProtectedRoute>} />
                <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
                <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
                <Route path="/loading" element={<Loading />} />
                <Route path="/register" element={<Register />} />
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

export default App;
