import { useNavigate } from "react-router-dom";
import type { UserProfile } from "../../types/index";
import EditProfile from "../../components/EditProfile/EditProfile";
import BackButton from "../../components/BackButton/BackButton";
import { useUserProfile } from "../../contexts/UserProfileContext";
import "./SEditProfileScreen.css";

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { userProfile, updateUserProfile } = useUserProfile();

  function handleSave(data: UserProfile) {
    updateUserProfile(data);
    navigate("/profile");
  }

  return (
    <div className="edit-profile-screen">
      <BackButton onClick={() => navigate("/profile")} />

      <EditProfile
        initialData={userProfile}
        onSave={handleSave}
      />
    </div>
  );
}
