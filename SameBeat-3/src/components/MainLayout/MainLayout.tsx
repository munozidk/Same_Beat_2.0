import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../SideBar/Sidebar'
import LocationToggle from '../LocationToggle/LocationToggle';
import FilterBar from '../FilterBar/FilterBar';
import HeaderConcerts from '../HeaderConcerts/HeaderConcerts';
import BottomNav from '../BottomNav/BottomNav';
import ChatList from '../ChatList/ChatList';
import NowPlaying from '../NowPLaying/NowPlaying';
import PostModal from '../PostModal/PostModal';
import { useFilter } from '../../contexts/FilterContext';
import { usePostContext } from '../../contexts/PostContext';
import { chats, users, songs } from '../../data/index';
import './MainLayout.css';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {

    const location = useLocation();
    const isConcertsScreen = location.pathname === '/concerts';
    const { selectedGenres, toggleGenre, allGenres } = useFilter();

    // =========================
    // CONTEXT
    // =========================

    const { posts, addPost, modalOpen, setModalOpen } = usePostContext();

    // =========================
    // CHAT PREVIEWS
    // =========================

    const chatPreviews = chats.slice(0, 3).map(chat => {
        const user = users.find(u => u.id === chat.userId)
        return {
            id: chat.id,
            name: user?.username ?? 'Unknown',
            image: user?.image ?? ''
        }
    })

    return (
        <div className="app-container screen-container">

            {/* Desktop Layout */}
            <div className="desktop-layout">
                <header className="header">
                    
                </header>

                <div className="desktop-body">
                    <Sidebar />

                    <main className="center-content">
                        {isConcertsScreen && (
                            <section className="filters">
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

                    <aside className="right-panel">
                        <section className="right-panel-top">
                            <ChatList chats={chatPreviews} />
                        </section>
                        <section className="right-panel-bottom">
                            <NowPlaying songs={songs} />
                        </section>
                    </aside>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="mobile-layout">
                <main className="mobile-main-content">
                    {isConcertsScreen && (
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
                    )}
                    {children}
                </main>
                <BottomNav />
            </div>

            {/* =========================
                 MODAL — disponible en
                 desktop y mobile
            ========================= */}

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