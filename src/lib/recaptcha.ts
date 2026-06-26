/**
 * Frontend reCAPTCHA v3 helper.
 *
 * Mirrors the auth service's posture: when no site key is configured at build
 * time (`RECAPTCHA_SITE_KEY` empty/unset) this is a no-op and returns
 * `undefined`, so the request carries no token — the backend likewise skips
 * verification when its `RECAPTCHA_SECRET` is unset. The two must be enabled
 * together: a set backend secret with no client token fails closed.
 *
 * The Google script is loaded lazily on first use (i.e. when a registration is
 * attempted), not on every page view, to keep the new-tab page free of the
 * third-party script during normal browsing. A failure to load or execute is
 * swallowed (returns `undefined`) so a reCAPTCHA outage never blocks the form;
 * the backend fails open on infrastructure errors for the same reason.
 */

let scriptPromise: Promise<void> | null = null;

function loadScript(siteKey: string): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(
      siteKey,
    )}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow a retry on the next attempt
      reject(new Error("Failed to load reCAPTCHA."));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Return a reCAPTCHA v3 token for `action`, or `undefined` when reCAPTCHA is
 * not configured (no site key) or the provider is unreachable. Callers forward
 * the token as `captchaToken`.
 */
export async function executeRecaptcha(
  action: string,
): Promise<string | undefined> {
  if (!RECAPTCHA_SITE_KEY) return undefined;
  try {
    await loadScript(RECAPTCHA_SITE_KEY);
    const { grecaptcha } = window;
    if (!grecaptcha) return undefined;
    await new Promise<void>((resolve) => grecaptcha.ready(resolve));
    return await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
  } catch {
    return undefined;
  }
}
