import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/nav/Breadcrumbs";
import Tabs from "@/components/ui/Tabs";
import { FeatureList } from "@/components/product/FeatureList";
import { SpecTable } from "@/components/product/SpecTable";
import DownloadList from "@/components/product/DownloadList";
import ProductHero from "@/components/product/ProductHero";
import { getProductBySlug } from "@/lib/queries";

export const revalidate = 60;

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return null;

  return (
    <Section>
      <Container>
        <Breadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/products", label: "Products" },
            { href: `/products/${product.category?.slug}`, label: product.category?.title ?? "Category" },
            { href: `/product/${product.slug}`, label: product.title }
          ]}
        />

        <ProductHero product={product} />

        <div className="mt-10">
          <Tabs
            tabs={[
              { key: "overview", label: "Overview",
                content: product.description ? (
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{product.description}</p>
                  </div>
                ) : <p className="text-sm text-gray-500">No overview available.</p>
              },
              { key: "features", label: "Features",
                content: <FeatureList items={product.features} />
              },
              { key: "specs", label: "Specifications",
                content: <SpecTable rows={product.specs} />
              },
              { key: "downloads", label: "Downloads",
                content: <DownloadList product={product} />
              },
            ]}
          />
        </div>

        <section className="mt-12">
          <h3 className="text-xl font-semibold">Related products</h3>
          <p className="mt-2 text-sm text-gray-500">Coming soon.</p>
        </section>
      </Container>
    </Section>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const title = `${product.title} | LaPurity Water Tech`;
  const description = product.description?.slice(0, 150) ?? "LaPurity product";
  const ogImage = product.heroImage ?? product.gallery?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage.asset?.url }] : [],
    },
    alternates: { canonical: `/product/${product.slug}` },
  };
}
