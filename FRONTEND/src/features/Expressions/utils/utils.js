import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const init = async ({ landmarkerRef, videoRef, streamRef }) => {
  try {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
    );

    landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-assets/face_landmarker_v2_with_blendshapes.task",
      },
      outputFaceBlendshapes: true, // ✅ now valid
      runningMode: "VIDEO",
      numFaces: 1,
    });

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();

    console.log("✅ Model + Camera ready");
  } catch (err) {
    console.error("❌ INIT FAILED:", err);
  }
};

export const detect = ({ landmarkerRef, videoRef, setExpression }) => {
  if (
    !landmarkerRef.current ||
    !videoRef.current ||
    videoRef.current.readyState < 2
  )
    return;

  const now = performance.now();

  const results = landmarkerRef.current.detectForVideo(videoRef.current, now);

  if (!results.faceBlendshapes?.length) return;

  const blendshapes = results.faceBlendshapes[0].categories;

  const getScore = (name) =>
    blendshapes.find((b) => b.categoryName === name)?.score || 0;

  const smileLeft = getScore("mouthSmileLeft");
  const smileRight = getScore("mouthSmileRight");
  const jawOpen = getScore("jawOpen");
  const browUp = getScore("browInnerUp");
  const frownLeft = getScore("mouthFrownLeft");
  const frownRight = getScore("mouthFrownRight");

  let currentExpression = "neutral";

  if (smileLeft > 0.5 && smileRight > 0.5) {
    currentExpression = "happy";
  } else if (jawOpen > 0.2 && browUp > 0.2) {
    currentExpression = "surprised";
  } else if (
    frownLeft > 0.05 &&
    frownRight > 0.05 &&
    smileLeft < 0.3 &&
    smileRight < 0.3
  ) {
    currentExpression = "sad";
  }

  setExpression(currentExpression);
  return currentExpression;
};
