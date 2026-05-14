import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { House, Ticket, Plus, Compass, User } from 'lucide-react';
import './BottomNav.css';

const BottomNav: React.FC = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const isHomeActive = pathname === '/home';
    const isConcertsActive =
        pathname === '/concerts' || /^\/concert(\/|$)/.test(pathname);
    const isDiscoverActive = pathname === '/discover';
    const isProfileActive = pathname === '/profile' || pathname.startsWith('/profile/');

    return (
        <nav className="bottom-nav" aria-label="Primary mobile navigation">
            <div className="nav-pill--left">
                <button
                    type="button"
                    className={`nav-btn${isHomeActive ? ' active-btn' : ''}`}
                    onClick={() => navigate('/home')}
                    aria-current={isHomeActive ? 'page' : undefined}
                    aria-label="Home"
                >
                    <House size={22} />
                </button>
                <button
                    type="button"
                    className={`nav-btn${isConcertsActive ? ' active-btn' : ''}`}
                    onClick={() => navigate('/concerts')}
                    aria-current={isConcertsActive ? 'page' : undefined}
                    aria-label="Concerts"
                >
                    <Ticket size={22} />
                </button>
            </div>

            <div className="bottom-nav__center">
                <button type="button" className="floating-add-btn" aria-label="Add">
                    <Plus size={28} />
                </button>
            </div>

            <div className="nav-pill--right">
                <button
                    type="button"
                    className={`nav-btn${isDiscoverActive ? ' active-btn' : ''}`}
                    onClick={() => navigate('/discover')}
                    aria-current={isDiscoverActive ? 'page' : undefined}
                    aria-label="Discover"
                >
                    <Compass size={22} />
                </button>
                <button
                    type="button"
                    className={`nav-btn${isProfileActive ? ' active-btn' : ''}`}
                    onClick={() => navigate('/profile')}
                    aria-current={isProfileActive ? 'page' : undefined}
                    aria-label="Profile"
                >
                    <User size={22} />
                </button>
            </div>
        </nav>
    );
};

export default BottomNav;
