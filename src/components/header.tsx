import { useNavigate } from "react-router-dom";
import Shopify from "./shopify";

export const Header = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div className=":uno: w-full bg-#646cff flex items-center py-4 px-6 box-border">
      <Shopify
        onClick={() => navigate("/")}
        className="cursor-pointer size-16"
      />

      <p className=":uno: w-full m-0 text-1.2em font-bold color-white text-center">
        {title}
      </p>
    </div>
  );
};
