"use client";
import Image from "next/image";
import MarriageCountdown from "./components/MarriageCountdown";
import CoupleMessage from "./components/CoupleMessage";
import { useEffect, useState, useRef, useMemo } from "react";
import IntroVideo from "./components/IntroVideo";
import RoseHeroTemp from "./components/RoseHeroTemp";

const FloatingLamp = ({ className, style, reverse = false }: { className: string; style?: React.CSSProperties; reverse?: boolean }) => {
  // Memoize random values to prevent recalculation on re-renders
  const lampValues = useMemo(() => {
    // const duration = 60 + Math.random() * 40; // 60–100s (very slow flow)
    // const duration = 40 + Math.random() * 10; // 40–50s
    const duration = 60 + Math.random() * 10; // 60–70s
    const delay = Math.random() * 15;

    // depth feel - dramatic size variety
    const scale = Math.random() < 0.5
      ? 0.3 + Math.random() * 0.4  // 0.3–0.7 (small lamps)
      : 1.2 + Math.random() * 0.8; // 1.2–2.0 (large lamps)
    const blur = scale < 0.7 ? "blur(1.5px)" : "blur(0px)";

    return { duration, delay, scale, blur };
  }, []); // Empty dependency array means these values are calculated only once

  return (
    <img
      src="/lamp.png"
      alt="Lamp"
      className={`floating-lamp ${className}`}
      style={{
        animationName: reverse ? 'lampFlowReverse' : 'lampFlow',
        animationDuration: `${lampValues.duration}s`,
        animationDelay: `${lampValues.delay}s`,
        transform: `scale(${lampValues.scale})`,
        filter: `drop-shadow(0 0 18px rgba(255,180,90,0.9)) ${lampValues.blur}`,
        '--scale': lampValues.scale,
        ...style,
      } as React.CSSProperties}
    />
  );
};

