export default function DownloadList({ product }: { product: any }) {
  const items = [
    ...(product.brochure ? [{ title: "Brochure (PDF)", url: product.brochure?.asset?.url }] : []),
    ...(product.downloads?.map((d:any)=>({ title: d.title ?? "Download", url: d.file?.asset?.url })) ?? []),
  ].filter(Boolean);

  if (!items.length) return null;

  return (
    <ul className="grid gap-2">
      {items.map((it:any, idx:number)=>(
        <li key={idx}>
          <a className="text-cyan-700 underline" href={it.url}>{it.title}</a>
        </li>
      ))}
    </ul>
  );
}
