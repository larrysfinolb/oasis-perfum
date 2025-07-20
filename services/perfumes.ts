import type { IPerfume } from "@/types/perfume";

const BASE_URL = process.env.API_URL || "http://localhost:3000";

export const getPerfumes: () => Promise<IPerfume[]> = async () => {
  const response = await fetch(`${BASE_URL}/api/perfumes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
