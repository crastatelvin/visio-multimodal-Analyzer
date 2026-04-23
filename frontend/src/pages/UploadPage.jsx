import DocumentUpload from "../components/DocumentUpload";

export default function UploadPage({ onScanStart, onScanComplete, onScanError }) {
  return <DocumentUpload onScanStart={onScanStart} onScanComplete={onScanComplete} onScanError={onScanError} />;
}
