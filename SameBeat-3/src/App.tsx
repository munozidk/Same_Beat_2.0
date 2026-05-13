/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home/Home';
import Discover from './screens/Discover/Discover';
import ConcertsScreen from './screens/Concerts/Concerts';
//import ConcertDetails from './screens/ConcertDetails/ConcertDetails';
//import ConcertDescription from './screens/ConcertDescription/ConcertDescription';
//import Communities from './screens/Communities/Communities';
import ProfileScreen from './screens/Profile/Profile';
import MainLayout from './components/MainLayout/MainLayout';
//import { FilterProvider } from './contexts/FilterContext';

/*
// ==========================================
// VERSION DEL EQUIPO (Comentada)
// ==========================================

export default function App() {
  return (
    <FilterProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<ConcertsScreen />} />
            <Route path="/concert/:id" element={<ConcertDetails />} />
            <Route path="/concert/:id/description" element={<ConcertDescription />} />
            <Route path="/concert/:id/communities" element={<Communities />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </MainLayout>
      </Router>
    </FilterProvider>
  );
}
*/

// ==========================================
// MI VERSIÓN (Activa - Usando la data oficial)
// ==========================================

export default function App() {
  return (
    //<FilterProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/concerts" element={<ConcertsScreen />} />
            {/* <Route path="/concert/:id" element={<ConcertDetails />} /> */}
{/*             <Route path="/concert/:id/description" element={<ConcertDescription />} />
 */}            {/* <Route path="/concert/:id/communities" element={<Communities />} /> */}
            <Route path="/profile" element={<ProfileScreen />} />
          </Routes>
        </MainLayout>
      </Router>
    //</FilterProvider>
  );
}