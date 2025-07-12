import { Loader2 } from "lucide-react";

export const PendingComponent = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 className="animate-spin" size={42} />
    </div>
  );
};
