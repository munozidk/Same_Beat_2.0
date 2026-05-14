import { useNavigate } from "react-router-dom";
import profileData from "../../data/profile/userProfile.json";
import type { UserProfile } from "../../types/index";
import EditProfile from "../../components/EditProfile/EditProfile";
import BackButton from "../../components/BackButton/BackButton";
import "./SEditProfileScreen.css";

export default function EditProfileScreen() {
  const navigate = useNavigate();

  function handleSave(data: UserProfile) {
    // Aquí recibes el objeto con los cambios del usuario
    console.log("Saving Profile: ", data);

    // Podrías actualizar un estado global o contexto con `data`
    // y luego volver al perfil
    navigate("/profile");
  }

  return (
    <div className="edit-profile-screen">
      {/* Flecha de regreso */}
      <BackButton onClick={() => navigate("/profile")} />

      {/* Formulario de edición */}
      <EditProfile
        initialData={profileData[0] as UserProfile}
        onSave={handleSave}
      />
    </div>
  );
}
