import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Screens sin layout (onboarding flow)
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import SignUpScreen from './screens/SignUpScreen/SignUpScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import ConcertGenres from './screens/GenresScreen/ConcertGenres';

// Screens con MainLayout
import HomeScreen from './screens/Home/HomeScreen';
import Discover from './screens/Discover/DiscoverScreen';
import Concerts from './screens/Concerts/Concerts';
import ConcertDetails from './screens/ConcertDetails/ConcertDetails';
import ConcertDescription from './screens/ConcertDescription/ConcertDescription';
import Communities from './screens/Communities/Communities';
import ProfileScreen from './screens/Profile/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen/EditProfileScreen';
import ChatScreen from './screens/ChatScreens/ChatScreen';
import MapScreen from './screens/MapScreen/MapScreen';
import MatchScreen from './screens/MatchScreen/MatchScreen';

// Layout y contextos
import MainLayout from './components/MainLayout/MainLayout';
import { FilterProvider } from './contexts/FilterContext';
import { PostProvider } from './contexts/PostContext';
import { UserProfileProvider } from './contexts/UserProfileContext';

export default function App() {
  return (
    <FilterProvider>
      <PostProvider>
        <UserProfileProvider>
          <Router>
            <Routes>

            {/* Rutas sin MainLayout (onboarding) */}
            <Route path="/" element={<OnboardingScreen />} />
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/genres" element={<ConcertGenres />} />

            {/* Rutas con MainLayout */}
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
                    <Route path="/profile/:profileId" element={<ProfileScreen />} />
                    <Route path="/profile/edit" element={<EditProfileScreen />} />
                    <Route path="/chats" element={<ChatScreen />} />
                    <Route path="/chat" element={<ChatScreen />} />
                    <Route path="/Chat" element={<ChatScreen />} />
                    <Route path="/map" element={<MapScreen />} />
                    <Route path="/Map" element={<MapScreen />} />
                    <Route path="/match" element={<MatchScreen />} />
                    <Route path="/Match" element={<MatchScreen />} />
                    <Route path="/create/post" element={<div>POST</div>} />
                    <Route path="/create/song" element={<div>SONG</div>} />
                    <Route path="/create/video" element={<div>VIDEO</div>} />
                    <Route path="/create/photo" element={<div>PHOTO</div>} />
                  </Routes>
                </MainLayout>
              }
            />

            </Routes>
          </Router>
        </UserProfileProvider>
      </PostProvider>
    </FilterProvider>
  );
}
