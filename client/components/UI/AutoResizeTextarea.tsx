import { useAutoResizeTextarea } from "@/hooks/helpers/useTextareaHook";
import React from "react";

const AutoResizeTextarea = ({
  maxHeight = 200,
  minHeight = 45,
  debounceDelay = 100,
  className,
  ...props
}) => {
  const { textareaRef, height } = useAutoResizeTextarea({
    maxHeight,
    minHeight,
    debounceDelay,
    value: (props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).value
  });

  return (
    <textarea
      ref={textareaRef}
      className={className}
      style={{
        height: height || 45,
        minHeight: `${minHeight}px`,
        maxHeight: `${maxHeight}px`,
        overflowY: "hidden",
        resize: "none",
        width: "100%",
        padding: "10px 20px 10px 20px",
        fontSize: "14px",
        border: "1px solid #ddd",
        boxSizing: "border-box",
        transition: "height 0.1s ease",
        borderRadius: "25px",
      }}
      {...props}
    />
  );
};

export default AutoResizeTextarea;
