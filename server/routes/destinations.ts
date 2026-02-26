import { Router } from "express";
import { prisma } from "../lib/prisma";

export const destinationRoutes = Router();

destinationRoutes.get("/", async (req, res, next) => {
  try {
    const { region, category, tags } = req.query;
    const destinations = await prisma.destination.findMany({
      where: {
        ...(region ? { region: { slug: region as string } } : {}),
        ...(category ? { category: category as never } : {}),
        ...(tags
          ? { tags: { hasSome: (tags as string).split(",") } }
          : {}),
      },
      include: { region: { select: { nameEn: true, nameAr: true, slug: true } } },
      orderBy: { nameEn: "asc" },
    });
    res.json(destinations);
  } catch (err) {
    next(err);
  }
});

destinationRoutes.get("/:slug", async (req, res, next) => {
  try {
    const dest = await prisma.destination.findUnique({
      where: { slug: req.params.slug },
      include: { region: true },
    });
    if (!dest) return res.status(404).json({ error: "Destination not found" });
    res.json(dest);
  } catch (err) {
    next(err);
  }
});
