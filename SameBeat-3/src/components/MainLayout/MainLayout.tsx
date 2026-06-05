import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import SideBar from '../SideBar/Sidebar';
import LocationToggle from '../LocationToggle/LocationToggle';
import FilterBar from '../FilterBar/FilterBar';
import TopBar from '../TopBar/TopBar';
import BottomNav from '../BottomNav/BottomNav';
import ChatList from '../ChatList/ChatList';
import NowPlaying from '../NowPLaying/NowPlaying';
import PostModal from '../PostModal/PostModal';
import { useFilter } from '../../contexts/FilterContext';
import { usePostContext } from '../../contexts/PostContext';
import { chats } from '../../data/index';
import { DEFAULT_AVATAR } from '../../lib/profileUtils';
import { useSeedProfiles } from '../../hooks/useSeedProfiles';
import { useSongs } from '../../hooks/useSongs';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isConcertsScreen = location.pathname === '/concerts';
  const isConcertDescriptionScreen = /^\/concert\/\d+\/description$/.test(location.pathname);

  const { selectedGenres, toggleGenre, allGenres } = useFilter();
  const { profiles: seedProfiles } = useSeedProfiles();

  // Canciones para el reproductor lateral desde Supabase.
  const { songs } = useSongs();

  const showRightPanel = ['/home', '/concerts', '/profile', '/discover'].includes(location.pathname);
  const { posts, addPost, modalOpen, setModalOpen } = usePostContext();

  const chatPreviews = useMemo(() => chats.slice(0, 3).map((chat, index) => {
    const profile = seedProfiles[index];

    return {
      id: chat.id,
      name: profile?.username || profile?.full_name || 'Unknown',
      image: profile?.avatar_url || DEFAULT_AVATAR,
    };
  }), [seedProfiles]);

  return (
    <div className="app-container screen-container">
      <div className="desktop-layout">
        <header className="header" />

        <div className="desktop-body">
          <SideBar />

          <main className="center-content">
            {isConcertsScreen && (
              <section className="concerts-controls">
                <TopBar title="Concerts" />
                <div className="filters-container">
                  <LocationToggle />
                  <FilterBar
                    genres={allGenres}
                    selectedGenres={selectedGenres}
                    onToggleGenre={toggleGenre}
                  />
                </div>
              </section>
            )}

            <section className={`main-content ${!isConcertsScreen ? 'full-height' : ''}`}>
              <div className="main-content-scroll">
                {children}
              </div>
            </section>
          </main>

          {showRightPanel && (
            <aside className="right-panel">
              <section className="right-panel-top">
                <ChatList chats={chatPreviews} />
              </section>

              <section className="right-panel-bottom">
                <NowPlaying songs={songs} />
              </section>
            </aside>
          )}
        </div>
      </div>

      <div className="mobile-layout">
        <main className="mobile-main-content">
          {isConcertsScreen && (
            <div className="mobile-concerts-stack">
              <TopBar title="Concerts" />
              <div className="mobile-filters-top">
                <div className="flex justify-center py-4">
                  <LocationToggle />
                </div>

                <FilterBar
                  genres={allGenres}
                  selectedGenres={selectedGenres}
                  onToggleGenre={toggleGenre}
                />
              </div>
            </div>
          )}

          {children}
        </main>

        {!isConcertDescriptionScreen && <BottomNav />}
      </div>

      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addPost}
        currentPosts={posts}
      />
    </div>
  );
};

export default MainLayout;