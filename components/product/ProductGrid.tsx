type Product = {
  _id: string;
  title: string;
  slug?: { current: string } | string;
  heroImage?: any;
};

export default function ProductGrid({ products = [] as Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <div key={p._id} className="border rounded-lg p-4">
          <h3 className="font-semibold">{p.title}</h3>
        </div>
      ))}
    </div>
  );
}
