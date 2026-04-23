const STYLE_MAP = {
  PERSON: "ent-person",
  ORG: "ent-org",
  DATE: "ent-date",
  AMOUNT: "ent-amount",
  LOCATION: "ent-location"
};

export default function EntityChips({ entities }) {
  if (!entities?.length) return <div className="empty-note">No entities detected</div>;
  return (
    <div className="chip-wrap">
      {entities.map((entity, i) => (
        <div key={`${entity.type}-${i}`} className={`entity-chip ${STYLE_MAP[entity.type] || ""}`}>
          <span className="chip-type">{entity.type}</span>
          <span>{entity.value}</span>
          <span className="chip-conf">{entity.confidence}%</span>
        </div>
      ))}
    </div>
  );
}
