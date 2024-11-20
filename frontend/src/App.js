import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import SignUpPage from './pages/auth/signUp/SignUp';
import LoginPage from './pages/auth/login/login';
import Sidebar from './components/common/Sidebar';
import RightPanel from './components/common/RightPanel';
import NotificationPage from './pages/notifications/NotificationPage';
import ProfilePage from './pages/profile/ProfilePage';
import { Toaster } from 'react-hot-toast';
import store from './store';
import { loadUser } from './axios/actions/authActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingSpinner from './components/common/LoadingSpinner';



function App() {
  const { loading, isAuthenticated, user } = useSelector(state => state.authState)
  const location = useLocation()

  useEffect(() => {
    store.dispatch(loadUser())
  }, [location.pathname])

  if (loading) {
    return <div className="flex justify-center items-center h-screen ">
      <LoadingSpinner size='lg' />
    </div>
  }
  return (
    <div className="flex max-w-6xl mx-auto">
      {isAuthenticated && <Sidebar isAuthenticated={isAuthenticated} user={user} />}
      <Routes>
        <Route path='/' element={isAuthenticated?<Home />:<Navigate to={'/login'}/>} />
        <Route path='/signup' element={!isAuthenticated? <SignUpPage />:<Navigate to={'/'}/>} />
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to={'/'} />} />
        <Route path='/notifications' element={!isAuthenticated && loading?  <Navigate to={'/login'} />:<NotificationPage />} />
        <Route path='/profile/:username' element={!isAuthenticated && loading?<Navigate to={'/login'}/>:<ProfilePage user={user}/>} />
      </Routes>
      {isAuthenticated && <RightPanel user={user}/>}
      <Toaster />
    </div>
  );
}

export default App;
