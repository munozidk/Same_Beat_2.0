import styles from "./OnboardingScreen.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import logoSvg from "../../assets/SameBeat-Name.svg";
import mascotSvg from "../../assets/Mocki-Welcome.svg";

const CARDS = [
  {
    id: "c0",
    icon: "🎧",
    title: (
      <>
        Let's discover <span>your tastes</span>
      </>
    ),
    desc: "Answer a few questions to find your music match.",
  },

  {
    id: "c1",
    icon: "🎵",
    title: (
      <>
        Your next music <span> journey here </span>
      </>
    ),
    desc: "Meet people and discover concerts you'll love.",
  },

  {
    id: "c2",
    icon: "💚",
    title: (
      <>
        Welcome to <span>SameBeat</span>
      </>
    ),
    desc: "Connect with music lovers from all around the world.",
  },

  {
    id: "c3",
    icon: "👥",
    title: (
      <>
        Find people who match <span>your vibe</span>
      </>
    ),
    desc: "Meet fans with your same music taste.",
  },

  {
    id: "c4",
    icon: "⭐",
    title: <>Never go <span> to aconcert alone.</span></>,
    desc: "Find people to enjoy live concerts with.",
  },
];

const POSITIONS = [
  "card-1",
  "card-2",
  "card-main",
  "card-4",
  "card-5",
] as const;

function OnboardingScreen() {
  const navigate = useNavigate();

  const [slots, setSlots] = useState<number[]>([
    0, 1, 2, 3, 4,
  ]);

  const handleCardClick = (
    posIdx: number
  ) => {
    const move = 2 - posIdx;

    if (move === 0) return;

    setSlots((prev) =>
      prev.map((p) => {
        let next = p + move;

        if (next > 4) next -= 5;
        if (next < 0) next += 5;

        return next;
      })
    );
  };

  return (
    <div className={styles.onboardingScreen}>

      {/* GOO FILTER */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={styles["onb-goo-svg"]}
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

      <div
        className={
          styles["onb-gooey-container"]
        }
      >
        <div
          className={`${styles["onb-blob"]} ${styles["onb-blob1"]}`}
        />

        <div
          className={`${styles["onb-blob"]} ${styles["onb-blob2"]}`}
        />

        <div
          className={`${styles["onb-blob"]} ${styles["onb-blob3"]}`}
        />

        <div
          className={`${styles["onb-blob"]} ${styles["onb-blob4"]}`}
        />

        <div className={styles["onb-blob5"]} />
      </div>

      {/* MAIN */}

      <main
        className={styles["onb-container"]}
      >

        {/* CIRCLE */}

        <div
          className={
            styles["onb-bottom-circle"]
          }
        />

        {/* LOGO */}

        <img
          src={logoSvg}
          alt="SameBeat Logo"
          className={styles["onb-logo"]}
        />

        {/* CARDS */}

        <section
          className={styles["onb-cards"]}
        >
          {CARDS.map((card, i) => (
            <article
              key={card.id}
              className={`
                ${styles["onb-card"]}
                ${styles[POSITIONS[slots[i]]]}
              `}
              onClick={() =>
                handleCardClick(slots[i])
              }
            >
              <div
                className={
                  styles["onb-icon-circle"]
                }
              >
                {card.icon}
              </div>

              <h2>{card.title}</h2>

              <p>{card.desc}</p>
            </article>
          ))}
        </section>

        {/* MASCOT */}

        <img
          src={mascotSvg}
          alt="Mascot"
          className={styles["onb-mascot"]}
        />

        {/* BUTTON */}

        <button
          className={styles["onb-btn"]}
          onClick={() =>
            navigate("/signup")
          }
        >
          Let's get started
        </button>

      </main>
    </div>
  );
}

export default OnboardingScreen;