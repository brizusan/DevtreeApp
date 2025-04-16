import React from "react";

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-red-400 text-sm font-semibold">{children}</div>;
};
