import { Link } from "react-router-dom";
import "./Suggestions.css";
import usersData from "../../data/users/users.json";
import { Plus } from "lucide-react";
import yoongi from "../../assets/yoongi.jpg";
import hyujin from "../../assets/hyujin.jpg";
import loliBahia from '../../assets/loliBahia.jpg';
import harry from '../../assets/harry.jpg';
import avatar3 from '../../assets/avatar 2.jpg';

const Suggestions = () => {
  const imageMap: Record<string, string> = {
    "/assets/yoongi.jpg": yoongi,
    "/assets/hyujin.jpg": hyujin,
    "/assets/loliBahia.jpg": loliBahia,
    "/assets/harry.jpg": harry,
    "/assets/avatar3.jpg": avatar3
  };

  const suggestions = usersData.slice(0, 4);

  return (
    <section className="suggestions">
      <h2 className="suggestions__title">Suggestions</h2>

      <div className="suggestions__scroll">
        {/* Card Make a Match solo en móvil */}
        <Link to="/match" className="suggestion-card suggestion-card--add mobile-only">
          <h3>Make a match</h3>
          <div className="suggestion-card__add-btn">
            <Plus size={30} />
          </div>
        </Link>

        {suggestions.map((user) => (
          <article key={user.id} className="suggestion-card">
            <img
              src={imageMap[user.image as keyof typeof imageMap]}
              alt={user.username}
              className="suggestion-card__image"
            />
            <div className="suggestion-card__overlay">
              <h3>{user.username}</h3>
              <p>{user.compatibility}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Suggestions;
