import { ChangeEventHandler, useRef } from "react";

export default function useDebounce(fn: ChangeEventHandler<HTMLInputElement> | undefined | any, delay: number | undefined) {
  const timoutRef = useRef<number | null>(null);
  
  function deboundedFn(...args: any[]) {
    window.clearTimeout(timoutRef.current as unknown as number);
    
    timoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay);
  }

  return deboundedFn;
}