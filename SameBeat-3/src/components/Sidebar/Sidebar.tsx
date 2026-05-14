import "./Sidebar.css";
import { usePostContext } from "../../contexts/PostContext";

// Logo
import mockis from "../../assets/mockis.png";

// React
import {
  useState,
  useRef,
} from "react";

// React Router
import {
  useNavigate,
} from "react-router-dom";

// =========================
// ICONOS
// =========================

import {
  House,
  Ticket,
  Headphones,
  UserRound,
  Plus,
  LogOut,
  Pencil,
  Music,
  Video,
  Image as ImageIcon,
} from "lucide-react";

/* 
  COMPONENTE SIDEBAR
  
  Este componente maneja:
  
  - navegación
  - dropdown create
  - subida de imágenes
  - subida de videos
  - subida de canciones mp3

  El modal y los posts viven en HomeScreen
  a través de PostContext
*/

const Sidebar = () => {

  // =========================
  // CONTEXT
  // =========================

  const { setModalOpen } = usePostContext();

  // =========================
  // NAVIGATION
  // =========================

  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  // Botón activo
  const [active, setActive] =
    useState("Home");

  // Mostrar dropdown create
  const [
    showCreateMenu,
    setShowCreateMenu,
  ] = useState(false);

  // =========================
  // REFS
  // =========================

  // Input imagen
  const imageInputRef =
    useRef<HTMLInputElement | null>(null);

  // Input video
  const videoInputRef =
    useRef<HTMLInputElement | null>(null);

  // Input canción
  const songInputRef =
    useRef<HTMLInputElement | null>(null);

  // =========================
  // IMAGE UPLOAD
  // =========================

  const handleImageUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    // Archivo seleccionado
    const file =
      event.target.files?.[0];

    // Validación
    if (!file) return;

    // Abrimos modal via context
    setShowCreateMenu(false);

    setModalOpen(true);
  };

  // =========================
  // VIDEO UPLOAD
  // =========================

  const handleVideoUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    // Archivo seleccionado
    const file =
      event.target.files?.[0];

    // Validación
    if (!file) return;

    // Abrimos modal via context
    setShowCreateMenu(false);

    setModalOpen(true);
  };

  // =========================
  // SONG UPLOAD
  // =========================

  /* 
    Permite subir
    canciones mp3
  */

  const handleSongUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    // Archivo seleccionado
    const file =
      event.target.files?.[0];

    // Validación
    if (!file) return;

    // Abrimos modal via context
    setShowCreateMenu(false);

    setModalOpen(true);
  };

  return (

    <>
      {/* =========================
           SIDEBAR
      ========================= */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="sidebar__logo">

          <img
            src={mockis}
            alt="Mockis"
            className="sidebar__logo-img"
          />

        </div>

        {/* TOP */}

        <div className="sidebar__top">

          {/* NAVIGATION */}

          <nav
            className="sidebar__nav"
            aria-label="Navegación principal"
          >

            {/* HOME */}

            <button
              className={`sidebar__nav-btn ${
                active === "Home"
                  ? "active"
                  : ""
              }`}
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
              className={`sidebar__nav-btn ${
                active === "Concerts"
                  ? "active"
                  : ""
              }`}
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
              className={`sidebar__nav-btn ${
                active === "Music"
                  ? "active"
                  : ""
              }`}
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
              className={`sidebar__nav-btn ${
                active === "Profile"
                  ? "active"
                  : ""
              }`}
              onClick={() => {

                setActive("Profile");

                navigate("/profile");

              }}
            >

              <UserRound size={22} />

              <span>Profile</span>

            </button>

            {/* =========================
                 CREATE DROPDOWN
            ========================= */}

            <div className="sidebar__dropdown">

              {/* BOTÓN CREATE */}

              <button
                className={`sidebar__nav-btn create-btn ${
                  active === "Create"
                    ? "active"
                    : ""
                }`}
                onClick={() => {

                  setActive("Create");

                  setShowCreateMenu(
                    !showCreateMenu
                  );

                }}
              >

                <Plus size={22} />

                <span>Create</span>

              </button>

              {/* MENU */}

              {showCreateMenu && (

                <div className="sidebar__dropdown-menu">

                  {/* POST */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() => {

                      console.log("click en Post"); // 👈

                      setModalOpen(true);

                      setShowCreateMenu(false);

                    }}
                  >

                    <Pencil size={18} />

                    <span>Post</span>

                  </button>

                  {/* SONG */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() =>

                      // Abrimos selector mp3
                      songInputRef.current?.click()

                    }
                  >

                    <Music size={18} />

                    <span>Song</span>

                  </button>

                  {/* VIDEO */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() =>

                      videoInputRef.current?.click()

                    }
                  >

                    <Video size={18} />

                    <span>Video</span>

                  </button>

                  {/* PHOTO */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() =>

                      imageInputRef.current?.click()

                    }
                  >

                    <ImageIcon size={18} />

                    <span>Photo</span>

                  </button>

                </div>

              )}

            </div>

            {/* =========================
                 INPUT IMAGEN
            ========================= */}

            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* =========================
                 INPUT VIDEO
            ========================= */}

            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoUpload}
            />

            {/* =========================
                 INPUT SONG MP3
            ========================= */}

            <input
              type="file"
              accept="audio/mp3,audio/mpeg"
              ref={songInputRef}
              style={{ display: "none" }}
              onChange={handleSongUpload}
            />

            {/* LOGOUT */}

            <button className="sidebar__logout-btn">

              <LogOut size={22} />

              <span>Logout</span>

            </button>

          </nav>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;