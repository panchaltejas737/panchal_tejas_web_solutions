import styles from "./CustomCard.module.css";
import { cn } from "@/lib/utils";

export default function CustomCard({
  children,
  className,
  padding = "md",
  hoverEffect = true,
  ...rest
}) {
  return (
    <div
      className={cn(
        styles.card,
        styles[`padding-${padding}`],
        hoverEffect && styles.hoverEffect,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}