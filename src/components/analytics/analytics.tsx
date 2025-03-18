import GoogleAnalytics from "./google-analytics";

export function Analytics() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      {/* google analytics */}
      <GoogleAnalytics />
    </>
  );
}
