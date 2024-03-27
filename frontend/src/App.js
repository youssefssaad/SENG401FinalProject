import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Budget from "./pages/Budget";
import Education from "./pages/Education";
import Expenses from "./pages/Expenses";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Register from "./pages/Register";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthProvider, useAuth } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import IntroPage from "./pages/IntroPage";
// import FavImage from "./assets/favicon.png";
import { useState } from "react";
// import Favicon from "react-favicon";


function App() {
//   const [faviconUrl, setFaviconUrl] = useState(FavImage);

//   //toggling the favicon
//   const toggleFavicon = () => {
//     // Check the current favicon and
//     // toggle to the opposite
//     setFaviconUrl(FavImage);
//   };

  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesApp />
      </BrowserRouter>
    </AuthProvider>
  );
}

function RoutesApp() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/intro"
          element={
            <ProtectedRoute>
              <IntroPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          }
        />
        <Route
          path="/education"
          element={
            <ProtectedRoute>
              <Education />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;
