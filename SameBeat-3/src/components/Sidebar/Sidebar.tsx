import "./Sidebar.css";
import mockis from "../../assets/mockis.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Icons
import {
  House,
  Ticket,
  Headphones,
  UserRound,
  Plus,
  LogOut
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("Home");

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar__logo">
        <img src={mockis} alt="Mockis" className="sidebar__logo-img" />
      </div>

      {/* TOP SECTION */}
      <div className="sidebar__top">
        {/* Navigation */}
        <nav className="sidebar__nav" aria-label="Navegación principal">
          {/* HOME */}
          <button
            className={`sidebar__nav-btn ${active === "Home" ? "active" : ""}`}
            onClick={() => {
              setActive("Home");
              navigate("/home");
            }}
          >
            <House size={22} />
            <span>Home</span>
          </button>

          {/* CONCERTS */}
          <button
            className={`sidebar__nav-btn ${active === "Concerts" ? "active" : ""}`}
            onClick={() => {
              setActive("Concerts");
              navigate("/concerts");
            }}
          >
            <Ticket size={22} />
            <span>Concerts</span>
          </button>

          {/* MUSIC */}
          <button
            className={`sidebar__nav-btn ${active === "Music" ? "active" : ""}`}
            onClick={() => {
              setActive("Music");
              navigate("/discover");
            }}
          >
            <Headphones size={22} />
            <span>Music</span>
          </button>

          {/* PROFILE */}
          <button
            className={`sidebar__nav-btn ${active === "Profile" ? "active" : ""}`}
            onClick={() => {
              setActive("Profile");
              navigate("/profile");
            }}
          >
            <UserRound size={22} />
            <span>Profile</span>
          </button>

          {/* CREATE */}
          <button
            className={`sidebar__nav-btn create-btn ${active === "Create" ? "active" : ""}`}
            onClick={() => {
              setActive("Create");
              navigate("/create");
            }}
          >
            <Plus size={22} />
            <span>Create</span>
          </button>

          {/* LOGOUT */}
          <button className="sidebar__logout-btn">
            <LogOut size={22} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
