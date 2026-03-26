import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "../style/faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let animationId;

    async function start() {
      await init({ landmarkerRef, videoRef, streamRef });

      const runDetection = () => {
        detect({ landmarkerRef, videoRef, setExpression });
        animationId = requestAnimationFrame(runDetection);
      };

      runDetection();
    }

    start();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);

      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const expression = detect({ landmarkerRef, videoRef, setExpression });
    console.log(expression);
    onClick(expression);
  }

  return (
    <div className="face-container">
      <video ref={videoRef} playsInline />
      <h2>{expression}</h2>
      <button onClick={handleClick}>Detect expression</button>
    </div>
  );
}
