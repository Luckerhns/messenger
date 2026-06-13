import { socketClient } from "./index";

/**
 * Subscribe to socket events for refetching data.
 * Call this once in your app initializer (e.g. inside useSocketHook or layout).
 */
export function subscribeToRefetchEvents() {
  const unsubscribeOpen = socketClient.on("open", (event) => {
    console.log("[Refetch] Socket opened:", event);
  });

  const unsubscribeMessage = socketClient.on("message", (data) => {
    console.log("[Refetch] Message received:", data);
    // TODO: dispatch global refetch / invalidate caches here
  });

  return () => {
    unsubscribeOpen();
    unsubscribeMessage();
  };
}

