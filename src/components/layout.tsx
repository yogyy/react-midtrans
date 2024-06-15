import { Header } from "./header";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  noHeader?: boolean;
}

export const Layout = ({ title, children, noHeader }: LayoutProps) => {
  return (
    <div className="flex flex-col h-dvh">
      {!noHeader && <Header title={title} />}
      <div className="relative p-5 pb-15 h-full">{children}</div>
    </div>
  );
};
