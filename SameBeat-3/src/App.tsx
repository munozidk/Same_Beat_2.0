import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home/HomeScreen';
import Discover from './screens/Discover/Discover';
import Concerts from './screens/Concerts/Concerts';
import ConcertDetails from './screens/ConcertDetails/ConcertDetails';
import ConcertDescription from './screens/ConcertDescription/ConcertDescription';
import Communities from './screens/Communities/Communities';
import ProfileScreen from './screens/Profile/ProfileScreen';
import MainLayout from './components/MainLayout/MainLayout';
import { FilterProvider } from './contexts/FilterContext';
import ChatScreen from './screens/ChatScreens/ChatScreen';
import MapScreen from './screens/MapScreen/MapScreen';
import MatchScreen from './screens/MatchScreen/MatchScreen';

export default function App() {
  return (
    <FilterProvider>
      <Router>
        <MainLayout>
          <Routes> 
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/concerts" element={<Concerts />} />
            <Route path="/concert/:id" element={<ConcertDetails />} />
            <Route path="/concert/:id/description" element={<ConcertDescription />} />
            <Route path="/concert/:id/communities" element={<Communities />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/Chat" element={<ChatScreen />} />
            <Route path="/Map" element={<MapScreen />} />
            <Route path="/Match" element={<MatchScreen />} />
          </Routes>
        </MainLayout>
      </Router>
    </FilterProvider>
  );
}
