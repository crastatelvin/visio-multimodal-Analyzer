import { useMemo, useState } from "react";
import UploadPage from "./pages/UploadPage";
import ScannerPage from "./pages/ScannerPage";
import useWebSocket from "./hooks/useWebSocket";
import "./styles/globals.css";

const WS_BASE = process.env.REACT_APP_WS_URL || "ws://localhost:8000/ws";

export default function App() {
  const [jobId, setJobId] = useState("");
  const [scanStep, setScanStep] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const wsUrl = useMemo(() => (jobId ? `${WS_BASE}?job_id=${encodeURIComponent(jobId)}` : ""), [jobId]);
  useWebSocket(
    wsUrl,
    (payload) => {
      setScanStep(payload.step || "");
      if (payload.step === "complete") setScanning(false);
    },
    Boolean(jobId && scanning)
  );

  const handleScanStart = (_file, nextJobId) => {
    setJobId(nextJobId || "");
    setResult(null);
    setScanning(true);
    setScanStep("uploading");
  };

  const handleScanComplete = (response) => {
    setJobId(response.job_id);
    setResult(response.result);
    setScanning(false);
    setScanStep("complete");
  };

  const handleScanError = () => {
    setScanning(false);
    setScanStep("error");
  };

  const reset = () => {
    setResult(null);
    setScanning(false);
    setScanStep("");
  };

  return result || scanning ? (
    <ScannerPage
      data={result}
      imageBase64={result?.preview_base64 || ""}
      mediaType={result?.media_type || "image/png"}
      scanning={scanning}
      scanStep={scanStep}
      onReset={reset}
      jobId={jobId}
    />
  ) : (
    <UploadPage onScanStart={handleScanStart} onScanComplete={handleScanComplete} onScanError={handleScanError} />
  );
}
