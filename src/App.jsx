import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import Scan from './pages/Scan'
import CreateEvent from './pages/CreateEvent'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import useAuth from './hooks/useAuth'
import useLastVisited from './hooks/useLastVisited'
import MyTickets from './pages/MyTickets'

export default function App() {
  const { isAuthenticated, user } = useAuth()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { setLastPath, getLastPath } = useLastVisited()

  useEffect(() => { setLastPath(pathname) }, [pathname, setLastPath])

  useEffect(() => {
    if (window.location.pathname === '/') {
      const last = getLastPath()
      if (last && isAuthenticated() && last !== '/') navigate(last, { replace: true })
    }
  }, [isAuthenticated, getLastPath, navigate])

  const hasRole = (...roles) => roles.includes(user?.role)

  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className="container-app py-8">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/events' element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />

          <Route
            path='/events/new'
            element={
              <ProtectedRoute>
                {hasRole('organizer', 'admin') ? <CreateEvent /> : <NotFound />}
              </ProtectedRoute>
            }
          />

          <Route
            path='/scan'
            element={
              <ProtectedRoute>
                {hasRole('organizer', 'admin', 'staff') ? <Scan /> : <NotFound />}
              </ProtectedRoute>
            }
          />

          {}
          <Route
            path='/tickets'
            element={
              <ProtectedRoute>
                {isAuthenticated() ? <MyTickets /> : <NotFound />}
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
