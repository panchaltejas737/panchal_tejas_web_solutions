import { forwardRef } from "react";
import styles from "./CustomInput.module.css";
import { cn } from "@/lib/utils";

const CustomInput = forwardRef(
  ({ label, name, error, type = "text", className, ...rest }, ref) => {
    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
        )}
        <input
          id={name}
          name={name}
          type={type}
          ref={ref}
          className={cn(styles.input, error && styles.inputError, className)}
          {...rest}
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
export default CustomInput;