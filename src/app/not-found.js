import Link from "next/link";
import CustomButton from "@/components/custom/CustomButton/CustomButton";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "24px",
      }}
    >
      <h1 style={{ fontSize: "6rem", fontWeight: 800, color: "var(--color-primary)" }}>
        404
      </h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "24px", maxWidth: "420px" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/">
        <CustomButton variant="primary">Back to Home</CustomButton>
      </Link>
    </div>
  );
}