import React from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={` ${className} mx-auto max-w-7xl py-12 xl:py-18 flex flex-col gap-12 xl:gap-16 px-2 xl:px-0`}
    >
      {children}
    </div>
  );
}
