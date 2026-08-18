import Loader from "@/components/custom/Loader/Loader";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader size="lg" />
    </div>
  );
}