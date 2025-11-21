import { useState } from "react";
import DeleteDialog from "../DeleteDialog";
import { Button } from "../ui/button";

export default function DeleteDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 bg-background">
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Open Delete Dialog
      </Button>
      <DeleteDialog
        open={open}
        onOpenChange={setOpen}
        product={{
          id: "1",
          name: "Gourmet Burger",
          description: "Delicious burger",
          price: 12.99,
          image: "",
        }}
        onConfirm={() => {
          console.log("Product deleted");
          setOpen(false);
        }}
      />
    </div>
  );
}
