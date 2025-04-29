import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((userDate) => {
        if (userDate) {
          dispatch(login({userDate}))
        } else {
          dispatch(logout())
        }
      })
      .finally(()=>setLoading(false))
    
  },[])

  return !loading ? (
    <div className='w-full block'>
        <div className='min-h-screen flex flex-wrap flex-col content-between justify-between bg-gray-400'>
        <Header />
        <main>
          todos:
          {/* outlet */}
        </main>
        <Footer/>
      </div>
    </div>
  ):null
}

export default App
