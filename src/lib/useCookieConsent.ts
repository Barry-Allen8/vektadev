"use client";

import { useState, useEffect, useCallback } from "react";

export type CookieConsentValue = "all" | "essential" | null;

const COOKIE_CONSENT_KEY = "cookie_consent";

/**
 * Hook for managing GDPR cookie consent state.
 * Stores user choice in localStorage under key "cookie_consent".
 * 
 * Values:
 * - "all": User accepted all cookies (essential + non-essential)
 * - "essential": User rejected non-essential cookies (only essential allowed)
 * - null: No consent given yet (banner should be shown)
 */
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsentValue>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Read consent from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored === "all" || stored === "essential") {
        setConsent(stored);
      }
    } catch {
      // localStorage not available (SSR or blocked)
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "all");
      setConsent("all");
    } catch {
      // localStorage not available
    }
  }, []);

  // Reject non-essential cookies (only essential allowed)
  const rejectNonEssential = useCallback(() => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, "essential");
      setConsent("essential");
    } catch {
      // localStorage not available
    }
  }, []);

  // Check if consent has been given
  const hasConsent = consent !== null;

  // Check if analytics/tracking is allowed
  const allowsAnalytics = consent === "all";

  return {
    consent,
    isLoading,
    hasConsent,
    allowsAnalytics,
    acceptAll,
    rejectNonEssential,
  };
}
