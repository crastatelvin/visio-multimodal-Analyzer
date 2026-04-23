import { useState } from "react";
import { scanDocument } from "../services/api";

const ACCEPTED = ".pdf,.jpg,.jpeg,.png,.webp,.bmp,.txt";

export default function DocumentUpload({ onScanStart, onScanComplete, onScanError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file) => {
    if (!file || loading) return;
    setError("");
    setLoading(true);
    const nextJobId = crypto.randomUUID();
    onScanStart?.(file, nextJobId);
    try {
      const pdfMode = file.name.toLowerCase().endsWith(".pdf") ? "all_pages" : "first_page";
      const result = await scanDocument(file, nextJobId, { pdfMode, pdfPageLimit: 3 });
      onScanComplete?.(result, file, nextJobId);
    } catch (e) {
      const msg = e?.response?.data?.error || "Scan failed. Check backend.";
      setError(msg);
      onScanError?.(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-shell">
      <h1 className="logo">VISIO</h1>
      <p className="muted">Drop any document. AI sees text, structure, entities, and tables in one scan.</p>
      <label className="upload-btn">
        {loading ? "SCANNING..." : "SELECT FILE"}
        <input type="file" accept={ACCEPTED} style={{ display: "none" }} onChange={(e) => handleFile(e.target.files?.[0])} />
      </label>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
