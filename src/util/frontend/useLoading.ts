import { useRef, useState } from "react";

export function useLoading() {
    const [loading, setLoading] = useState(true);
    const loadingFlag = useRef(false);
    return {
        state: loading,
        ref: loadingFlag,
        start() {
            loadingFlag.current = false;
            setLoading(true);
        },
        stop() {
            loadingFlag.current = true;
            setLoading(false);
        }
    }
}