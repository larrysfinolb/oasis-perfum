import type { IPerfume } from "@/types/perfume";

export const getPerfumes: () => Promise<IPerfume[]> = async () => {
  const response = await fetch("/api/perfumes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
