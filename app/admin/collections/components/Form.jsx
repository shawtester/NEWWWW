import { createNewCollection, updateCollection } from "@/lib/firestore/collections/write";
import { useProduct, useProducts } from "@/lib/firestore/products/read";
import { Button } from "@nextui-org/react";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios for Cloudinary upload

export default function Form() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null); // State for image file
  const { data: products } = useProducts({ pageLimit: 2000 });

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // Fetch collection data if an ID exists (for updating)
  const fetchData = async () => {
    try {
      const res = await getCollection({ id });
      if (!res) {
        toast.error("Collection Not Found!");
      } else {
        setData(res);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  // Cloudinary image upload function
  const uploadImageToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "NUTRIBOX"); // Replace with your preset
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzk0kk3gh/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );
      return response.data.secure_url; // Return the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image to Cloudinary");
      return null;
    }
  };

  // Update form state data
  const handleData = (key, value) => {
    setData((prevData) => ({
      ...(prevData ?? {}),
      [key]: value,
    }));
  };

  // Create new collection
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      if (!data?.title) {
        toast.error("Title is required");
        return;
      }

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      await createNewCollection({ data: { ...data, imageURL: imageUrl } });
      toast.success("Successfully Created");
      setData(null);
      setImage(null); // Clear image state after successful creation
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  // Update existing collection
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      if (!data?.title) {
        toast.error("Title is required");
        return;
      }

      let imageUrl = data?.imageURL; // Keep the existing image URL if no new image is uploaded
      if (image) {
        imageUrl = await uploadImageToCloudinary(image);
      }

      await updateCollection({ data: { ...data, imageURL: imageUrl } });
      toast.success("Successfully Updated");
      setData(null);
      setImage(null); // Clear image state after successful update
      router.push(`/admin/collections`);
    } catch (error) {
      toast.error(error?.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]">
      <h1 className="font-semibold">{id ? "Update" : "Create"} Collection</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (id) {
            handleUpdate();
          } else {
            handleCreate();
          }
        }}
        className="flex flex-col gap-3"
      >
        {/* Title Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collection-title" className="text-gray-500 text-sm">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="collection-title"
            name="collection-title"
            type="text"
            placeholder="Enter Title"
            value={data?.title ?? ""}
            onChange={(e) => handleData("title", e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        {/* Subtitle Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collection-sub-title" className="text-gray-500 text-sm">
            Sub Title <span className="text-red-500">*</span>
          </label>
          <input
            id="collection-sub-title"
            name="collection-sub-title"
            type="text"
            value={data?.subTitle ?? ""}
            onChange={(e) => handleData("subTitle", e.target.value)}
            placeholder="Enter Sub Title"
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        {/* Product Selection */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collection-products" className="text-gray-500 text-sm">
            Select Product <span className="text-red-500">*</span>
          </label>
          <select
            id="collection-products"
            name="collection-products"
            onChange={(e) => {
              setData((prevData) => {
                const list = [...(prevData?.products ?? []), e.target.value];
                return { ...prevData, products: list };
              });
            }}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          >
            <option value="">Select Product</option>
            {products?.map((item) => (
              <option
                key={item?.id}
                disabled={data?.products?.includes(item?.id)}
                value={item?.id}
              >
                {item?.title}
              </option>
            ))}
          </select>
        </div>

        {/* Display Selected Products */}
        <div className="flex flex-wrap gap-3">
          {data?.products?.map((productId) => (
            <ProductCard
              productId={productId}
              key={productId}
              setData={setData}
            />
          ))}
        </div>

        {/* Image Upload Field */}
        <div className="flex flex-col gap-1">
          <label htmlFor="collection-image" className="text-gray-500 text-sm">
            Upload Image
          </label>
          <input
            type="file"
            id="collection-image"
            name="collection-image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border px-4 py-2 rounded-lg w-full"
          />
          {image && (
            <div className="mt-2">
              <p>Selected image: {image.name}</p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
          {id ? "Update" : "Create"}
        </Button>
      </form>
    </div>
  );
}

// Component to Display Selected Products
function ProductCard({ productId, setData }) {
  const { data: product } = useProduct({ productId });
  return (
    <div className="flex gap-3 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
      <h2>{product?.title}</h2>
      <button
        onClick={(e) => {
          e.preventDefault();
          setData((prevData) => {
            const list = prevData?.products?.filter((item) => item !== productId);
            return { ...prevData, products: list };
          });
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}
