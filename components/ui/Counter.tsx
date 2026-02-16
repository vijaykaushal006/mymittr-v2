"use client";

import { useEffect, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number;
}

export default function Counter({ end, duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(counter);
        setCount(end);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end, duration]);

  return <span>{count.toLocaleString()}+</span>;
}
