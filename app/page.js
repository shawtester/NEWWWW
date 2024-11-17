import Image from "next/image";
import Header from "@/app/components/Header";
import Carousel from "@/app/components/Carousel";




import CustomerReviews from "./components/CustomerReviews";
import { getBrands } from "@/lib/firestore/brands/read_server";
import Brands from "./components/Brands";
import Collections from "./components/Collections";
import { getCollections } from "@/lib/firestore/collections/read_server";
import Categories from "./components/Categories";
import { getCategories } from "@/lib/firestore/categories/read_server";
import ProductsGridView from "./components/Products";
import { getProducts } from "@/lib/firestore/products/read_server";
import Footer from "./components/Footer";







export default async function Home() {
  const [brands,collections,categories,products] =
  await Promise.all([
    
    getBrands(),
    getCollections(),
    getCategories(),
    getProducts(),
  
  
    
  ]);
  


 
  return (
    <main>
      <Header />
      <Carousel />

    
   
     <Collections collections={collections}/>
     <Categories categories={categories}/>
     <ProductsGridView products={products}/>
      <Brands brands={brands} />
     
      <CustomerReviews/>
      <Footer/>
      
      
    </main>
  );
}
