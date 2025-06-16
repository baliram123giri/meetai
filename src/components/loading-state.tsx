import { LoaderCircleIcon } from "lucide-react";
import React from "react";
interface LoadingStateProps {
  title: string;
  description?: string;
}
export default function LoadingState({
  title,
  description,
}: LoadingStateProps) {
  return (
    <div className="py-4 px-8  flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 p-10 rounded-lg shadow-sm bg-background">
        <LoaderCircleIcon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-lg font-medium">{title}</h1>
          {description && <p className="text-sm">{description}</p>}
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}
