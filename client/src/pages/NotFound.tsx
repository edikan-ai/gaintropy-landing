import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "#0A0A0A" }}
    >
      <div
        className="w-full max-w-lg mx-4 p-10 rounded-sm text-center"
        style={{ background: "#0D0D0D", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex justify-center mb-8">
          <AlertCircle className="h-14 w-14" style={{ color: "#FF4D00" }} />
        </div>

        <h1
          className="text-5xl font-black mb-3"
          style={{ color: "#FFFFFF", fontFamily: "Space Grotesk, sans-serif", letterSpacing: "-0.03em" }}
        >
          404
        </h1>

        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          Page Not Found
        </h2>

        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk, sans-serif" }}
        >
          Sorry, the page you are looking for doesn't exist.
          <br />
          It may have been moved or deleted.
        </p>

        <button
          onClick={handleGoHome}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-sm transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: "#FF4D00", color: "#0A0A0A", fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Home className="w-4 h-4" />
          Go Home
        </button>
      </div>
    </div>
  );
}
