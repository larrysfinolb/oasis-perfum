import Grid from "@/components/grid";
import ProductGridItems from "@/components/grid/product-grid-items";
import { usePerfumes } from "@/hooks/usePerfumes";

export const metadata = {
  title: "Perfumes",
  description: "Los mejores perfumes originales al mejor precio",
};

export default function MainPage() {
  const { perfumes } = usePerfumes();

  return (
    <>
      {perfumes.length > 0 ? (
        <Grid className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          <ProductGridItems perfumes={perfumes} />
        </Grid>
      ) : null}
    </>
  );
}
