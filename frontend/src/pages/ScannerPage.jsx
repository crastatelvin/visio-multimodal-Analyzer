import ScannerViewport from "../components/ScannerViewport";
import DataPanel from "../components/DataPanel";
import DocumentStats from "../components/DocumentStats";
import ScanProgress from "../components/ScanProgress";
import VisioChat from "../components/VisioChat";

export default function ScannerPage({ data, imageBase64, mediaType, scanning, scanStep, onReset, jobId, error }) {
  return (
    <div className="scanner-root">
      <div className="scanner-bg" />
      <div className="scanner-shell">
      <div className="scanner-top scanner-top-glass">
        <div className="landing-brand">
          <div className="landing-brand-icon">◆</div>
          <h1>VISIO</h1>
        </div>
        <button className="upload-btn" onClick={onReset}>New Scan</button>
      </div>
      <ScanProgress currentStep={scanStep} visible={scanning} />
      {error && <div className="error">{error}</div>}
      {data && <DocumentStats data={data} />}
      <div className="scanner-grid">
        <ScannerViewport imageBase64={imageBase64} mediaType={mediaType} scanning={scanning} analysisData={data} />
        <DataPanel data={data} />
      </div>
      {data && <VisioChat jobId={jobId} />}
      </div>
    </div>
  );
}
