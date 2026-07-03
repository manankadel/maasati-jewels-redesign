import { ImageResponse } from "next/og";

export const alt =
  "Maa Satti Jewels — The Atelier Behind India's Finest Jewellers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf6ef",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Line-art gem mark */}
        <svg
          width="130"
          height="112"
          viewBox="0 0 120 104"
          fill="none"
          style={{ marginBottom: 44 }}
        >
          <path
            d="M30 10 L90 10 L112 40 L60 98 L8 40 Z"
            stroke="#8f6b26"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M8 40 L112 40" stroke="#8f6b26" strokeWidth="1" opacity="0.6" />
          <path d="M30 10 L44 40 L60 98" stroke="#8f6b26" strokeWidth="1" opacity="0.6" />
          <path d="M90 10 L76 40 L60 98" stroke="#8f6b26" strokeWidth="1" opacity="0.6" />
          <path d="M60 10 L44 40" stroke="#8f6b26" strokeWidth="1" opacity="0.6" />
          <path d="M60 10 L76 40" stroke="#8f6b26" strokeWidth="1" opacity="0.6" />
        </svg>
        <div
          style={{
            fontSize: 30,
            letterSpacing: 14,
            color: "#8f6b26",
            marginBottom: 28,
          }}
        >
          MAA SATTI JEWELS
        </div>
        <div
          style={{
            fontSize: 62,
            fontStyle: "italic",
            color: "#0b0a08",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 940,
          }}
        >
          The atelier behind India&apos;s finest jewellers.
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            letterSpacing: 6,
            color: "rgba(11, 10, 8, 0.55)",
          }}
        >
          JAIPUR · EST. 2003 · B2B POLKI &amp; DIAMOND MANUFACTURING
        </div>
      </div>
    ),
    { ...size }
  );
}
