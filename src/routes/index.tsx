import React, { JSX, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import Home from '../pages/Home';
import Booking from '../pages/Booking';
import Login from '../pages/Login';
import Confirmation from '../pages/Confirmation';
import Reporting from '../pages/Reporting';
import BookingList from '../pages/BookingList';
import Loader from '../components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Optional: Protect certain routes (e.g., Reporting) if user not logged in
// const PrivateRoute = ({ children }: { children: JSX.Element }) => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   return user ? children : <Navigate to="/login" />;
// };

const AppRoutes: React.FC = () => {
  const { user } = useContext(UserContext);
  const isAdmin = user?.user?.role !== "user";
  const location = useLocation();

  const [isUserChecked, setIsUserChecked] = useState(false);

  useEffect(() => {
    console.log(user, "UUUUUUUUUUUUUUUUU");
    if (user !== undefined) {
      setIsUserChecked(true);
    }
  }, [user]);

  if (!isUserChecked) {
    // While checking user state, show loading spinner
    return <div></div>;
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace state={{ from: location }} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={isAdmin ? <Reporting /> : <Home />} />
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/booking/:vendorId/:serviceId" element={<Booking />} />
      <Route path="/bookingList" element={<BookingList />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/reporting" element={<Reporting />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
