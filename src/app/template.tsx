"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-transition">
      {children}
      <style>{`
        .page-transition {
          animation: page-fade-in 0.35s ease forwards;
        }
        @keyframes page-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
