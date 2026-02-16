import Ballpit from "@/components/bubble-bg";
import CircularText from "@/components/circle-text";
import TrueFocus from "@/components/focus-text";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        width: "100%",
      }}
      className="!bg-[#060010]"
    >
      <Ballpit
        count={50}
        gravity={0.03}
        friction={0.9975}
        wallBounce={0.95}
        colors={["#2d15c2", "#e2e2e2", "#1a1a1a", "#5639d1", "#fff"]}
        followCursor={false}
      />

      <div className="fixed inset-0 h-[100vh]  z-30">
        <Header />

        <div className="me flex flex-col items-center gap-5 md:gap-8">
          <Image
            src="/menobg.png"
            alt="KadirovJS's photo"
            width={250}
            height={250}
            sizes="(max-width: 768px) 150px, 250px"
            className="rounded-full glass border-js border-2 
             w-[150px] md:w-[180px] lg:w-[250px] 
             h-auto"
          />

          <TrueFocus
            sentence="Sarvarbek Qodirov"
            manualMode={false}
            blurAmount={5}
            borderColor="#5227FF"
            animationDuration={1}
            pauseBetweenAnimations={1}
          />
        </div>

        <div className="home-actions py-5 flex items-center justify-center gap-3">
          <button className="glass cursor-pointer hover:scale-110 duration-200 active:scale-95 px-6 py-2 !bg-white  text-black rounded-3xl">
            Resume
          </button>
          <Link
            href={"/projects"}
            className="glass  !bg-[#5147c0] md:!bg-glass cursor-pointer hover:scale-110 duration-200 active:scale-95 px-6 py-2 rounded-3xl"
          >
            Projects
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={"https://github.com/kdrv-devv"}
            target="_blank"
            className="glass cursor-pointer mx-auto px-3 py-1 rounded-2xl "
          >
            <Image
              src={"/github.svg"}
              width={30}
              height={30}
              alt="Github icon"
            />
          </Link>
        </div>
      </div>
      <CircularText
        text="FRONTEND * DEVELOPER * "
        onHover="speedUp"
        spinDuration={20}
        className="custom-class  !fixed right-2 md:!right-5 bottom-1 md:!bottom-3"
      />
    </div>
  );
}
