export const Button = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className=":uno: flex items-center justify-center bg-#646cff color-white border-none rounded-5px py-16px px-10px w-full h-30px font-500"
      {...props}>
      {children}
    </button>
  );
};
