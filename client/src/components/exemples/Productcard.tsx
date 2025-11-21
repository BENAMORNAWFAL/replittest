import ProductCard from "../ProductCard";
import burgerImage from "../../assets/generated_images/gourmet_burger_product_photo.png";

export default function ProductCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <ProductCard
          product={{
            id: "1",
            name: "Gourmet Burger",
            description:
              "Juicy beef patty with crispy bacon, melted cheese, fresh lettuce and tomato on a toasted sesame bun",
            price: 12.99,
            image: burgerImage,
          }}
          onEdit={(product) => console.log("Edit product:", product)}
          onDelete={(product) => console.log("Delete product:", product)}
        />
      </div>
    </div>
  );
}
