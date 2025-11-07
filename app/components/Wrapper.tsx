import React from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto max-w-6xl ${className}`}>{children}</div>
  );
}
