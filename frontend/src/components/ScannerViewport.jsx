import { useState } from "react";
import { motion } from "framer-motion";
import ScanBeam from "./ScanBeam";
import RegionOverlay from "./RegionOverlay";

export default function ScannerViewport({ imageBase64, mediaType, scanning, analysisData }) {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="card card-bright" style={{ padding: 0, overflow: "hidden", position: "relative" }}>
      <div className="scanner-header">
        <div className="scanner-status">
          <motion.div
            animate={{ opacity: scanning ? [1, 0.3, 1] : 1 }}
            transition={{ duration: 0.8, repeat: scanning ? Infinity : 0 }}
            className={`status-dot ${scanning ? "status-amber" : "status-green"}`}
          />
          <span className="scanner-code">{scanning ? "SCANNING..." : analysisData ? "SCAN COMPLETE" : "READY"}</span>
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[0.75, 1, 1.25].map((z) => (
            <button key={z} onClick={() => setZoom(z)} className={`zoom-btn ${zoom === z ? "zoom-active" : ""}`}>
              {Math.round(z * 100)}%
            </button>
          ))}
        </div>
      </div>

      <div className="viewport-body">
        {imageBase64 ? (
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={`data:${mediaType || "image/png"};base64,${imageBase64}`}
              alt="Document"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "top left",
                maxWidth: "100%",
                boxShadow: "0 0 40px rgba(0,0,0,0.8)",
                transition: "transform 0.2s"
              }}
            />
            {scanning && <ScanBeam />}
            {!scanning && analysisData && (
              <RegionOverlay
                regions={[
                  ...(analysisData.entities?.length ? [{ top: "5%", left: "3%", width: "94%", height: "2px", color: "rgba(245,158,11,0.7)" }] : []),
                  ...(Object.keys(analysisData.key_values || {}).length ? [{ top: "13%", left: "3%", width: "94%", height: "2px", color: "rgba(20,184,166,0.7)" }] : [])
                ]}
              />
            )}
          </div>
        ) : (
          <div className="empty-viewport">Document viewport - upload to begin</div>
        )}
      </div>
    </div>
  );
}
