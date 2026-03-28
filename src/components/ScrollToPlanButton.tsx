"use client";

export default function ScrollToPlanButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={() =>
        document
          .getElementById("plans")
          ?.scrollIntoView({ behavior: "smooth" })
      }
      className={className}
    >
      {children}
    </button>
  );
}
