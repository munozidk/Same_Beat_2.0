import React, { useState, useRef } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  House,
  Ticket,
  Plus,
  Compass,
  User,
  Pencil,
  Music,
  Video,
  Image as ImageIcon,
  X,
} from "lucide-react";

import "./BottomNav.css";

const BottomNav: React.FC = () => {

  const navigate = useNavigate();

  const { pathname } = useLocation();

  /* =========================
     ACTIVE ROUTES
  ========================= */

  const isHomeActive =
    pathname === "/" ||
    pathname === "/home";

  const isConcertsActive =
    pathname === "/concerts" ||
    /^\/concert(\/|$)/.test(pathname);

  const isDiscoverActive =
    pathname === "/discover";

  const isProfileActive =
    pathname === "/profile" ||
    pathname.startsWith("/profile/");

  /* =========================
     STATES
  ========================= */

  // Abre / cierra menú flotante
  const [showCreateMenu, setShowCreateMenu] =
    useState(false);

  // Modal post
  const [showPostModal, setShowPostModal] =
    useState(false);

  // Texto post
  const [postText, setPostText] =
    useState("");

  // Imagen seleccionada
  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  // Video seleccionado
  const [selectedVideo, setSelectedVideo] =
    useState<string | null>(null);

  // Canción seleccionada
  const [selectedSong, setSelectedSong] =
    useState<string | null>(null);

  // Referencias inputs
  const imageInputRef =
    useRef<HTMLInputElement | null>(null);

  const videoInputRef =
    useRef<HTMLInputElement | null>(null);

  const songInputRef =
    useRef<HTMLInputElement | null>(null);

  /* =========================
     IMAGE UPLOAD
  ========================= */

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    setSelectedImage(imageUrl);

    setSelectedVideo(null);

    setSelectedSong(null);

    setShowCreateMenu(false);

    setShowPostModal(true);
  };

  /* =========================
     VIDEO UPLOAD
  ========================= */

  const handleVideoUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const videoUrl =
      URL.createObjectURL(file);

    setSelectedVideo(videoUrl);

    setSelectedImage(null);

    setSelectedSong(null);

    setShowCreateMenu(false);

    setShowPostModal(true);
  };

  /* =========================
     SONG UPLOAD
  ========================= */

  const handleSongUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) return;

    const songUrl =
      URL.createObjectURL(file);

    setSelectedSong(songUrl);

    setSelectedImage(null);

    setSelectedVideo(null);

    setShowCreateMenu(false);

    setShowPostModal(true);
  };

  /* =========================
     CREATE POST
  ========================= */

  const handleCreatePost = () => {

    console.log({

      text: postText,

      image: selectedImage,

      video: selectedVideo,

      song: selectedSong,
    });

    // Cierra modal
    setShowPostModal(false);

    // Limpia contenido
    setPostText("");

    setSelectedImage(null);

    setSelectedVideo(null);

    setSelectedSong(null);
  };

  return (

    <>
      <nav
        className="bottom-nav"
        aria-label="Primary mobile navigation"
      >

        {/* LEFT PILL */}

        <div className="nav-pill--left">

          {/* HOME */}

          <button
            type="button"
            className={`nav-btn ${
              isHomeActive
                ? "active-btn"
                : ""
            }`}
            onClick={() =>
              navigate("/home")
            }
            aria-current={
              isHomeActive
                ? "page"
                : undefined
            }
            aria-label="Home"
          >

            <House size={22} />

          </button>

          {/* CONCERTS */}

          <button
            type="button"
            className={`nav-btn ${
              isConcertsActive
                ? "active-btn"
                : ""
            }`}
            onClick={() =>
              navigate("/concerts")
            }
            aria-current={
              isConcertsActive
                ? "page"
                : undefined
            }
            aria-label="Concerts"
          >

            <Ticket size={22} />

          </button>

        </div>

        {/* =========================
           CENTER BUTTON
        ========================= */}

        <div className="bottom-nav__center">

          {/* MENU FLOATING */}

          {showCreateMenu && (

            <div className="mobile-create-menu">

              {/* PHOTO */}

              <button
                className="mobile-create-item"
                onClick={() =>
                  imageInputRef.current?.click()
                }
              >

                <ImageIcon size={22} />

              </button>

              {/* VIDEO */}

              <button
                className="mobile-create-item"
                onClick={() =>
                  videoInputRef.current?.click()
                }
              >

                <Video size={22} />

              </button>

              {/* SONG */}

              <button
                className="mobile-create-item"
                onClick={() =>
                  songInputRef.current?.click()
                }
              >

                <Music size={22} />

              </button>

              {/* POST */}

              <button
                className="mobile-create-item"
                onClick={() => {

                  setShowPostModal(true);

                  setShowCreateMenu(false);

                }}
              >

                <Pencil size={22} />

              </button>

            </div>

          )}

          {/* MAIN BUTTON */}

          <button
            type="button"
            className={`floating-add-btn ${
              showCreateMenu
                ? "floating-add-btn--active"
                : ""
            }`}
            aria-label="Add"
            onClick={() =>
              setShowCreateMenu(
                !showCreateMenu
              )
            }
          >

            {showCreateMenu ? (

              <X size={28} />

            ) : (

              <Plus size={28} />

            )}

          </button>

        </div>

        {/* RIGHT PILL */}

        <div className="nav-pill--right">

          {/* DISCOVER */}

          <button
            type="button"
            className={`nav-btn ${
              isDiscoverActive
                ? "active-btn"
                : ""
            }`}
            onClick={() =>
              navigate("/discover")
            }
            aria-current={
              isDiscoverActive
                ? "page"
                : undefined
            }
            aria-label="Discover"
          >

            <Compass size={22} />

          </button>

          {/* PROFILE */}

          <button
            type="button"
            className={`nav-btn ${
              isProfileActive
                ? "active-btn"
                : ""
            }`}
            onClick={() =>
              navigate("/profile")
            }
            aria-current={
              isProfileActive
                ? "page"
                : undefined
            }
            aria-label="Profile"
          >

            <User size={22} />

          </button>

        </div>

      </nav>

      {/* =========================
         INPUTS OCULTOS
      ========================= */}

      <input
        type="file"
        accept="image/*"
        ref={imageInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />

      <input
        type="file"
        accept="video/*"
        ref={videoInputRef}
        style={{ display: "none" }}
        onChange={handleVideoUpload}
      />

      <input
        type="file"
        accept=".mp3,audio/*"
        ref={songInputRef}
        style={{ display: "none" }}
        onChange={handleSongUpload}
      />

      {/* =========================
         MODAL
      ========================= */}

      {showPostModal && (

        <div className="create-post-modal">

          {/* OVERLAY */}

          <div
            className="create-post-overlay"
            onClick={() =>
              setShowPostModal(false)
            }
          ></div>

          {/* CONTENT */}

          <div className="create-post-content">

            {/* HEADER */}

            <div className="create-post-header">

              <h2>New post</h2>

              <button
                className="close-modal-btn"
                onClick={() =>
                  setShowPostModal(false)
                }
              >

                <X size={20} />

              </button>

            </div>

            {/* TEXT */}

            <textarea
              placeholder="How was the concert?"
              value={postText}
              onChange={(e) =>
                setPostText(e.target.value)
              }
            />

            {/* IMAGE */}

            {selectedImage && (

              <img
                src={selectedImage}
                alt="preview"
                className="post-preview-image"
              />

            )}

            {/* VIDEO */}

            {selectedVideo && (

              <video
                src={selectedVideo}
                controls
                className="post-preview-video"
              />

            )}

            {/* SONG */}

            {selectedSong && (

              <audio
                src={selectedSong}
                controls
                className="post-preview-audio"
              />

            )}

            {/* BUTTON */}

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

export default BottomNav;