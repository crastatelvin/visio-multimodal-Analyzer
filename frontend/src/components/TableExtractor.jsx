export default function TableExtractor({ tables }) {
  if (!tables?.length) return <div className="empty-note">No tables detected</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {tables.map((table, ti) => {
        const headers = table?.[0] || [];
        const rows = table?.slice(1) || [];
        return (
          <div key={ti}>
            <div className="mono-title">TABLE {ti + 1}</div>
            <div style={{ overflowX: "auto" }}>
              <table className="scan-table">
                <thead>
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, ri) => (
                    <tr key={ri}>
                      {row.map((cell, ci) => (
                        <td key={ci}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
