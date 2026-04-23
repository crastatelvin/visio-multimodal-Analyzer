import { useEffect, useRef } from "react";

export default function useWebSocket(url, onMessage, enabled = true) {
  const wsRef = useRef(null);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  useEffect(() => {
    if (!enabled || !url) return;
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onmessage = (event) => {
      try {
        onMessageRef.current?.(JSON.parse(event.data));
      } catch (_e) {}
    };
    return () => ws.close();
  }, [url, enabled]);

  return wsRef;
}
