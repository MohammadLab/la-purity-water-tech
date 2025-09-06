import Image from "next/image";
import Link from "next/link";

export type CategoryCardProps = {
  title: string;
  href: string;
  imageUrl?: string | null;
  description?: string; // ultra-short blurb
};

export default function CategoryCard({ title, href, imageUrl, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-b from-cyan-200/60 via-transparent to-cyan-200/60 shadow-sm hover:shadow-lg transition"
    >
      <div className="relative rounded-2xl border bg-white/80 ring-1 ring-black/5 backdrop-blur">
        {/* Image header */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(600px_200px_at_40%_20%,rgba(0,194,255,0.25),transparent)]" />
          )}
          {/* soft gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-transparent" />
        </div>

        {/* Body */}
        <div className="relative p-5">
          <div className="text-xs text-gray-500">Category</div>
          <div className="mt-1 text-lg font-semibold text-[#0D1B2A]">{title}</div>

          {/* Hover pop description */}
          {description && (
            <div className="absolute right-4 -top-4 opacity-0 scale-95 translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition duration-200">
              <div className="relative rounded-xl bg-white/95 ring-1 ring-black/5 shadow-lg px-3 py-2 text-xs text-gray-700 backdrop-blur">
                {description}
                {/* arrow */}
                <span className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-white/95 ring-1 ring-black/5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
