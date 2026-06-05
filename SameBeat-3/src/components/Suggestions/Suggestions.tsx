import { Link } from "react-router-dom";
import "./Suggestions.css";
import { Plus } from "lucide-react";
import { resolveAsset } from "../../utils/imageMap";
import { DEFAULT_AVATAR } from "../../lib/profileUtils";
import { useSeedProfiles } from "../../hooks/useSeedProfiles";

const Suggestions = () => {
  const { profiles: suggestions } = useSeedProfiles(4);

  return (
    <section className="suggestions">
      <h2 className="suggestions__title">Suggestions</h2>

      <div className="suggestions__scroll">
        <Link to="/match" className="suggestion-card suggestion-card--add mobile-only">
          <h3>Make a match</h3>
          <div className="suggestion-card__add-btn">
            <Plus size={30} />
          </div>
        </Link>

        {suggestions.map((profile) => (
          <article key={String(profile.id)} className="suggestion-card">
            <img
              src={resolveAsset(profile.avatar_url || DEFAULT_AVATAR)}
              alt={profile.username || profile.full_name || "User"}
              className="suggestion-card__image"
            />
            <div className="suggestion-card__overlay">
              <h3>{profile.username || profile.full_name || "User"}</h3>
              <p>{profile.compatibility || ""}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Suggestions;
