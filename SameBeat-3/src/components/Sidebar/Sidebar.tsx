import "./Sidebar.css";

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
  X,
} from "lucide-react";

/* 
  COMPONENTE SIDEBAR
  
  Este componente maneja:
  
  - navegación
  - dropdown create
  - modal para crear posts
  - subida de imágenes
  - subida de videos
*/

const Sidebar = () => {

  // =========================
  // NAVIGATION
  // =========================

  /* 
    useNavigate
    
    Sirve para movernos
    entre páginas
  */
  const navigate = useNavigate();

  // =========================
  // STATES
  // =========================

  /* 
    active
    
    Guarda el botón
    activo del sidebar
    
    Ejemplo:
    Home, Concerts, etc
  */
  const [active, setActive] =
    useState("Home");

  /* 
    showCreateMenu
    
    Abre o cierra
    el menú dropdown
    del botón Create
  */
  const [
    showCreateMenu,
    setShowCreateMenu,
  ] = useState(false);

  /* 
    showPostModal
    
    Controla si el modal
    de crear post está abierto
  */
  const [
    showPostModal,
    setShowPostModal,
  ] = useState(false);

  /* 
    postText
    
    Guarda el texto
    escrito en el textarea
  */
  const [postText, setPostText] =
    useState("");

  /* 
    selectedImage
    
    Guarda la imagen
    seleccionada por el usuario
  */
  const [
    selectedImage,
    setSelectedImage,
  ] = useState<string | null>(null);

  /* 
    selectedVideo
    
    Guarda el video
    seleccionado por el usuario
  */
  const [
    selectedVideo,
    setSelectedVideo,
  ] = useState<string | null>(null);

  // =========================
  // REFS
  // =========================

  /* 
    imageInputRef
    
    Referencia al input file
    de imágenes
    
    Nos permite abrirlo
    desde un botón
  */
  const imageInputRef =
    useRef<HTMLInputElement | null>(null);

  /* 
    videoInputRef
    
    Referencia al input file
    de videos
  */
  const videoInputRef =
    useRef<HTMLInputElement | null>(null);

  // =========================
  // IMAGE UPLOAD
  // =========================

  /* 
    Esta función se ejecuta
    cuando el usuario
    selecciona una imagen
  */
  const handleImageUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    // Obtenemos el archivo
    const file =
      event.target.files?.[0];

    // Si no hay archivo
    // detenemos función
    if (!file) return;

    /* 
      URL.createObjectURL
      
      Convierte el archivo
      en una URL temporal
      
      para poder mostrarlo
      en pantalla
    */
    const imageUrl =
      URL.createObjectURL(file);

    // Guardamos imagen
    setSelectedImage(imageUrl);

    // Eliminamos video
    setSelectedVideo(null);

    // Cerramos dropdown
    setShowCreateMenu(false);

    // Abrimos modal
    setShowPostModal(true);
  };

  // =========================
  // VIDEO UPLOAD
  // =========================

  /* 
    Funciona igual
    que image upload
    
    pero para videos
  */
  const handleVideoUpload = (

    event: React.ChangeEvent<HTMLInputElement>

  ) => {

    // Archivo seleccionado
    const file =
      event.target.files?.[0];

    // Validación
    if (!file) return;

    // Creamos URL temporal
    const videoUrl =
      URL.createObjectURL(file);

    // Guardamos video
    setSelectedVideo(videoUrl);

    // Limpiamos imagen
    setSelectedImage(null);

    // Cerramos menú
    setShowCreateMenu(false);

    // Abrimos modal
    setShowPostModal(true);
  };

  // =========================
  // CREATE POST
  // =========================

  /* 
    Esta función se ejecuta
    cuando el usuario
    publica un post
  */
  const handleCreatePost = () => {

    /* 
      Por ahora solo hacemos
      console.log
      
      después esto se conecta
      al Home
    */
    console.log({

      text: postText,

      image: selectedImage,

      video: selectedVideo,

    });

    // Cerramos modal
    setShowPostModal(false);

    // Limpiamos textarea
    setPostText("");

    // Limpiamos imagen
    setSelectedImage(null);

    // Limpiamos video
    setSelectedVideo(null);
  };

  // =========================
  // JSX
  // =========================

  return (

    <>
      {/* =========================
           SIDEBAR
      ========================= */}

      <aside className="sidebar">

        {/* =========================
             LOGO
        ========================= */}

        <div className="sidebar__logo">

          <img
            src={mockis}
            alt="Mockis"
            className="sidebar__logo-img"
          />

        </div>

        {/* =========================
             TOP SECTION
        ========================= */}

        <div className="sidebar__top">

          {/* =========================
               NAVIGATION
          ========================= */}

          <nav
            className="sidebar__nav"
            aria-label="Navegación principal"
          >

            {/* =========================
                 HOME
            ========================= */}

            <button
              className={`sidebar__nav-btn ${
                active === "Home"
                  ? "active"
                  : ""
              }`}
              onClick={() => {

                // Cambiamos estado activo
                setActive("Home");

                // Navegamos página
                navigate("/home");

              }}
            >

              <House size={22} />

              <span>Home</span>

            </button>

            {/* =========================
                 CONCERTS
            ========================= */}

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

            {/* =========================
                 MUSIC
            ========================= */}

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

            {/* =========================
                 PROFILE
            ========================= */}

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

              {/* 
                BOTÓN CREATE
                
                Abre o cierra
                el dropdown
              */}

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

              {/* =========================
                   MENU DROPDOWN
              ========================= */}

              {showCreateMenu && (

                <div className="sidebar__dropdown-menu">

                  {/* =========================
                       POST
                  ========================= */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() => {


                      // Abrimos modal
                      setShowPostModal(true);

                      console.log("click en Post"); 

                      setModalOpen(true);

                      // Cerramos dropdown
                      setShowCreateMenu(false);

                    }}
                  >

                    <Pencil size={18} />

                    <span>Post</span>

                  </button>

                  {/* =========================
                      SONG
                  ========================= */}

<button
  className="sidebar__dropdown-item"
  onClick={() =>

    // Abrimos selector canciones
    songInputRef.current?.click()

  }
>dc

  <Music size={18} />

  <span>Song</span>

</button>

                  {/* =========================
                       VIDEO
                  ========================= */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() =>

                      // Abrimos selector videos
                      videoInputRef.current?.click()

                    }
                  >

                    <Video size={18} />

                    <span>Video</span>

                  </button>

                  {/* =========================
                       PHOTO
                  ========================= */}

                  <button
                    className="sidebar__dropdown-item"
                    onClick={() =>

                      // Abrimos selector imágenes
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
                 INPUT IMAGEN OCULTO
            ========================= */}

            <input
              type="file"
              accept="image/*"
              ref={imageInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            {/* =========================
                 INPUT VIDEO OCULTO
            ========================= */}

            <input
              type="file"
              accept="video/*"
              ref={videoInputRef}
              style={{ display: "none" }}
              onChange={handleVideoUpload}
            />

            {/* =========================
                 LOGOUT
            ========================= */}

            <input
              type="file"
              accept="audio/mp3,audio/mpeg"
              ref={songInputRef}
              style={{ display: "none" }}
              onChange={handleSongUpload}
            />

            {/* LOGOUT */}

            <button 
            className="sidebar__logout-btn"
            onClick={() => navigate('/login')}
            >

              <LogOut size={22} />

              <span>Logout</span>

            </button>

          </nav>

        </div>

      </aside>

      {/* =========================
           MODAL CREATE POST
      ========================= */}

      {showPostModal && (

        <div className="create-post-modal">

          {/* 
            OVERLAY
            
            Fondo oscuro
            
            al darle click
            se cierra modal
          */}

          <div
            className="create-post-overlay"
            onClick={() =>

              setShowPostModal(false)

            }
          ></div>

          {/* =========================
               CONTENIDO MODAL
          ========================= */}

          <div className="create-post-content">

            {/* HEADER */}

            <div className="create-post-header">

              <h2>New post</h2>

              {/* BOTÓN CERRAR */}

              <button
                className="close-modal-btn"
                onClick={() =>

                  setShowPostModal(false)

                }
              >

                <X size={20} />

              </button>

            </div>

            {/* =========================
                 TEXTAREA
            ========================= */}

            <textarea
              placeholder="How was the concert?"
              value={postText}
              onChange={(e) =>

                setPostText(e.target.value)

              }
            />

            {/* =========================
                 PREVIEW IMAGEN
            ========================= */}

            {selectedImage && (

              <img
                src={selectedImage}
                alt="preview"
                className="post-preview-image"
              />

            )}

            {/* =========================
                 PREVIEW VIDEO
            ========================= */}

            {selectedVideo && (

              <video
                src={selectedVideo}
                controls
                className="post-preview-video"
              />

            )}

            {/* =========================
                 BOTÓN PUBLICAR
            ========================= */}

            <button
              className="publish-post-btn"
              onClick={handleCreatePost}
            >

              Post

            </button>

          </div>

        </div>

      )}
    </>
  );
};

// Exportamos componente
export default Sidebar;