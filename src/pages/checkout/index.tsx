import { Button } from "@/components/button";
import { Layout } from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "./product";
import { API_URL, numberToRupiah } from "@/lib/utils";
import useSnap from "@/hooks/use-snap";

interface CartProps {
  count: number;
  createdAt: string;
  id: string;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartProps[]>([]);
  const [customer, setCustomer] = useState({
    name: "tester",
    email: "mail@testing.com",
  });
  const [snapShow, setSnapShow] = useState(false);
  const { snapEmbed } = useSnap();

  const getCart = useCallback(async () => {
    const cart = await localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    } else {
      setCart([]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const pay = async () => {
    if (!customer.name || !customer.email) {
      alert(`${!customer.name ? "Nama" : "Email"} harus diisi`);
      return;
    }

    const response = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: customer.name,
        customer_email: customer.email,
        products: cart.map((item) => ({
          id: item.id,
          quantity: item.count,
        })),
      }),
    }).then((res) => res.json());

    if (response && response.status === "success") {
      await localStorage.removeItem("cart");
      // navigate(`/order-status?transaction_id=${response.data.id}`);
      setSnapShow(true);
      snapEmbed(response.data.snap_token, "snap-container", {
        onSuccess: function (result) {
          console.log("success", result);
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
        onPending: function (result) {
          console.log("pending", result);
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
        onClose: function () {
          navigate(`/order-status?transaction_id=${response.data.id}`);
          setSnapShow(false);
        },
      });
    } else if (response && response.status === "error") {
      console.log(response);
    }
  };

  useEffect(() => {
    getCart();
  }, [getCart]);

  const totalOrder = cart.reduce(
    (total, item) => total + item.count * item.price,
    0
  );

  return (
    <Layout title="Checkout">
      {!snapShow && (
        <>
          <p className="m-0 font-bold color-#333 text-center mb-5 text-1.2em">
            Detail Produk
          </p>
          <div className="mb-5 border-#ccc p-4 rounded-lg relative">
            {cart.map((item) => (
              <Product
                key={item.id}
                item={item}
              />
            ))}
            <div className="flex justify-between color-#333 font-bold text-1em m-0">
              <p>Total Order</p>
              <p>{numberToRupiah(totalOrder)}</p>
            </div>
          </div>
          <p className="section-title">Detail Pelanggan</p>
          <div className="mb-4">
            <label className="block mb-0.1rem">Nama Lengkap</label>
            <input
              className="w-full p-0.5rem rounded-md border border-#ccc outline-none box-border"
              value={customer.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-0.1rem">Email</label>
            <input
              className="w-full p-0.5rem rounded-md border border-#ccc outline-none box-border"
              value={customer.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="sticky bottom-5 left-50%">
            <Button onClick={pay}>Bayar Sekarang</Button>
          </div>
        </>
      )}
      <div
        id="snap-container"
        className={snapShow ? "h-full" : ""}></div>
    </Layout>
  );
};

export default Checkout;
