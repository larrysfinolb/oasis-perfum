import clsx from "clsx";

const Label = ({
  title,
  price,
  position = "bottom",
  stock
}: {
  title: string;
  price: string;
  position?: "bottom" | "center";
  stock: number;
}) => {
  return (
    <div
      className={clsx("absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label", {
        "lg:px-20 lg:pb-[35%]": position === "center",
      })}
    >
      <div className='flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white'>
        <h3 className='mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight'>{title}</h3>
        <p suppressHydrationWarning={true} 
          className={clsx(
            'flex-none rounded-full p-2 text-white',
            stock > 0 ? 'bg-blue-600' : 'bg-red-600'
          )}
        >
          {
            stock > 0 ?
          `${new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
          }).format(parseFloat(price))}`
            : "AGOTADO"
          }
          {stock > 0 && <span className={clsx("ml-1 hidden @[275px]/label:inline")}>USD</span>}
        </p>
      </div>
    </div>
  );
};

export default Label;
