"use client";
import Ballpit from "@/components/bubble-bg";
import Header from "@/components/header";
import SignaturePad from "@/components/signature-pad";
import React from "react";

const Guestbook = () => {
  const [signature, setSignature] = React.useState("");
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
        count={70}
        gravity={0.5}
        friction={0.9975}
        wallBounce={0.95}
        colors={["#2d15c2", "#e2e2e2", "#1a1a1a", "#5639d1", "#fff"]}
        followCursor={false}
      />

      <div className="fixed inset-0 h-[100vh]  z-30">
        <Header />
        <div className="flex items-center justify-center flex-col ">
          <SignaturePad setSignature={setSignature} />
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
