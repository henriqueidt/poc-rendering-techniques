import { AppProps } from "next/app";
import { useEffect } from "react";
import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";

async function reportWebVitals(metric: Object) {
  await fetch("/api/ui-metrics", {
    method: "POST",
    body: JSON.stringify({
      ...metric,
      timestamp: Date.now(),
      path: window.location.pathname,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    keepalive: true,
  });
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onINP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
  }, []);

  return <Component {...pageProps} />;
}
