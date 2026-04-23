import { useEffect, useRef } from "react";

export default function useWebSocket(url, onMessage, enabled = true) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (!enabled || !url) return;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (event) => {
      try {
        onMessage?.(JSON.parse(event.data));
      } catch (_e) {}
    };
    return () => ws.close();
  }, [url, enabled, onMessage]);

  return wsRef;
}
