import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import Explore from './pages/Explore'
import DestinationDetail from './pages/DestinationDetail'
import Culture from './pages/Culture'
import Food from './pages/Food'
import Trip from './pages/Trip'
import Itinerary from './pages/Itinerary'
import Gallery from './pages/Gallery'
import Saved from './pages/Saved'
import Profile from './pages/Profile'
import Auth from './pages/Auth'

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/destination/:id" element={<DestinationDetail />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/food" element={<Food />} />
        <Route path="/trip" element={<Trip />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
