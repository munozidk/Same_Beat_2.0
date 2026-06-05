import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../../types/index";
import EditProfile from "../../components/EditProfile/EditProfile";
import BackButton from "../../components/BackButton/BackButton";
import { useUserProfile } from "../../contexts/UserProfileContext";
import "./SEditProfileScreen.css";

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { userProfile, saveUserProfile } = useUserProfile();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(data: UserProfile) {
    setError("");
    setIsSaving(true);

    const result = await saveUserProfile(data);

    setIsSaving(false);

    if (!result.ok) {
      setError(result.error ?? "Could not save profile changes.");
      return;
    }

    navigate("/profile");
  }

  return (
    <div className="edit-profile-screen">
      <BackButton onClick={() => navigate("/profile")} />

      {error && <p className="edit-profile-screen__error">{error}</p>}

      <EditProfile
        initialData={userProfile}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
}
