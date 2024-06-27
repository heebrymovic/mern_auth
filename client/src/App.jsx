import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Login, Home, About, Profile, Register } from './pages';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <Toaster
        position="top-right"
        containerStyle={{ marginTop: '40px' }}
        gutter={10}
        toastOptions={{
          duration: 5000,
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            zIndex: '99!important',
            background: '#6089cc',
            color: 'white'
          },
          success: {
            duration: 3000
          },
          error: {
            duration: 3000
          }
        }}
      />
    </BrowserRouter>
  );
};

export default App;
