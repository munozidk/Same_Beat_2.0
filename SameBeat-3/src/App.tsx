import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens
import HomeScreen from './screens/Home/HomeScreen';
import Discover from './screens/Discover/DiscoverScreen';
import Concerts from './screens/Concerts/Concerts';
import ConcertDetails from './screens/ConcertDetails/ConcertDetails';
import ConcertDescription from './screens/ConcertDescription/ConcertDescription';
import Communities from './screens/Communities/Communities';
import ProfileScreen from './screens/Profile/ProfileScreen';
import ChatScreen from './screens/ChatScreens/ChatScreen';
import MapScreen from './screens/MapScreen/MapScreen';
import MatchScreen from './screens/MatchScreen/MatchScreen';
import EditProfileScreen from './screens/EditProfileScreen/EditProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ConcertGenres from './screens/GenresScreen/ConcertGenres';

// Layout
import MainLayout from './components/MainLayout/MainLayout';

// Contexts
import { FilterProvider } from './contexts/FilterContext';
import { PostProvider } from './contexts/PostContext';

export default function App() {
  return (
    <FilterProvider>
      <PostProvider>
        <Router>
          <Routes>

            {/* Rutas sin layout */}
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/genres" element={<ConcertGenres />} />

            {/* Rutas con layout */}
            <Route
              path="/*"
              element={
                <MainLayout>
                  <Routes>
                    <Route path="/home" element={<HomeScreen />} />
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/concerts" element={<Concerts />} />
                    <Route path="/concert/:id" element={<ConcertDetails />} />
                    <Route path="/concert/:id/description" element={<ConcertDescription />} />
                    <Route path="/concert/:id/communities" element={<Communities />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                    <Route path="/profile/edit" element={<EditProfileScreen />} />
                    <Route path="/chat" element={<ChatScreen />} />
                    <Route path="/Chat" element={<ChatScreen />} />
                    <Route path="/map" element={<MapScreen />} />
                    <Route path="/Map" element={<MapScreen />} />
                    <Route path="/match" element={<MatchScreen />} />
                    <Route path="/Match" element={<MatchScreen />} />
                  </Routes>
                </MainLayout>
              }
            />

          </Routes>
        </Router>
      </PostProvider>
    </FilterProvider>
  );
}