import { CameraIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface UserAvatarProps {
  src: string | undefined;
}

export const UserAvatar = ({ src }: UserAvatarProps) => {
  return (
    <div className="relative w-24 h-24 group">
      <Avatar className="w-full h-full border-4 shadow-lg">
        {src ? (
          <AvatarImage src={`${import.meta.env.VITE_API_URL}/${src}`} />
        ) : (
          <AvatarFallback>No avatar</AvatarFallback>
        )}
      </Avatar>

      <div className="absolute rounded-full inset-0 flex items-center justify-center bg-primary bg-opacity-50 opacity-0 transition-opacity duration-300 cursor-pointer group-hover:opacity-100">
        <CameraIcon className="w-8 h-8 text-secondary" />
      </div>
    </div>
  );
};
