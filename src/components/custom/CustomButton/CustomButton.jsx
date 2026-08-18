import Link from "next/link";
import styles from "./CustomButton.module.css";
import { cn } from "@/lib/utils";

export default function CustomButton({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = false,
  icon: Icon,
  className,
  ...rest
}) {
  const classes = cn(
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  );

  const content = (
    <>
      {children}
      {Icon && <Icon className={styles.icon} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...rest}
    >
      {content}
    </button>
  );
}