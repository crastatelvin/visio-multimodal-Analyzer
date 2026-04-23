export default function KeyValueGrid({ keyValues }) {
  const entries = Object.entries(keyValues || {});
  if (!entries.length) return <div className="empty-note">No key-value pairs detected</div>;
  return (
    <div className="kv-grid">
      {entries.map(([key, value]) => (
        <div className="kv-card" key={key}>
          <div className="kv-key">{key}</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
}
