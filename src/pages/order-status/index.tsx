import { useCallback, useEffect, useState } from "react";
import { ProductItem } from "./product-item";
import { Button } from "@/components/button";
import { Layout } from "@/components/layout";
import { Item } from "./items";
import { useSearchParams } from "react-router-dom";
import { API_URL, statusMapping } from "@/lib/utils";
import "./order-status.css";

interface Transaction {
  id: string;
  total: number;
  status: string;
  customer_name: string;
  customer_email: string;
  snap_token: string;
  snap_redirect_url: string;
  payment_method: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const OrderStatus = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [searchTransactionId, setSearchTransactionId] = useState("");
  const [emptyMessage, setEmptyMessage] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const getTransactionDetail = useCallback(
    async (transactionId: string) => {
      if (!transactionId) return alert("Transaction ID harus diisi");
      const response = await fetch(`${API_URL}/transactions/${transactionId}`);
      const res = await response.json();
      if (res.data) {
        setTransaction(res.data);
        setSearchParams({ transaction_id: transactionId }, { replace: true });
        setEmptyMessage("");
      } else {
        setEmptyMessage("Transaksi tidak ditemukan");
        setTransaction(null);
        setSearchParams({}, { replace: true });
      }
    },
    [setSearchParams]
  );

  useEffect(() => {
    const transactionId = searchParams.get("transaction_id");
    if (transactionId) {
      getTransactionDetail(transactionId);
    } else {
      setEmptyMessage(
        "Belum ada transaksi yang dicari, silahkan masukkan ID Transaksi"
      );
    }
  }, [getTransactionDetail, searchParams]);

  return (
    <Layout title="Status Pesanan">
      <div className="mb-4">
        <label className="block mb-0.1rem">Kode Pesanan</label>
        <input
          className="w-full p-0.5rem rounded-md border border-#ccc outline-none box-border"
          value={searchTransactionId}
          onChange={(e) => setSearchTransactionId(e.target.value)}
        />
      </div>
      <Button onClick={() => getTransactionDetail(searchTransactionId)}>
        Cek Status Pesanan
      </Button>
      <hr />
      {emptyMessage && <p className="empty-message">{emptyMessage}</p>}
      {transaction && (
        <>
          <div className="transaction-status">
            <Item
              label="Transaction ID"
              value={transaction.id}
            />
            <Item
              label="Customer Name"
              value={transaction.customer_name}
            />
            <Item
              label="Customer Email"
              value={transaction.customer_email}
            />
            <Item
              label="Status"
              value={statusMapping(transaction.status)}
            />
            {transaction.payment_method && (
              <Item
                label="Payment Method"
                value={transaction.payment_method}
              />
            )}
          </div>
          <div className="transaction-status">
            {transaction.products.map((product) => (
              <ProductItem
                key={product.id}
                name={product.name}
                price={product.price}
                totalItem={product.quantity}
              />
            ))}
            <ProductItem
              name="Total"
              price={transaction.total}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default OrderStatus;
