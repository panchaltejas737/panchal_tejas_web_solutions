import { forwardRef } from "react";
import styles from "./CustomTextarea.module.css";
import { cn } from "@/lib/utils";

const CustomTextarea = forwardRef(
  ({ label, name, error, rows = 5, className, ...rest }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <textarea
          id={name}
          name={name}
          rows={rows}
          ref={ref}
          className={cn(styles.textarea, error && styles.textareaError, className)}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

CustomTextarea.displayName = "CustomTextarea";
export default CustomTextarea;