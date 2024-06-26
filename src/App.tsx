import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import LeaderboardPage from './pages/LeaderboardPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import { UserAuth } from './context/AuthContext';
import NotFoundPage from './pages/NotFoundPage';
import CategoryPage from './pages/CategoryPage';
import QuizPage from './pages/QuizPage';


const App: React.FC = () => {
  const location = useLocation();
  const [difficulty, setDifficulty] = useState<string>('');
  const [amountOfQuestion, setAmountOfQuestion] = useState<number>(0);

  const { user } = UserAuth();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="*" element={<NotFoundPage />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <PageTransition>
                  <LandingPage />
                </PageTransition>
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <PageTransition>
                  <RegisterPage />
                </PageTransition>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <PageTransition>
                  {user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
                </PageTransition>
              </>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <>
                <Navbar />
                <PageTransition>
                  <LeaderboardPage />
                </PageTransition>
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Navbar />
                <PageTransition>
                  <ProtectedRoute user={user}>
                    <DashboardPage />
                  </ProtectedRoute>
                </PageTransition>
              </>
            }
          />
          <Route
            path="/category"
            element={
              <ProtectedRoute user={user}>
                <CategoryPage
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  amountOfQuestion={amountOfQuestion}
                  setAmountOfQuestion={setAmountOfQuestion}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute user={user}>
                <QuizPage
                  difficulty={difficulty}
                  setDifficulty={setDifficulty}
                  amountOfQuestion={amountOfQuestion}
                  setAmountOfQuestion={setAmountOfQuestion}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};

// const WrappedApp: React.FC = () => (
//   <Router>
//     <App />
//   </Router>
// );

export default App;
