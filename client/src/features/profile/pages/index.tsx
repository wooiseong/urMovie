import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useUpdateUserMutation } from "src/generated/graphql";
import { useEffect, useState } from "react";
import CustomTextField from "src/globalComponents/CustomTextfield";
import CustomImageUpload from "src/globalComponents/CustomImageUpload";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import SendIcon from "@mui/icons-material/Send";
import toast from "react-hot-toast";
import { useAppSelector } from "src/store/hook";
import defaultAvatar from "../../../assets/images/default-avatar.png";

const ProfilePage = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const [updateUser, { loading }] = useUpdateUserMutation();

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setAvatar(user.avatar || null);
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const input: {
        avatar?: string | null;
        password?: string;
        rePassword?: string;
      } = {};

      if (avatar !== (user?.avatar || null)) {
        input.avatar = avatar;
      }

      if (newPassword) {
        input.password = newPassword;
        input.rePassword = newPassword;
      }

      if (Object.keys(input).length === 0) {
        toast.error("No changes to submit");
        return;
      }

      const { data } = await updateUser({
        variables: {
          input,
        },
      });
      if (data?.updateUser) {
        toast.success("User profile updated successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user profile.");
    }
  };

  const avatarPreview = avatar?.startsWith("data:image")
    ? avatar
    : avatar
    ? `${process.env.REACT_APP_IMAGE_URL || ""}${avatar}`
    : defaultAvatar;

  return (
    <Box sx={{ pb: "70px", position: "relative" }}>
      <CustomSectionTitle label={t("membership.title")} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ maxWidth: "600px", margin: "auto" }}>
          <CustomTextField
            label={t("user.username")}
            value={username}
            placeholder={t("home.movieName")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
                opacity: 0.8,
                border: "1px solid",
                borderColor: "text.primary",
              },
            }}
            inputProps={{ readOnly: true }}
          />
          <CustomTextField
            label={t("user.oldPassword")}
            placeholder={t("user.oldPassword")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <CustomTextField
            label={t("user.newPassword")}
            value={newPassword}
            placeholder={t("user.newPassword")}
            sx={{
              paddingLeft: "10px",
              "& .MuiOutlinedInput-root": {
                backgroundColor: "background.paper",
              },
            }}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <CustomImageUpload
            label={t("user.avatar")}
            value={avatarPreview}
            onUpload={(url) => setAvatar(url)}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CustomActionButton
              icon={<SendIcon />}
              label={t("operation.submit")}
              loading={loading}
              onClick={handleSubmit}
            />
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ProfilePage;
