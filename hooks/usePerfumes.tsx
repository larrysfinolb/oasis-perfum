import { useState, useEffect } from "react";
import type { IPerfume } from "@/types/perfume";
import { getPerfumes } from "@/services/perfumes";

export const usePerfumes = () => {
  const [perfumes, setPerfumes] = useState<IPerfume[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      setLoading(true);
      try {
        const data = await getPerfumes();
        setPerfumes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  return { perfumes, loading, error };
};
