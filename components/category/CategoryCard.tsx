import Image from "next/image";
import Link from "next/link";

export type CategoryCardProps = {
  title: string;
  href: string;
  imageUrl?: string | null;
  description?: string;
};

export default function CategoryCard({ title, href, imageUrl, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl border bg-white/80 ring-1 ring-black/5 shadow-sm hover:shadow-md transition"
    >
      <div className="relative h-40 w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/30 to-transparent" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent" />
      </div>

      <div className="p-5">
        <div className="text-xs text-gray-500">Category</div>
        <div className="mt-1 text-lg font-semibold text-[#0D1B2A]">{title}</div>
        {description && (
          <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  );
}
