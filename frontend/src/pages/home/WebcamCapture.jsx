import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamCapture() {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
    } else {
      console.error("Failed to capture screenshot.");
      alert("Image capture failed. Try again.");
    }
  };

  const processImage = (imageSrc) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const TARGET_SIZE = 1500 * 1024;
        const TARGET_WIDTH = 1024;
        const MAX_ATTEMPTS = 5;
        let width = TARGET_WIDTH;
        let height = Math.round((TARGET_WIDTH / img.width) * img.height);

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        let minQuality = 0.8,
          maxQuality = 1.0,
          quality = 0.9;
        let attempts = 0;

        const tryCompress = (currentQuality) => {
          canvas.toBlob((blob) => {
            if (!blob) {
              reject("Failed to process image.");
              return;
            }
            if (blob.size <= TARGET_SIZE || attempts >= MAX_ATTEMPTS) {
              resolve(blob);
              return;
            }
            attempts++;
            quality = (minQuality + maxQuality) / 2;
            tryCompress(quality);
          }, "image/jpeg", quality);
        };
        tryCompress(quality);
      };
      img.onerror = () => reject("Failed to load image.");
    });
  };

  const analyzeImage = async () => {
    if (!image) {
      alert("Capture an image first!");
      return;
    }
    setLoading(true);

    try {
      const processedImage = await processImage(image);
      const formData = new FormData();
      formData.append("image", processedImage, "image.jpg");

      const start = Date.now();
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      console.log("Backend Response Time:", Date.now() - start, "ms");

      if (!response.ok) throw new Error("Failed to analyze the image.");
      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error:", error);
      alert("Capture your entire face and try again!");
    } finally {
      setLoading(false);
    }
  };

  const skinTypeLabels = ["Oily Skin", "Dry Skin", "Normal Skin", "Mixed Skin"];

  const getAcneStatus = (acneValue) =>
    acneValue === 0 ? "No Acne" : acneValue === 1 ? "Has Acne" : "N/A";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Skin Test</h1>

      <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-primary-light">
        <div className="flex justify-center items-center w-full mb-4">
          {!image ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="rounded-lg shadow-lg"
            />
          ) : (
            <img src={image} alt="Captured" className="rounded-lg shadow-lg" />
          )}
        </div>

        <div className="flex space-x-4">
          {!image ? (
            <button
              onClick={capture}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Capture Image
            </button>
          ) : (
            <>
              <button
                onClick={() => setImage(null)}
                className="btn text-white px-6 py-2 rounded-md btn:hover transition"
              >
                Retake
              </button>
              <button
                onClick={analyzeImage}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
              >
                Analyze Skin
              </button>
            </>
          )}
        </div>

        {loading && <p className="mt-4 text-gray-600">Analyzing Skin, please wait...</p>}

        {analysisResult && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Skin Analysis Result</h3>
            <p className="text-gray-700">
              <strong>Skin Type:</strong> {skinTypeLabels[analysisResult.result?.skin_type?.skin_type] || "N/A"}
            </p>
            <p className="text-gray-700">
              <strong>Acne Level:</strong> {getAcneStatus(analysisResult.result?.acne?.value)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebcamCapture;
