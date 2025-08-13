import type { IPerfume } from "@/types/perfume";
import notion from "@/utils/notion";
import { isFullPage } from "@notionhq/client";
import { NextResponse } from "next/server";

const DATABASE_ID = process.env.PERFUME_DATABASE as string;

export async function GET() {
  try {
    const query = {
      database_id: DATABASE_ID,
      sorts: [
        {
          property: "house",
          direction: "ascending" as const,
        },
      ],
    };

    const { results } = await notion.databases.query(query);

    const perfumes: IPerfume[] = results.filter(isFullPage).map((page) => {
      const { properties } = page;

      const id = "unique_id" in properties.id ? properties.id.unique_id.number : null;
      const image =
        "files" in properties.image && properties.image.files.length > 0 && "file" in properties.image.files[0]
          ? properties.image.files[0].file.url
          : null;
      const name = "title" in properties.name ? properties.name.title[0]?.plain_text : null;
      const price = "number" in properties.regular_price ? properties.regular_price.number : null;
      const stock = "number" in properties.stock ? properties.stock.number : null;
      const createdAt =
        "date" in properties.created_at && properties.created_at.date?.start
          ? properties.created_at.date.start
          : page.created_time;
      const updatedAt =
        "date" in properties.updated_at && properties.updated_at.date?.start
          ? properties.updated_at.date.start
          : page.last_edited_time;

      return {
        id: String(id),
        image: image ?? "",
        name: name ?? "",
        price: price ?? 0,
        stock: stock ?? 0,
        createdAt,
        updatedAt,
      };
    });

    return NextResponse.json(perfumes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
