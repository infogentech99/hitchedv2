"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);

  // iPhone / iPad detect
  const isIOS = useMemo(() => {
    if (typeof navigator === "undefined") return false;

    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }, []);

  // Video source
  const videoSrc = isIOS
    ? "/assets/curtain1.mp4"
    : "/assets/curtain1.webm";

  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const playVideo = async () => {
    if (!videoRef.current) return;

    try {
      setStarted(true);
      await videoRef.current.play();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnd = () => {
    setHide(true);

    setTimeout(() => {
      setShow(false);
    }, 300);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] transition-opacity duration-300 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        muted={false}
        onEnded={handleEnd}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src={videoSrc}
          type={isIOS ? "video/mp4" : "video/webm"}
        />
      </video>

      {!started && (
        <button
          onClick={playVideo}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-24 h-24 rounded-full bg-white text-black text-4xl cursor-pointer"
        >
          ▶
        </button>
      )}
    </div>
  );
}