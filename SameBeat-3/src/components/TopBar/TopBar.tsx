import { Bell, Settings } from "lucide-react"
import "./TopBar.css"
import SearchBar from "../SearchBar/SearchBar"
import { useFilter } from "../../contexts/FilterContext"
import { useUserProfile } from "../../contexts/UserProfileContext"
import { DEFAULT_AVATAR } from "../../lib/profileUtils"
import { resolveAsset } from "../../utils/imageMap"

interface TopBarProps {
  children?: React.ReactNode
  title?: string
}

const TopBar = ({ children, title = "Chats" }: TopBarProps) => {
  const { searchQuery, setSearchQuery } = useFilter();
  const { userProfile } = useUserProfile();
  const profileImage = resolveAsset(userProfile.image || DEFAULT_AVATAR);

  return (
    <header className="topbar">

      <div className="topbar__left">
        <h1>{title}</h1>
      </div>

      <div className="topbar__center">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar..."
        />
        {children}
      </div>

      <div className="topbar__actions">

        <div className="profile__avatar">
          <img
            src={profileImage}
            alt="profile"
          />
        </div>

        <button className="topbar__icon-btn">
          <Bell size={22} />
        </button>

        <button className="topbar__icon-btn">
          <Settings size={22} />
        </button>

      </div>

    </header>
  )
}

export default TopBar
