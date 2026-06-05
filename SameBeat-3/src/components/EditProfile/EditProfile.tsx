import { useState } from "react";
import { Camera } from "lucide-react";
import './SEditProfile.css';
import type { UserProfile } from "../../types/index"; // importa el ts global
import { imageMap } from "../../utils/imageMap";

interface Toggle {
  id: string;
  label: string;
  value: boolean;
}

interface Props {
  initialData: UserProfile;
  onSave: (data: UserProfile) => void | Promise<void>;
  isSaving?: boolean;
}

export default function EditProfile({ initialData, onSave, isSaving = false }: Props) {
  const [form, setForm] = useState<UserProfile>(initialData);
  const profileImage = form.image ? imageMap[form.image] ?? form.image : "";
  const [toggles, setToggles] = useState<Toggle[]>([
    { id: 'spotify', label: 'Connect with Spotify', value: true },
    { id: 'topTrack', label: 'Mostrar top 1 track', value: true },
    { id: 'location', label: 'Mostrar ubicación', value: false }
  ]);

  function handleChange(field: keyof UserProfile, value: string | number) {
    setForm({ ...form, [field]: value });
  }

  function handleToggle(id: string) {
    setToggles(toggles.map(t =>
      t.id === id ? { ...t, value: !t.value } : t
    ));
  }

  async function handleSave() {
    await onSave(form);
  }

  return (
    <div className="edit-profile">
      {/* Foto de perfil */}
      <div className="edit-profile__photo-section">
        <div className="edit-profile__avatar-wrapper">
          <img
            src={profileImage}
            alt="Profile"
            className="edit-profile__avatar"
          />
          <div className="edit-profile__avatar-overlay">
            <Camera size={24} stroke="white" />
          </div>
        </div>
        <button className="edit-profile__photo-btn">Editar Foto</button>
      </div>

      {/* Campos */}
      <div className="edit-profile__fields">
        <div className="edit-profile__field">
          <label className="edit-profile__label">Nombre</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Nombre de usuario</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.username}
            onChange={e => handleChange('username', e.target.value)}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Edad</label>
          <input
            type="number"
            className="edit-profile__input"
            value={form.age}
            onChange={e => handleChange('age', parseInt(e.target.value))}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Presentación</label>
          <textarea
            className="edit-profile__textarea"
            value={form.bio}
            onChange={e => handleChange('bio', e.target.value)}
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Ciudad</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.city}
            onChange={e => handleChange('city', e.target.value)}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">País</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.country}
            onChange={e => handleChange('country', e.target.value)}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Artista favorito</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.favoriteArtist}
            onChange={e => handleChange('favoriteArtist', e.target.value)}
          />
        </div>

        <div className="edit-profile__field">
          <label className="edit-profile__label">Canción favorita</label>
          <input
            type="text"
            className="edit-profile__input"
            value={form.favoriteSong}
            onChange={e => handleChange('favoriteSong', e.target.value)}
          />
        </div>
      </div>

      {/* Toggles */}
      <div className="edit-profile__toggles">
        {toggles.map(toggle => (
          <div key={toggle.id} className="edit-profile__toggle-row">
            <span className="edit-profile__toggle-label">{toggle.label}</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={toggle.value}
                onChange={() => handleToggle(toggle.id)}
              />
              <span className="toggle-switch__track" />
            </label>
          </div>
        ))}
      </div>

      {/* Guardar */}
      <button
        className="edit-profile__save-btn"
        onClick={() => void handleSave()}
        disabled={isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
