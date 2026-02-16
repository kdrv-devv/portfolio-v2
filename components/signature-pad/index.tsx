"use client";

import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

export default function SignaturePad({
  setSignature,
}: {
  setSignature: (dataUrl: string) => void;
}) {
  const sigRef = useRef<any | null>(null);

  const save = () => {
    const dataUrl = sigRef.current.toDataURL();
    setSignature(dataUrl);
  };

  return (
    <div>
      <SignatureCanvas
        ref={sigRef}
        penColor="white"
        canvasProps={{ width: 400, height: 200  }}
      />
      <button onClick={save}>Save Signature</button>
    </div>
  );
}
