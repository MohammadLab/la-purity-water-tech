export default function Container({ children, className = "" }: any) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}
