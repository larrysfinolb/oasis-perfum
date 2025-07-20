import Grid from "@/components/grid";
import { getPerfumes } from "@/services/perfumes";
import ProductGridItems from "@/components/grid/product-grid-items";
import { use } from "react";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
