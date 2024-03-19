import { useEffect, useState } from 'react';

/* 
    When trying to accomplish these two points: "Name input should be validated using the provided mock API to check whether the chosen name is taken or not.
    Name input should be validated as the user is typing." This seemed like a type of input I would need to look up as I had never controlled how often text is checked
    when fetching from an api. I found useDebounce to be the most React approach to solving the issue of only fetching from the api ONCE the user stops typing
    for a set amount of time.
*/
export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debouncedValue;
};