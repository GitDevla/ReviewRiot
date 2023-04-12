import useEffectMounted from '@/util/frontend/useEffectMounted';
import React, { ChangeEvent, useRef, useState } from 'react'

function RateLimitedInput({ value, onChange, timeout }: { value: React.MutableRefObject<any>, onChange: Function, timeout: number }) {
    const [inputValue, setInputValue] = useState("")
    const timeoutId = useRef(null as NodeJS.Timeout | null);

    useEffectMounted(() => {
        clearTimeout(timeoutId.current!);
        const newTimeoutId = setTimeout(() => {
            onChange();
        }, timeout);
        timeoutId.current = newTimeoutId;
    }, [inputValue]);

    useEffectMounted(() => {
        setInputValue(value.current)
    }, [value.current])


    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        value.current = event.target.value;
        setInputValue(value.current);
    }

    return (
        <input type="text" value={inputValue} onChange={handleInputChange} />
    )
}

export default RateLimitedInput