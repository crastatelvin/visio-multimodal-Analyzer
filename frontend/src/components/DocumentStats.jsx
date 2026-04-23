const statsConfig = [
  { key: "document_type", label: "DOC TYPE", color: "#3b82f6" },
  { key: "language", label: "LANGUAGE", color: "#06b6d4" },
  { key: "entities", label: "ENTITIES", color: "#f59e0b" },
  { key: "key_values", label: "KEY-VALUES", color: "#14b8a6" },
  { key: "tables", label: "TABLES", color: "#10b981" },
  { key: "confidence", label: "CONFIDENCE", color: "#8b5cf6" }
];

export default function DocumentStats({ data }) {
  return (
    <div className="stats-grid">
      {statsConfig.map((item) => {
        let value = data?.[item.key];
        if (item.key === "entities") value = data?.entities?.length || 0;
        if (item.key === "key_values") value = Object.keys(data?.key_values || {}).length;
        if (item.key === "tables") value = data?.tables?.length || 0;
        if (item.key === "confidence") value = `${data?.confidence || 0}%`;
        return (
          <div key={item.key} className="card stat-card dashboard-card">
            <div style={{ color: item.color }} className="stat-value">
              {value || "-"}
            </div>
            <div className="stat-label">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
}
