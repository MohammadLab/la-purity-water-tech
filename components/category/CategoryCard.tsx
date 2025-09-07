import Image from "next/image";
import Link from "next/link";

export type CategoryCardProps = {
  title: string;
  href: string;
  imageUrl?: string | null;
  description?: string; // Sanity "blurb"
};

export default function CategoryCard({ title, href, imageUrl, description }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full"
    >
      {/* Pure white card, no gradients */}
      <div className="relative flex h-full flex-col md:flex-row overflow-hidden rounded-2xl border bg-white ring-1 ring-black/5 shadow-sm transition hover:shadow-lg">
        {/* LEFT: Image */}
        <div className="relative w-full md:w-56 lg:w-64">
          <div className="relative aspect-[4/3] w-full md:aspect-auto md:h-full overflow-hidden md:rounded-l-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-100" />
            )}
          </div>
        </div>

        {/* RIGHT: Text */}
        <div className="flex flex-1 flex-col p-5 min-h-[160px]">
          <div className="text-xs text-gray-500">Category</div>

          {/* Reserve height so 1–2 line titles don’t change tile size */}
          <h3 className="mt-1 text-lg font-semibold leading-tight text-[#0D1B2A] min-h-[44px]">
            {title}
          </h3>

          {/* Blurb BELOW the title (no popup) */}
          {description ? (
            <p className="mt-2 text-sm text-gray-700">
              {description}
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Premium systems sized for Canadian homes.
            </p>
          )}

          {/* subtle footer accent */}
          <div className="mt-auto pt-4">
            <span className="inline-block h-px w-16 rounded-full bg-gradient-to-r from-[#00C2FF]/40 via-[#00C2FF]/20 to-transparent" />
          </div>
        </div>
      </div>
    </Link>
  );
}
