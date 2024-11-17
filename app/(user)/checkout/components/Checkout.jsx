"use client";

import { useAuth } from "@/context/AuthContext";
import { createCheckoutAndGetURL } from "@/lib/firestore/checkout/write";
import { Button } from "@nextui-org/react";
import confetti from "canvas-confetti";
import { CheckSquare2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getProduct } from "@/lib/firestore/products/read_server"; // Import getProduct to fetch product by ID

export default function Checkout({ productList }) {
    
    
    
    
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
  }); // Set default structure for the address
  const [productImages, setProductImages] = useState([]); // State to hold product images
  const router = useRouter();
  const { user } = useAuth();

  const handleAddress = (key, value) => {
    setAddress({ ...(address ?? {}), [key]: value });
  };

  // Calculate the total price for all products
 
  
  

  useEffect(() => {
    const fetchImages = async () => {
      const images = [];
      for (let i = 0; i < productList.length; i++) {
        const productId = productList[i].product.id; // Assuming each item has a `product.id`
        const image = await fetchProductImage(productId);
        images.push(image);
      }
      setProductImages(images);
    };

    if (productList.length > 0) {
      fetchImages();
    }
  }, [productList]);

  // Fetch product image for each product in the cart
  const fetchProductImage = async (id) => {
    try {
      const product = await getProduct({ id });
      if (product) {
        console.log(`Fetched image for product ID ${id}:`, product.featureImageURL); // Log the image URL
        return product.imageList[0];
      }
      console.log(`No image found for product ID ${id}`);
      return null;
    } catch (error) {
      console.error("Error fetching product image:", error);
      return null;
    }
  };

  // Handle order placement
  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      if (totalPrice <= 0) {
        throw new Error("Price should be greater than 0");
      }
      if (!address?.fullName || !address?.mobile || !address?.addressLine1) {
        throw new Error("Please Fill All Address Details");
      }

      if (!productList || productList?.length === 0) {
        throw new Error("Product List Is Empty");
      }

      // Since we only have prepaid now, we directly call the prepaid checkout function
      const url = await createCheckoutAndGetURL({
        uid: user?.uid,
        products: productList,
        address: address,
      });
      router.push(url);
      toast.success("Successfully Placed!");
      confetti();
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };
  const totalItemPricesWithGST = productList?.map((item, index) => {
    const salePrice = parseFloat(item?.salePrice);
    const quantity = item?.quantity || 0; // Ensure quantity is a valid number
    const totalItemPrice = salePrice * quantity;
  
    // Add 18% GST
    const gstAmount = totalItemPrice * 0.18;
    const totalPriceWithGST = totalItemPrice + gstAmount;
  
    return totalPriceWithGST; 
  });
  

  return (
    <section className="flex flex-col md:flex-row gap-6 p-6">
      {/* Shipping Address Section */}
      <section className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Shipping Address</h1>
        <div className="flex flex-col gap-4">
          {/* Address inputs */}
          <input
            type="text"
            placeholder="Full Name"
            value={address.fullName}
            onChange={(e) => handleAddress("fullName", e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={address.mobile}
            onChange={(e) => handleAddress("mobile", e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address Line 1"
            value={address.addressLine1}
            onChange={(e) => handleAddress("addressLine1", e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Address Line 2 (optional)"
            value={address.addressLine2}
            onChange={(e) => handleAddress("addressLine2", e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => handleAddress("city", e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) => handleAddress("postalCode", e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </section>

      {/* Products Section */}
      <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold mb-4">Products</h1>

        <div className="flex flex-col gap-4">
          {productList?.map((item, index) => {
            const productImage = productImages[index];
            const salePrice = parseFloat(item?.salePrice);
            const price = parseFloat(item?.price);
            const totalItemPrice = salePrice * item?.quantity;
        
        
            

            return (
              <div key={index} className="flex gap-4 items-center border-b py-3">
                <img
                  className="w-16 h-16 object-cover rounded-lg"
                  src={productImage || item?.product?.featureImageURL}
                  alt={item?.product?.title}
                />
                <div className="flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold">{item?.product?.title}</h2>
                  <div className="text-sm text-gray-600">
                    <span className="line-through">₹ {price}</span> ₹ {salePrice} x {item?.quantity}
                  </div>
                </div>
                <div className="text-lg font-semibold text-gray-900">
                  ₹ {totalItemPrice} {/* Display the calculated total */}
                </div>
              </div>
            );
          })}
        </div>
         <h3>18 % GST</h3>
        <div className="flex justify-between items-center p-4 mt-4 font-semibold text-xl border-t">
          <h2>Total</h2>
         
          <h2> ₹ {totalItemPricesWithGST}</h2>
        </div>
      </div>

      {/* Payment Mode Section */}
      <section className="flex-1 bg-white rounded-xl shadow-lg p-6 mt-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Payment Mode</h2>
        </div>
        <div className="flex gap-2 items-center mb-4">
          <CheckSquare2Icon className="text-blue-500" size={20} />
          <span className="text-gray-600">I agree to the terms and conditions</span>
        </div>
        <Button
          isLoading={isLoading}
          loadingText="Placing Order..."
          onClick={handlePlaceOrder}
          color="primary"
          className="w-full py-3"
        >
          Place Order
        </Button>
      </section>
    </section>
  );
}
