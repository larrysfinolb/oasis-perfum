import Grid from "@/components/grid";
import { getPerfumes } from "@/services/perfumes";
import ProductGridItems from "@/components/grid/product-grid-items";

export const metadata = {
  title: "Perfumes",
  description: "Los mejores perfumes originales al mejor precio",
};

export default async function MainPage() {
  const perfumes = await getPerfumes();

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
