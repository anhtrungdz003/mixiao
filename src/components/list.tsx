import React from "react";

export const List: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return <div className={className}>{children}</div>;
};

export const ListItem: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  return <div className={`flex items-center ${className}`}>{children}</div>;
};
