import Link from "next/link";

export default function Breadcrumbs({ items }:{items:{href:string; label:string}[]}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
      <ol className="flex flex-wrap gap-1">
        {items.map((it,i)=>(
          <li key={i} className="flex items-center">
            {i>0 && <span className="mx-1">/</span>}
            <Link href={it.href} className="hover:text-gray-900">{it.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
