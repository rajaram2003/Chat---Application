import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User, Loader2 } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [error, setError] = useState("");
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type (only allow images)
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    // Validate file size (limit to 2MB)
    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 2MB. Please upload a smaller image.");
      return;
    }

    setError(""); // Clear previous errors
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        let base64Image = reader.result;

        // Compress image before upload (optional)
        base64Image = await compressImage(base64Image, 0.7); // 70% quality

        setSelectedImg(base64Image);
        await updateProfile({ profilePic: base64Image });
      } catch (error) {
        setError("Failed to upload image. Please try again.");
      }
    };

    reader.readAsDataURL(file);
  };

  // Function to compress image (reduces base64 size)
  const compressImage = async (base64, quality) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve(canvas.toDataURL("image/jpeg", quality)); // Convert to JPEG with reduced quality
      };
    });
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4"
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                {isUpdatingProfile ? (
                  <Loader2 className="w-5 h-5 text-base-200 animate-spin" />
                ) : (
                  <Camera className="w-5 h-5 text-base-200" />
                )}
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* Profile Info */}
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
