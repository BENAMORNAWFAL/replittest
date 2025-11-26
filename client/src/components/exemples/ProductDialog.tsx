import { useState } from "react";
import ProductDialog from "../ProductDialog";
import { Button } from "../ui/button";
import burgerImage from "../../assets/generated_images/gourmet_burger_product_photo.png";
import "tailwindcss";

export default function ProductDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button onClick={() => setOpen(true)}>Open Product Dialog</Button>
      <ProductDialog
        open={open}
        onOpenChange={setOpen}
        product={{
          id: "1",
          name: "Gourmet Burger",
          description:
            "Juicy beef patty with crispy bacon, melted cheese, fresh lettuce and tomato",
          price: 12.99,
          image: burgerImage,
        }}
        onSave={(product) => {
          console.log("Save product:", product);
          setOpen(false);
        }}
      />
    </div>
  );
}
