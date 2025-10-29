import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;

  // VALIDATE THE DATA
  // All the colors must be present in the images object
  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "Colors array is required!" });
  }

  if (!images || typeof images !== "object") {
    return res.status(400).json({ message: "Images object is required!" });
  }

  const missingColors = colors.filter((color) => !(color in images));

  if (missingColors.length > 0) {
    return res
      .status(400)
      .json({ message: "Missing images for colors!", missingColors });
  }

  const product = await prisma.product.create({
    data,
  });

  res.status(201).json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;

  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
      case "desc":
        return { price: Prisma.SortOrder.desc };
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
      default:
        return { createdAt: Prisma.SortOrder.desc };
    }
  })();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });

  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required!" });
  }
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      category: true,
    },
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required!" });
  }
  const data: Prisma.ProductUpdateInput = req.body;
  const product = await prisma.product.update({
    where: { id: parseInt(id) },
    data,
    include: {
      category: true,
    },
  });
  res.status(200).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Product ID is required!" });
  }
  //check if the product exists
  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  const deletedProduct = await prisma.product.delete({
    where: { id: parseInt(id) },
  });
  res.status(200).json(deletedProduct);
};
