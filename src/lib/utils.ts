export function numberToRupiah(number: number) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return formatter.format(number);
}

export const statusMapping = (status: string) => {
  switch (status) {
    case "PAYMENT_PENDING":
      return "Menunggu Pembayaran";
    case "PAID":
      return "Pembayaran Berhasil";
    case "CANCELED":
      return "Pesanan Dibatalkan";
    default:
      return "Menunggu Pembayaran";
  }
};

export const API_URL = import.meta.env.VITE_API_URL;
export const MIDTRANS_API_URL = import.meta.env.VITE_MIDTRANS_API_URL;
export const MIDTRANS_CLIENT_ID = import.meta.env.VITE_MIDTRANS_CLIENT_ID;
