import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { UserProvider } from './userContext';  // Import this
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <UserProvider>
        <Router>
          <MainLayout>
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              pauseOnHover
              theme="colored"
            />
            <CssBaseline />
            <AppRoutes />
          </MainLayout>
        </Router>
      </UserProvider>
    </Provider>
  );
};

export default App;
