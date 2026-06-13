import { useEffect, useCallback, useState } from "react";
import { socketClient } from "@/app/sockets";
import { subscribeToRefetchEvents } from "@/app/sockets/refetch";

const useSocketHook = () => {
  const [isConnected, setIsConnected] = useState(socketClient.isConnected);
  const [isConnecting, setIsConnecting] = useState(socketClient.isConnecting);

  useEffect(() => {
    const handleOpen = () => {
      setIsConnected(true);
      setIsConnecting(true);
    };
    const handleClose = () => {
      setIsConnected(false);
      setIsConnecting(false);
    };

    const unsubOpen = socketClient.on("open", handleOpen);
    const unsubClose = socketClient.on("close", handleClose);
    const unsubRefetch = subscribeToRefetchEvents();

    if (!socketClient.isConnected && !socketClient.isConnecting) {
      socketClient.connect();
    }

    return () => {
      unsubOpen();
      unsubClose();
      unsubRefetch();
    };
  }, []);

  const send = useCallback((data: unknown) => {
    socketClient.send(data);
  }, []);

  return {
    isConnecting,
    isConnected,
    send,
    socket: socketClient,
  };
};

export default useSocketHook;

