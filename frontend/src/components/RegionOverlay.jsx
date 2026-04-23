export default function RegionOverlay({ regions = [] }) {
  if (!regions.length) return null;
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {regions.map((region, idx) => (
        <div
          key={idx}
          style={{
            position: "absolute",
            top: region.top,
            left: region.left,
            width: region.width,
            height: region.height,
            border: `1px solid ${region.color || "rgba(59,130,246,0.6)"}`,
            boxShadow: `0 0 10px ${region.color || "rgba(59,130,246,0.4)"}`
          }}
        />
      ))}
    </div>
  );
}
