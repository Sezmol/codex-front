import { ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/Typography";

export const ErrorComponent = ({ error, reset }: ErrorComponentProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.invalidate();
    reset();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
      <Typography text="Error while loading profile" type="h4" />
      <Typography text={error.message} type="p" />
      <Button className="mt-2" onClick={handleClick}>
        Try again <RotateCcw />
      </Button>
    </div>
  );
};
