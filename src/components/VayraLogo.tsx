import React from 'react';

interface VayraLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const VayraLogo: React.FC<VayraLogoProps> = ({
  className = '',
  size = 44,
  showText = false,
  textColor,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
        aria-label="Vayra Technical Contracting Logo"
      >
        <defs>
          {/* Outer ring gradient: Blue on left to Golden Orange on right */}
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077C8" />
            <stop offset="45%" stopColor="#0284C7" />
            <stop offset="55%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Blue HVAC cold duct gradient */}
          <linearGradient id="blueDuctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Orange HVAC warm duct gradient */}
          <linearGradient id="orangeDuctGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>
        </defs>

        {/* Outer Circular Frame */}
        <circle
          cx="250"
          cy="250"
          r="230"
          stroke="url(#ringGrad)"
          strokeWidth="18"
          fill="none"
        />

        {/* Inner thin accent ring */}
        <circle
          cx="250"
          cy="250"
          r="205"
          stroke="#0284C7"
          strokeWidth="2.5"
          strokeOpacity="0.4"
          fill="none"
        />

        {/* ================= LEFT ARM OF "V" (Blue HVAC Duct) ================= */}
        {/* Top Intake Elbow */}
        <path
          d="M100 125 H125 V182 H100 Z"
          fill="#0077C8"
        />
        <path
          d="M125 125 H165 V155 L135 200 H105 L125 155 V125 Z"
          fill="#0077C8"
        />

        {/* Duct Segment 1 (Top) */}
        <path
          d="M130 150 L166 125 L190 185 L148 206 Z"
          fill="#0077C8"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 2 */}
        <path
          d="M150 210 L192 189 L212 248 L168 268 Z"
          fill="#0077C8"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 3 */}
        <path
          d="M170 272 L214 252 L233 310 L188 328 Z"
          fill="#0077C8"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 4 (Lower toward apex) */}
        <path
          d="M190 332 L235 314 L248 355 L210 376 Z"
          fill="#0077C8"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* ================= LEFT AIRFLOW STREAMLINES (Cold Blue Suction / Airflow) ================= */}
        {/* Top curved streamline */}
        <path
          d="M110 195 C88 205 75 220 78 238 C80 248 85 255 102 265"
          stroke="#0077C8"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Top arrow head */}
        <path
          d="M76 195 L95 192 L85 210 Z"
          fill="#0077C8"
        />

        {/* Middle curved streamline */}
        <path
          d="M98 228 C74 240 65 256 68 274 C70 286 82 298 108 308"
          stroke="#0077C8"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle arrow head */}
        <path
          d="M106 222 L116 238 L98 238 Z"
          fill="#0077C8"
        />

        {/* Bottom curved streamline */}
        <path
          d="M80 275 C95 288 108 298 114 318 C116 325 116 332 114 340"
          stroke="#0077C8"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bottom arrow head pointing down-right */}
        <path
          d="M110 348 L122 334 L106 330 Z"
          fill="#0077C8"
        />

        {/* ================= RIGHT ARM OF "V" (Orange HVAC Duct) ================= */}
        {/* Top Exhaust Elbow */}
        <path
          d="M400 125 H375 V182 H400 Z"
          fill="#EA580C"
        />
        <path
          d="M375 125 H335 V155 L365 200 H395 L375 155 V125 Z"
          fill="#EA580C"
        />

        {/* Duct Segment 1 (Top) */}
        <path
          d="M370 150 L334 125 L310 185 L352 206 Z"
          fill="#EA580C"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 2 */}
        <path
          d="M350 210 L308 189 L288 248 L332 268 Z"
          fill="#EA580C"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 3 */}
        <path
          d="M330 272 L286 252 L267 310 L312 328 Z"
          fill="#EA580C"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Duct Segment 4 (Lower toward apex) */}
        <path
          d="M310 332 L265 314 L252 355 L290 376 Z"
          fill="#EA580C"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* ================= RIGHT AIRFLOW STREAMLINES (Warm Orange Exhaust) ================= */}
        {/* Top curved streamline */}
        <path
          d="M390 195 C412 205 425 220 422 238 C420 248 415 255 398 265"
          stroke="#EA580C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Top arrow head */}
        <path
          d="M424 195 L405 192 L415 210 Z"
          fill="#EA580C"
        />

        {/* Middle curved streamline */}
        <path
          d="M402 228 C426 240 435 256 432 274 C430 286 418 298 392 308"
          stroke="#EA580C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle arrow head */}
        <path
          d="M394 222 L384 238 L402 238 Z"
          fill="#EA580C"
        />

        {/* Bottom curved streamline */}
        <path
          d="M420 275 C405 288 392 298 386 318 C384 325 384 332 386 340"
          stroke="#EA580C"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Bottom arrow head pointing down-left */}
        <path
          d="M390 348 L378 334 L394 330 Z"
          fill="#EA580C"
        />

        {/* ================= BOTTOM CONCENTRIC RIPPLE APEX ================= */}
        {/* Outer concentric curve */}
        <path
          d="M214 362 C226 390 274 390 286 362"
          stroke="#0077C8"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* 2nd curve */}
        <path
          d="M220 376 C230 404 270 404 280 376"
          stroke="#EA580C"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* 3rd curve */}
        <path
          d="M228 392 C236 415 264 415 272 392"
          stroke="#0077C8"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        {/* 4th curve */}
        <path
          d="M236 408 C242 424 258 424 264 408"
          stroke="#EA580C"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Central bottom pearl dot */}
        <ellipse
          cx="250"
          cy="420"
          rx="7"
          ry="7"
          fill="#0077C8"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className={`text-lg font-bold tracking-tight leading-tight ${textColor || 'text-neutral-900 dark:text-white'}`}>
            VAYRA
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase">
            Technical Contracting
          </span>
        </div>
      )}
    </div>
  );
};
