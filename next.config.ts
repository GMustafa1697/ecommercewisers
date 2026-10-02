import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// The "without nonces" policy from the Next.js CSP guide
// (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md): nonces would force dynamic
// rendering, and the homepage is static. 'wasm-unsafe-eval' lets dotLottie compile its self-hosted WASM
// renderer; 'unsafe-eval' is for React's dev tooling only. HSTS and upgrade-insecure-requests need
// HTTPS, so they're left to the host.
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "X-Frame-Options", value: "DENY" },
];

// Files in public/ get `max-age=0` by default. The WASM has its version in its name, so it's cached
// for good; the animations, videos and platform logos keep their names when replaced, so for a day.
const cacheForever = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
const cacheForADay = [{ key: "Cache-Control", value: "public, max-age=86400" }];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      { source: "/lottie/:path*", headers: cacheForever },
      { source: "/animations/:path*", headers: cacheForADay },
      { source: "/videos/:path*", headers: cacheForADay },
      { source: "/images/platforms/:path*", headers: cacheForADay },
    ];
  },
};

export default nextConfig;
