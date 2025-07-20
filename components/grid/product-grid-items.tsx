import { IPerfume } from "@/types/perfume";
import Grid from "@/components/grid";
import { GridTileImage } from "@/components/grid/tile";
import Link from "next/link";

export default function ProductGridItems({ perfumes }: { perfumes: IPerfume[] }) {
  return (
    <>
      {perfumes.map((perfume) => (
        <Grid.Item key={perfume.id} className='animate-fadeIn'>
          <Link className='relative inline-block h-full w-full' href={`/#`}>
            <GridTileImage
              alt={perfume.name}
              label={{
                title: perfume.name,
                price: perfume.price.toString(),
              }}
              src={perfume.image}
              fill
              sizes='(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
