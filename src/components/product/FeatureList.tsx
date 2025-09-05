export function FeatureList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="grid gap-2">
      {items.map((f, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-2 size-2 rounded-full bg-cyan-500" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}
