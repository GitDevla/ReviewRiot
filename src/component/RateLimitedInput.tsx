import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

function RateLimitedInput({ value, onChange, timeout }: { value: React.MutableRefObject<any>, onChange: Function, timeout: number }) {
    const [inputValue, setInputValue] = useState("")
    const timeoutId = useRef(null as NodeJS.Timeout | null);

    useEffect(() => {
        if (!inputValue) return;
        clearTimeout(timeoutId.current!);
        const newTimeoutId = setTimeout(() => {
            onChange();
        }, timeout);
        timeoutId.current = newTimeoutId;
    }, [inputValue]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        value.current = event.target.value;
        setInputValue(value.current);
    }
    return (
        <input type="text" value={inputValue} onChange={handleInputChange} />
    )
}

export default RateLimitedInput