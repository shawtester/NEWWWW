import { ProductCard } from "@/app/components/Products";
import { getCollection } from "@/lib/firestore/collections/read_server";
import { getProduct } from "@/lib/firestore/products/read_server";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export async function generateMetadata({ params }) {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });

  return {
    title: `${collection?.title} | Collection`,
    description: collection?.subTitle ?? "",
    openGraph: {
      images: [collection?.imageURL],
    },
  };
}

export default async function Page({ params }) {
  const { collectionId } = params;
  const collection = await getCollection({ id: collectionId });

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-green-50 py-8  px-5 md:px-16">
        <div className="flex flex-col items-center gap-4 max-w-4xl mx-auto">
        
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
            {collection.title}
          </h1>
       
        </div>
      </section>

      {/* Product Grid */}
      <main className="flex justify-center p-5 md:px-10 md:py-10 w-full bg-gray-50">
        <div className="flex flex-col gap-6 max-w-[1200px] w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collection?.products?.map((productId) => (
              <Product productId={productId} key={productId} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

async function Product({ productId }) {
  const product = await getProduct({ id: productId });
  return (
    <ProductCard
      product={product}
      className="min-h-[300px] max-h-[400px] flex flex-col justify-between"
    />
  );
}
