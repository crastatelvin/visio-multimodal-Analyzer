import { useState } from "react";

export default function JsonViewer({ data }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data || {}, null, 2);

  const copy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div style={{ position: "relative" }}>
      <button onClick={copy} className="copy-btn">
        {copied ? "COPIED" : "COPY JSON"}
      </button>
      <pre className="json-view">{json}</pre>
    </div>
  );
}
