/* eslint-disable @typescript-eslint/no-explicit-any */
import { MIDTRANS_API_URL, MIDTRANS_CLIENT_ID } from "@/lib/utils";
import { useState, useEffect } from "react";

type SnapAction = {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onClose?: () => void;
};

const useSnap = () => {
  const [snap, setSnap] = useState<Record<string, any> | null>(null);
  useEffect(() => {
    const myMidtransClientKey = MIDTRANS_CLIENT_ID;
    const script = document.createElement("script");
    script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
    script.setAttribute("data-client-key", myMidtransClientKey);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const snapEmbed = (
    snap_token: string,
    embedId: string,
    action: SnapAction
  ) => {
    if (snap) {
      snap.embed(snap_token, {
        embedId,
        onSuccess: function (result: unknown) {
          console.log("success", result);
          action.onSuccess?.(result);
        },
        onPending: function (result: unknown) {
          console.log("pending", result);
          action.onPending?.(result);
        },
        onClose: function () {
          action.onClose?.();
        },
      });
    }
  };

  return { snapEmbed };
};

export default useSnap;

declare global {
  interface Window {
    snap: any;
  }
}
