import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturesSection from "../components/Products/FeaturesSection";

const placeholderProducts=[
  {
        _id:1,
        name: "Product 1",
        price: 1000,
        images: [{url: "https://picsum.photos/500/500?random=3"}] 
    },
    {
        _id:2,
        name: "Product 2",
        price: 1320,
        images: [{url: "https://picsum.photos/500/500?random=4"}] 
    },
    {
        _id:3,
        name: "Product 3",
        price: 1900,
        images: [{url: "https://picsum.photos/500/500?random=5"}] 
    },
    {
        _id:4,
        name: "Product 4",
        price: 1200,
        images: [{url: "https://picsum.photos/500/500?random=6"}] 
    },
    {
        _id:5,
        name: "Product 5",
        price: 1000,
        images: [{url: "https://picsum.photos/500/500?random=7"}] 
    },
    {
        _id:6,
        name: "Product 6",
        price: 1320,
        images: [{url: "https://picsum.photos/500/500?random=8"}] 
    },
    {
        _id:7,
        name: "Product 7",
        price: 1900,
        images: [{url: "https://picsum.photos/500/500?random=9"}] 
    },
    {
        _id:8,
        name: "Product 8",
        price: 1200,
        images: [{url: "https://picsum.photos/500/500?random=10"}] 
    }
]

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>

      {/* Best Sellers  */}
      <h2 className="text-3xl text-center font-bold mb-4"> Best Seller</h2>
      <ProductDetails/>
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
      <FeaturedCollection/>
      <FeaturesSection/>
    </div>
  )
}

export default Home
