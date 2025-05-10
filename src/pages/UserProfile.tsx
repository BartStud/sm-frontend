import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Avatar,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  ProfileData,
  useGetCurrentUserQuery,
  useUpdateUserMutation,
  useUploadProfilePictureMutation,
} from "../features/user/userApi";
const UserProfile: React.FC = () => {
  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState<ProfileData>({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    picture: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({ ...currentUser });
    }
  }, [currentUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await uploadProfilePicture(selectedFile);
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id) return;
    try {
      handleUpload();
      await updateUser({ user_id: formData.id, data: formData }).unwrap();
      alert("Profil zaktualizowany!");
    } catch (error) {
      console.error(error);
      alert("Błąd podczas aktualizacji profilu");
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError) return <div>Wystąpił błąd...</div>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, mx: "auto" }}
    >
      <Box sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Profil użytkownika
        </Typography>
        <Box sx={{ position: "relative", display: "inline-block", mt: 2 }}>
          <Avatar
            src={preview ?? currentUser?.picture}
            alt="Profile"
            sx={{ width: 150, height: 150 }}
          />
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <PhotoCameraIcon sx={{ color: "white" }} />
            <input
              type="file"
              // accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </IconButton>
        </Box>
        <TextField
          label="Email"
          name="email"
          value={formData.email || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Imię"
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nazwisko"
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Box mt={2}>
          <Button type="submit" variant="contained" disabled={isUpdating}>
            {isUpdating ? "Aktualizowanie..." : "Zapisz zmiany"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfile;
