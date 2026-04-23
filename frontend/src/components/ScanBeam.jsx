import { motion } from "framer-motion";

export default function ScanBeam() {
  return (
    <motion.div
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, transparent, #3b82f6, #06b6d4, #3b82f6, transparent)",
        boxShadow: "0 0 20px rgba(59,130,246,0.8), 0 0 40px rgba(6,182,212,0.4)",
        zIndex: 10
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10px",
          left: 0,
          right: 0,
          height: "20px",
          background: "linear-gradient(180deg, transparent, rgba(59,130,246,0.1), transparent)",
          pointerEvents: "none"
        }}
      />
    </motion.div>
  );
}
