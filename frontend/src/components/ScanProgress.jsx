const LAYERS = [
  { id: "uploading", label: "Uploading document" },
  { id: "rendering_pages", label: "Rendering pages" },
  { id: "scanning", label: "AI vision scanning" },
  { id: "complete", label: "Extraction complete" }
];

export default function ScanProgress({ currentStep, visible }) {
  if (!visible) return null;
  const currentIndex = LAYERS.findIndex((l) => l.id === currentStep);
  return (
    <div className="card">
      <div className="mono-title">SCAN PROGRESS</div>
      <div className="progressRow">
        {LAYERS.map((layer, i) => {
          const done = i < currentIndex;
          const active = i === currentIndex;
          return (
            <div key={layer.id} className={`progressNode ${done ? "done" : ""} ${active ? "active" : ""}`}>
              {done ? "DONE: " : active ? "NOW: " : ""}{layer.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
