import { numberToRupiah } from "@/lib/utils";

interface ProductProps {
  name: string;
  image: string;
  price: number;
  count: number;
}

export const Product = ({ item }: { item: ProductProps }) => {
  const { name, image, price, count } = item;

  return (
    <div className="flex justify-between gap-5">
      <div className="flex gap-15px justify-start">
        <div className="w-15 h-15 rounded-lg bg-#cfd1ff mb-5">
          <img
            src={image}
            alt="Product"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="font-bold">
          <p className="m-0 text-1.1em color-#333">{name}</p>
          <p className="m-0 text-1em color-#ff730f">
            {numberToRupiah(price * count)}
          </p>
        </div>
      </div>
      <div>
        <p>{count} item</p>
      </div>
    </div>
  );
};
