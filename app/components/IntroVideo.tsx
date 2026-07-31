"use client";

import { useEffect, useRef, useState } from "react";

export default function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const [hide, setHide] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  const playVideo = async () => {
    if (!videoRef.current) return;

    try {
      setStarted(true);
      await videoRef.current.play();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEnd = () => {
    setHide(true);

    setTimeout(() => {
      setShow(false);
    }, 700);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] transition-opacity duration-700 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        playsInline
        preload="auto"
        onEnded={handleEnd}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/assets/curtain1.webm" type="video/webm" />
      </video>

      {!started && (
        <button
          onClick={playVideo}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          w-24 h-24 rounded-full bg-white/90 backdrop-blur
          text-black text-4xl hover:scale-110 transition cursor-pointer"
        >
          ▶
        </button>
      )}
    </div>
  );
}