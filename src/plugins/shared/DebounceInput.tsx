import React, { FC, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks";

interface Props
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
  value?: string;
  wait?: number;
}

export const DebounceInput: FC<Props> = ({
  wait = 1000,
  onChange,
  ...props
}) => {
  const [newValue, setNewValue] = useState(props.value || "");
  const debouncedValue = useDebounce(newValue, wait);

  // Hold the latest onChange in a ref so the debounce effect only runs
  // when the debounced value actually changes — not on every parent
  // render that recreates the onChange callback.
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    onChangeRef.current(debouncedValue);
  }, [debouncedValue]);

  return (
    <input
      {...props}
      value={newValue}
      onChange={(event) => setNewValue(event.target.value)}
    />
  );
};
