import { Router } from "express";
import { prisma } from "../lib/prisma";

export const regionRoutes = Router();

regionRoutes.get("/", async (_req, res, next) => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: { nameEn: "asc" },
      include: { _count: { select: { destinations: true } } },
    });
    res.json(regions);
  } catch (err) {
    next(err);
  }
});

regionRoutes.get("/:slug", async (req, res, next) => {
  try {
    const region = await prisma.region.findUnique({
      where: { slug: req.params.slug },
      include: { destinations: true },
    });
    if (!region) return res.status(404).json({ error: "Region not found" });
    res.json(region);
  } catch (err) {
    next(err);
  }
});