export default function Home() {
  const events = [
    {
      title_ceremony: "Mehandi",
      image: "/assets/mehandi.png",
      date: "Tuesday, March 10th 2026",
      venue: "Hyatt Regency Delhi",
      venue_address: <>Ring Road, Bhikaji Cama Place, <br />  RK Puram, New Delhi 110066</>,
      time: "7:00 pm onwards",
      link: "https://maps.app.goo.gl/53z68ksx4cYgoNm59",
    },

    {
      title_ceremony: "Haldi",
      image: "/assets/haldi_m.png",
      date: "Friday, March 13th 2026",
      venue: "Golden Gate Banquet",
      venue_address: <>Block B, Mayapuri Industrial Area Phase I, Mayapuri<br /> Delhi 110064</>,
      time: "4:00pm Onwards",
      link: "https://maps.app.goo.gl/ywMPWwHjbXvqwiWc8",
    },
    {
      title_ceremony: "Cocktail",
      image: "/assets/cocktail_w.png",
      date: "Sunday, March 15th 2026",
      venue: "The Ashok Hotel",
      venue_address: <>50-B, Diplomatic Enclave,<br /> Chanakyapuri, New Delhi – 110021</>,
      time: "8pm Onwards",
      link: "https://maps.app.goo.gl/f599YkTSEYKDEK5L7",
    },

    {
      title_ceremony: "Engagement",
      image: "/assets/engagement_w.png",
      date: "Tuesday, March 10th 2026",
      venue: "Hyatt Regency Delhi",
      venue_address: <>Ring Road, Bhikaji Cama Place, <br />  RK Puram, New Delhi 110066</>,
      time: "7:00 pm onwards",
      link: "https://maps.app.goo.gl/53z68ksx4cYgoNm59",
    },

    {
      title_ceremony: "Shaadi",
      image: "/assets/shaadi_w.png",
      date: "Friday, March 13th 2026",
      venue: "The Leela Palace",
      venue_address: <>Africa Ave, Diplomatic Enclave, Chanakyapuri,<br /> Delhi 110023</>,
      time: "4:00pm Onwards",
      link: "https://maps.app.goo.gl/mxcwCxWhH1TXBC8c9",
    },
    {
      title_ceremony: "Reception",
      image: "/assets/reception_w.png",
      date: "Sunday, March 15th 2026",
      venue: "The Ashok Hotel",
      venue_address: <>50-B, Diplomatic Enclave,<br /> Chanakyapuri, New Delhi – 110021</>,
      time: "8pm Onwards",
      link: "https://maps.app.goo.gl/f599YkTSEYKDEK5L7",
    },


  ];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio || started) return;

    try {
      audio.volume = 0.3;
      await audio.play();
      setStarted(true);
      setPlaying(true);
    } catch { }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch { }
    }
  };

  // First user interaction (mobile + desktop)
  useEffect(() => {
    const handler = () => startMusic();

    window.addEventListener("click", handler);
    window.addEventListener("touchstart", handler);

    return () => {
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
    };
  }, [started]);


  return (

    <div>
      <IntroVideo />

      <button
        onClick={() => {
          started ? toggleMusic() : startMusic();
        }}
        className="fixed bottom-4 right-4 z-50 bg-[#FF35A1] text-white p-3 rounded-xl text-xl"
      >
        {playing ? "⏸" : "▶"}
      </button>

      <audio ref={audioRef} src="/assets/background_song.mp3" loop preload="auto" playsInline />

      <div className="
    bg-[url('/assets/hitched_mobilebg_water_n.jpg')]
    md:bg-[url('/assets/hitched_desktopbg_water.webp')]
    bg-cover bg-no-repeat bg-top md:bg-center w-full px-4 sm:px-8 overflow-hidden relative">

        <RoseHeroTemp />

        <div className=" md:pt-24 pt-4 md:pb-50 lg:pb-160 relative z-10 pb-24">
          <h2 className="text-[#15528A]  text-center leading-tight text-[30px] sm:text-5xl lg:text-[100px] md:pb-370 pb-0 flex flex-col items-center gap-y-2">
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)] md:mt-20">
              Dhiraj
            </span>
            <span className="text-xl sm:text-3xl tracking-[10px] font-cormorant [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">WEDS</span>
            <span className="font-parisienne [text-shadow:2px_2px_4px_rgba(0,0,0,0.4)]">Ritika</span>
          </h2>

          <div className="flex flex-col items-center text-center gap-6 mt-0  lg:pt-200 pt-150">
            <img
              src="/assets/ganesh_inter.png"
              alt="ganesh"
              className="md:w-40 w-28 h-auto"
            />
            <h2 className="text-white md:text-2xl text-[17px] text-center">
              || श्री गणेशाय नमः ||
            </h2>
            <h2 className="text-white md:text-2xl text-[17px] text-center">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।
              <br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
            </h2>


            <h2 className="text-white lg:text-[30px] md:text-2xl text-[20px] font-Cormorant-upright">
              With the heavenly blessings of
              <br /> Late Smt. Kamla Kapoor
            </h2>

            <hr className="lg:w-24 w-16 border-white my-4" />

            <h2 className="text-white font-Cormorant-upright lg:text-[34px] md:text-2xl text-[26px]">
              The Kapoor Family
            </h2>
          </div>

          <div className="mt-8 text-center">
            <h2 className="text-white font-cormorant 
            text-3xl sm:text-5xl lg:text-[60px] leading-tight lg:tracking-wide tracking-wider">
              INVITES
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[19px] mt-6">
              you to join us in the wedding celebrations of
            </p>



            <h2 className="text-white font-Cormorant-upright text-center mt-14
            md:text-5xl text-[64px] lg:text-[100px] leading-tight font-bold">
              Ritika
            </h2>


            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl mt-2 text-[16px]">
              (D/o Mrs. Kalpana kapoor and Mr. Raj Kapoor)
              <br /> (Granddaughter of Shri J.S. Kapoor)
            </p>




            <h2 className="text-white font-Cormorant-upright text-center mt-4
            text-[64px] sm:text-7xl lg:text-[100px] leading-tight font-bold">
              <span className="text-white font-Cormorant-upright text-center lg:mt-10 mt-4 
            md:text-5xl text-[82px] lg:text-[150px] leading-tight">&</span>   <br />
              Dhiraj
            </h2>

            <p className="text-white font-Cormorant-upright lg:text-[30px] md:text-2xl text-[16px] mt-2">
              (S/o Mrs. Reena and Mr. Manjit Singh)
            </p>

            <p className="text-white font-Cormorant-upright lg:text-3xl md:text-2xl text-[24px] mt-8">
              On the following events
            </p>
          </div>

          <div className="flex justify-center mt-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-32 gap-16 ">
              {events.map((event, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <img
                    src={event.image}
                    alt={event.venue}
                    className="lg:w-80 w-60 sm:w-76  h-auto"
                  />

                  <h2 className="text-white font-Cormorant-upright lg:text-[45px] md:text-2xl text-[37px] mt-4 font-bold">
                    {event.title_ceremony}
                  </h2>



                  <p className="text-white font-Cormorant-upright text-[14px] sm:text-base mt-2">
                    <span className="text-[22px]">{event.date}</span>  <br />
                    <span className="text-[24px] uppercase"> {event.venue}</span> <br />
                    <span className="text-[20px]">{event.venue_address}</span> <br />
                    <span className="text-[22px]">  {event.time} </span>
                  </p>

                  <a
                    href={event.link}
                    className="text-white underline md:text-sm text-[18px] mt-2 font-cormorant"
                    target="_blank"
                  >
                    See the route
                  </a>


                </div>
              ))}
            </div>
          </div>


          <div className="lg:h-350 md:h-180 h-86 md:pt-20 pt-60 lg:pr-180 md:pr-40 pr-40 flex flex-col justify-end items-center text-center lg:pb-0 md:pb-50 pb-0">

            <h1 className="lg:text-7xl md:text-5xl text-3xl text-[#E1EF1E] font-parisienne">
              With Love From Us
            </h1>

            <h2 className="lg:text-[40px] md:text-2xl text-xl text-[#00EAFF] lg:pt-12 pt-6 font-Cormorant-upright md:leading-6 lg:leading-12 leading-6">
              Thank you for being part of our journey. Your presence makes this celebration truly meaningful, and we look forward to sharing these cherished moments with you.
            </h2>
          </div>

        </div>
      </div>


      {/* <div className="md:bg-[url('/assets/meet.png')] bg-[url('/assets/meet_mobile.jpg')] bg-cover bg-no-repeat bg-center">
        <div className="lg:h-350 md:h-180 h-86 md:pt-20 md:pr-100 pr-40 flex flex-col justify-center items-center text-center">

          <h1 className="lg:text-3xl md:text-xl text-2xl text-[#E1EF1E] font-Cormorant">
            MEET THE
          </h1>

          <h2 className="lg:text-[130px] md:text-2xl text-3xl text-[#00EAFF] lg:pt-12 font-Cormorant-upright md:leading-12 leading-8">
            <span className="text-[#ADBAFF]">Bride</span> <br />
            & <br />
            <span className="text-[#3FA9FF]">Groom</span>
          </h2>
        </div>
      </div> */}




      <CoupleMessage />

      {/* mobile visible section */}
      <div className="md:hidden bg-[url('/assets/bide_mobile_water.jpg')] bg-cover bg-no-repeat">
        <div className="h-210 flex  justify-center pt-70">
          <img src="/assets/logo.png" alt="logo" className="w-32 h-28 md:w-40 lg:w-48" />
        </div>
      </div>

      <div className="hidden md:block bg-[url('/assets/bride1_water.png')] bg-cover bg-no-repeat bg-center">
        <div className="lg:h-320 md:h-180 flex pt-80 justify-center">
          <img src="/assets/logo.png" alt="logo" className="w-32 h-48 md:w-40 lg:w-60" />
        </div>
      </div>
      <MarriageCountdown />

      <div className="fixed top-5 left-5 z-50">
        <a href="https://invitearc.com/">
          <button className="flex items-center gap-3 border-white border-2 bg-white/0 backdrop-blur text-white px-6 py-3 rounded-full shadow-lg cursor-pointer">
            <span className="text-3xl leading-none">←</span>
            <span className="text-[16px] font-semibold">
              Exit Preview
            </span>

          </button>
        </a>
      </div>
    </div>
  );
}
