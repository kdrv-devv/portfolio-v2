import Ballpit from "@/components/bubble-bg";
import Header from "@/components/header";
import MagicBento from "@/components/magic-grid";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const ProjectsPage = () => {
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
        className="bg"
        count={70}
        gravity={0.5}
        friction={0.9975}
        wallBounce={0.95}
        colors={["#2d15c2", "#e2e2e2", "#1a1a1a", "#5639d1", "#fff"]}
        followCursor={false}
      />

      <div className="fixed inset-0 overflow-y-scroll overflow-hidden  z-30">
        <Header />

        <div className="flex items-center felx flex-col gap-4 justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
          <Link
            className="px-4 fixed bottom-10  w-[90%] md:w-[50%] glass text-center p-3 rounded-2xl text-[#fff] text-2xl flex items-center justify-center gap-3 cursor-pointer hover:scale-105 transition-all duration-200 shadow-2xl font-[600]"
            target="blank"
            href={"https://github.com/kdrv-devv"}
          >
            More Projects <FaArrowRightLong />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
