import type { Response } from "express";

export const setPublicCache = (res: Response) => {
  res.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=60");
};
