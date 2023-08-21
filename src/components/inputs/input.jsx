import { forwardRef } from "react";
import styles from "./style.module.scss";

export const Input = forwardRef(
  ({ title, placeholder, type, error, ...rest }, ref) => {
    return (
      <div className={styles.inputContainer}>
        <label className="label">{title}</label>
        <input
          className="placeholder"
          ref={ref}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
        <span className="error">{error && error.message}</span>
      </div>
    );
  }
);