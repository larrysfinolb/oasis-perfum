import type { IPerfume } from "@/types/perfume";
import notion from "@/utils/notion";
import { NextResponse } from "next/server";

const DATABASE_ID = process.env.PERFUME_DATABASE as string;

function getValue(value: any, type: string = "string") {
  if (value === undefined || value === null) {
    return null;
  }

  switch (type) {
    case "number":
      return Number(value);
    case "string":
      return String(value);
    default:
      return value;
  }
}

export async function GET() {
  try {
    const query = { database_id: DATABASE_ID };

    const { results } = await notion.databases.query(query);

    const perfumes: IPerfume[] = results.map((page: any) => {
      const { properties } = page;
      const { id, image, name } = properties;

      return {
        id: getValue(id?.unique_id?.number),
        image: getValue(image?.files[0]?.file?.url),
        name: getValue(name?.title[0]?.plain_text),
        price: getValue(properties.regular_price?.number, "number"),
        createdAt: getValue(page.created_time),
        updatedAt: getValue(page.last_edited_time),
      };
    });

    // Filter out any perfumes with null or undefined values
    const validPerfumes = perfumes.filter((perfume) => Object.values(perfume).every((value) => value != null));

    return NextResponse.json(validPerfumes);
  } catch (error: any) {
    return NextResponse.json({ error: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
