import { Router } from "express";
import { prisma } from "../lib/prisma";

export const heroSlideRoutes = Router();

heroSlideRoutes.get("/", async (_req, res, next) => {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    });
    res.json(slides);
  } catch (err) {
    next(err);
  }
});

