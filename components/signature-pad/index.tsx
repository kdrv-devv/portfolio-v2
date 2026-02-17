"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignaturePad({
  setSignature,
  publishComment,
  loading,
}: {
  setSignature: (dataUrl: string) => void;
  publishComment: () => void;
  loading: boolean;
}) {
  
  const sigRef = useRef<SignatureCanvas | null>(null);

  const save = () => {
    if (!sigRef.current) return;

    const dataUrl = sigRef.current.toDataURL("image/png");
    setSignature(dataUrl);
    publishComment();
  };
  
  return (
    <div className="bg-white p-4 rounded-xl">
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 230,
          height: 150,
          className: "bg-white rounded-md",
        }}
      />

      <button
        disabled={loading}
        onClick={save}
        className="mt-1 cursor-pointer hover:scale-110 active:scale-100 duration-200 transition-all px-2 py-2 bg-black text-white rounded-lg"
      >
        Sign and Publish
      </button>
    </div>
  );
}
