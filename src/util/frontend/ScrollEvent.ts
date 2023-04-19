import React from "react";

export function ScrollEventGen(loadingRef: React.MutableRefObject<Boolean>, fun: Function, offset = 900) {
    return () => {
        if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - offset)
            if (loadingRef.current)
                fun();
    }
}