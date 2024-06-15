import { useState } from "react";
import { Button } from "@/components/button";
import { Counter } from "@/components/counter";
import { numberToRupiah } from "@/lib/utils";

export const ItemProduct = ({
  name,
  price,
  image,
  onProductChange,
  defaultCount,
}) => {
  const [count, setCount] = useState(defaultCount);

  const handleCountChange = (value: number) => {
    setCount(value);
    if (onProductChange) onProductChange(value);
  };

  return (
    <div className="item-product">
      <div>
        <img
          className="image-product object-contain aspect-square"
          src={image}
          alt={name}
        />
        <div className="info-product">
          <p className="name-product">{name}</p>
          <p className="price-product">{numberToRupiah(price)}</p>
        </div>
      </div>
      <div>
        {count > 0 ? (
          <Counter
            defaultValue={count}
            onValueChange={handleCountChange}
          />
        ) : (
          <Button onClick={() => handleCountChange(1)}>Beli</Button>
        )}
      </div>
    </div>
  );
};
