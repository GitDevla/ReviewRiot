import { useEffect, useState } from "react";
import style from "@/styles/starRating.module.scss"

function StarRating({ value = 0, readOnly = true, onClick = (value: number) => { } }) {
    value = value ?? 0;
    value = Math.round(value * 10) / 10;
    const [rating, setRating] = useState(Math.round(value));
    const [hover, setHover] = useState(0);

    useEffect(() => {
        setRating(value)
    }, [value])

    return (
        <span className={style.rating}>
            {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                    readOnly ? <span
                        key={index}
                        className={index <= (hover || rating) ? style.on : style.off}>
                        &#9733;
                    </span> : <span
                        key={index}
                        className={index <= (hover || rating) ? style.on : style.off}
                        onClick={() => { setRating(index); onClick(index) }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}>
                        &#9733;
                    </span>
                );
            })}
            <span>{value}/5</span>
        </span>
    );
};
export default StarRating;