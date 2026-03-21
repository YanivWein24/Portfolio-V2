type StartApp = () => void;

type CleanupOptions = {
  sessionStorageKey?: string;
};

const cleanupLegacyServiceWorkerAndCaches = async () => {
  if (!("serviceWorker" in navigator)) return false;

  const wasControlled = Boolean(navigator.serviceWorker.controller);
  const registrations = await navigator.serviceWorker.getRegistrations();

  await Promise.all(registrations.map((registration) => registration.unregister()));

  if ("caches" in window) {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)));
  }

  return wasControlled || registrations.length > 0;
};

export default async function legacyPwaCleanupBootstrap(
  startApp: StartApp,
  options?: CleanupOptions
) {
  const sessionStorageKey = options?.sessionStorageKey ?? "portfolioV2_sw_cleanup_done";

  try {
    const alreadyCleaned = sessionStorage.getItem(sessionStorageKey) === "1";

    if (!alreadyCleaned) {
      const changedSomething = await cleanupLegacyServiceWorkerAndCaches();
      sessionStorage.setItem(sessionStorageKey, "1");

      if (changedSomething) {
        window.location.reload();
        return;
      }
    }
  } catch {
    // no-op
  }

  startApp();
}
