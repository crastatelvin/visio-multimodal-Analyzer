import { useRef, useState } from "react";
import { scanDocument } from "../services/api";

const ACCEPTED = ".pdf,.jpg,.jpeg,.png,.webp,.bmp,.txt";

export default function DocumentUpload({ onScanStart, onScanComplete, onScanError }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const features = [
    {
      title: "Text Recognition",
      desc: "Extract text with high accuracy from any document or image.",
      icon: "T"
    },
    {
      title: "Structure Detection",
      desc: "Understand headings, paragraphs, lists, and hierarchy.",
      icon: "◫"
    },
    {
      title: "Entity Extraction",
      desc: "Identify people, places, organizations, and key entities.",
      icon: "◎"
    },
    {
      title: "Table Analysis",
      desc: "Analyze tables with rows, columns, and relationships.",
      icon: "▦"
    },
    {
      title: "Smart Insights",
      desc: "Generate AI-powered summaries and actionable insights.",
      icon: "↗"
    }
  ];

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

  const handleSample = async () => {
    const content = [
      "INVOICE #INV-2026-041",
      "Date: 2026-04-23",
      "Bill To: Acme Labs",
      "Vendor: Northwind Analytics",
      "Total Due: 594.00"
    ].join("\n");
    const sampleFile = new File([content], "sample_invoice.txt", { type: "text/plain" });
    await handleFile(sampleFile);
  };

  return (
    <div className="landing-root">
      <div className="landing-bg" />
      <div className="landing-orb landing-orb-left" />
      <div className="landing-orb landing-orb-right" />

      <div className="landing-shell">
        <nav className="landing-nav">
          <div className="landing-brand">
            <div className="landing-brand-icon">◆</div>
            <h1>VISIO</h1>
          </div>
          <div className="landing-links">
            <span className="active">Home</span>
            <span>Features</span>
            <span>How it Works</span>
            <span>Use Cases</span>
            <span>Pricing</span>
            <span>Docs</span>
          </div>
          <button className="upload-btn">Get Started</button>
        </nav>

        <section className="landing-hero">
          <div>
            <h2>
              <span>See Everything.</span>
              <br />
              <span>Understand Anything.</span>
            </h2>
            <p>
              Visio is your multimodal AI analyst that reads text, understands structure,
              extracts entities, and interprets tables in one intelligent scan.
            </p>
            <div className="landing-actions">
              <button className="upload-btn" disabled={loading} onClick={() => inputRef.current?.click()}>
                {loading ? "Uploading..." : "Upload Document"}
              </button>
              <button className="secondary-btn" disabled={loading} onClick={handleSample}>Try a Sample</button>
            </div>
            <div className="landing-tags">
              {["AI Powered", "Multi-Modal", "Privacy First"].map((tag) => (
                <div key={tag} className="landing-tag">
                  <span className="dot" />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          <div className="upload-card">
            <div className="doc-art">📄</div>
            <h3>Drop any document here</h3>
            <p>PDF, DOCX, TXT, CSV, XLSX, JPG, PNG and more.</p>
            <button className="secondary-btn" disabled={loading} onClick={() => inputRef.current?.click()}>
              Browse Files
            </button>
          </div>
        </section>

        <section className="feature-section">
          <div className="badge">POWERFUL CAPABILITIES</div>
          <h3>
            Everything You Need, In <span>One Scan</span>
          </h3>
          <p>Visio combines multiple AI models to deliver deep insights from any document.</p>
          <div className="feature-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h4>{feature.title}</h4>
                <p>{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
        {error && <div className="error">{error}</div>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
