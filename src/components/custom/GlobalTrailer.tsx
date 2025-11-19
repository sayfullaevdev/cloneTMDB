import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useTrailer } from "@/context/GlobalTrailerContext";


const GlobalTrailer: React.FC = () => {
  const { urlKey, isMini, setMini, shouldMiniOnRoute, resetShouldMini } = useTrailer();
  const location = useLocation();

  useEffect(() => {
    if (!urlKey) return;
    if (shouldMiniOnRoute) {
      setMini(true);
      resetShouldMini();
    }
  }, [location.pathname, shouldMiniOnRoute, urlKey]);

  if (!urlKey) return null;

  const isMoviePage = location.pathname.startsWith("/movies/");

  const containerClass = isMini || !isMoviePage
    ? "fixed bottom-4 right-4 w-[360px] h-[200px] z-50 rounded-lg overflow-hidden shadow-lg"
    : "w-full h-[600px] rounded-md mt-8";

  return (
    <div className={containerClass} role="dialog" aria-label="Trailer">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${urlKey}?autoplay=1&mute=0`}
        title="trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <button>

      </button>
    </div>
  );
};

export default GlobalTrailer;
