import { useState } from "react";
import EntityChips from "./EntityChips";
import KeyValueGrid from "./KeyValueGrid";
import TableExtractor from "./TableExtractor";
import JsonViewer from "./JsonViewer";

const TABS = ["summary", "entities", "keyvalues", "tables", "json"];

export default function DataPanel({ data }) {
  const [tab, setTab] = useState("summary");
  if (!data) return <div className="card">Scan a document to see extracted data.</div>;

  return (
    <div className="card card-bright">
      <div className="tab-row">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`tab-btn ${tab === t ? "tab-active" : ""}`}>
            {t.toUpperCase()}
          </button>
        ))}
      </div>
      {tab === "summary" && (
        <div>
          <div className="summary-line">
            <span className="mono-title">SENTIMENT</span>
            <span className={`sent-${data.sentiment || "neutral"}`}>{data.sentiment || "neutral"}</span>
            <span className="mono-title">{Math.round((data.sentiment_score || 0.5) * 100)}%</span>
          </div>
          <p>{data.summary || "No summary available."}</p>
        </div>
      )}
      {tab === "entities" && <EntityChips entities={data.entities} />}
      {tab === "keyvalues" && <KeyValueGrid keyValues={data.key_values} />}
      {tab === "tables" && <TableExtractor tables={data.tables} />}
      {tab === "json" && <JsonViewer data={data} />}
    </div>
  );
}
