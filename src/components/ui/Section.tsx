export default function Section({ children, className = "" }: any) {
  return <section className={`py-16 md:py-20 ${className}`}>{children}</section>;
}
