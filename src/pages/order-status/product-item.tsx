import { numberToRupiah } from "@/lib/utils";

interface ProductItemProps {
  name: string;
  price: number;
  totalItem?: number;
}
export const ProductItem = ({ name, price, totalItem }: ProductItemProps) => {
  return (
    <div className="item-product-status">
      <div className="item-content">
        {totalItem && <p className="item">{totalItem}x</p>}
        <p className="name">{name}</p>
      </div>
      <p className="price">{numberToRupiah(price)}</p>
    </div>
  );
};
