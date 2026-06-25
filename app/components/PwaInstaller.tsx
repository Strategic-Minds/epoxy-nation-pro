"use client";

import { useEffect } from "react";

export function PwaInstaller() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // PWA validation will surface registration failures in the build receipt.
      });
    }
  }, []);

  return null;
}
