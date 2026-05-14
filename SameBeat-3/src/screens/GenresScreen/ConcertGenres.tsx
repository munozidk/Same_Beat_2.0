import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ConcertGenres.module.css";

const genres = [
  { icon: "fa-regular fa-star",       label: "K-pop",       color: "yellow" },
  { icon: "fa-solid fa-microphone",   label: "Hip-Hop",     color: "purple" },
  { icon: "fa-solid fa-guitar",       label: "Rock",        color: "yellow" },
  { icon: "fa-solid fa-sliders",      label: "Electronica", color: "purple" },
  { icon: "fa-regular fa-heart",      label: "R&B",         color: "yellow" },
  { icon: "fa-solid fa-headphones",   label: "Soul",        color: "purple" },
  { icon: "fa-solid fa-music",        label: "Pop",         color: "yellow" },
  { icon: "fa-solid fa-fire",         label: "Reggaeton",   color: "purple" },
  { icon: "fa-regular fa-face-smile", label: "Indie",       color: "yellow" },
];

function normalize(str: string): string {

  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[-\s&]/g, "");

}

export default function ConcertGenres() {

  const navigate = useNavigate();

  const [search, setSearch] =
    useState<string>("");

  const [useLocation, setUseLocation] =
    useState<boolean>(true);

  const [selected, setSelected] =
    useState<Set<string>>(new Set());

  const filteredGenres = genres.filter((g) =>
    normalize(g.label).includes(
      normalize(search)
    )
  );

  const toggleGenre = (label: string) => {

    setSelected((prev) => {

      const next = new Set(prev);

      next.has(label)
        ? next.delete(label)
        : next.add(label);

      return next;

    });

  };

  const handleContinue = () => {

    localStorage.setItem(
      "selectedGenres",
      JSON.stringify([...selected])
    );

    localStorage.setItem(
      "useLocation",
      JSON.stringify(useLocation)
    );

    navigate("/home");

  };

  return (

    <div className={styles.wrapper}>

      {/* FONT AWESOME */}

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />

      {/* SVG FILTER */}

      <svg
        className={styles.svgHide}
        xmlns="http://www.w3.org/2000/svg"
      >

        <filter id="goo">

          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="45"
            result="blur"
          />

          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 35 -15
            "
            result="goo"
          />

        </filter>

      </svg>

      {/* BACKGROUND */}

      <div className={styles.gooeyContainer}>

        <div
          className={`${styles.blob} ${styles.blob1}`}
        />

        <div
          className={`${styles.blob} ${styles.blob2}`}
        />

        <div
          className={`${styles.blob} ${styles.blob3}`}
        />

        <div
          className={`${styles.blob} ${styles.blob4}`}
        />

        <div
          className={`${styles.blob} ${styles.blob5}`}
        />

      </div>

      {/* MAIN */}

      <main className={styles.container}>

        <h1 className={styles.title}>
          Pick concerts
        </h1>

        <p className={styles.subtitle}>
          Select one or more genres you enjoy.
        </p>

        {/* SEARCH */}

        <div className={styles.searchBox}>

          <i
            className={`
              fa-solid fa-magnifying-glass
              ${styles.searchIcon}
            `}
          />

          <input
            type="text"
            placeholder="Search genres..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* LOCATION */}

        <div className={styles.locationBox}>

          <span>
            Use my location
          </span>

          <button
            className={`
              ${styles.switch}
              ${
                useLocation
                  ? styles.switchActive
                  : ""
              }
            `}
            onClick={() =>
              setUseLocation(!useLocation)
            }
          >

            <div className={styles.switchCircle} />

          </button>

        </div>

        {/* GENRES */}

        <section className={styles.genresGrid}>

          {filteredGenres.map((genre) => {

            const isSelected =
              selected.has(genre.label);

            return (

              <button
                key={genre.label}
                onClick={() =>
                  toggleGenre(genre.label)
                }
                className={`
                  ${styles.genreCard}
                  ${
                    isSelected
                      ? styles.genreSelected
                      : ""
                  }
                `}
              >

                <i
                  className={`
                    ${genre.icon}
                    ${styles.genreIcon}
                  `}
                />

                <span>
                  {genre.label}
                </span>

              </button>

            );

          })}

        </section>

        {/* BUTTON */}

        <button
          className={styles.continueBtn}
          onClick={handleContinue}
          disabled={selected.size === 0}
        >

          Continue

        </button>

      </main>

    </div>
  );
}