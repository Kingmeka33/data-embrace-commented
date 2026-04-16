import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'Noise-isolating over-ear headphones with all-day comfort and balanced sound.',
    price: 149.99,
    category: 'Electronics',
    stock_quantity: 18,
    image_url: 'https://source.unsplash.com/featured/1200x900/?wireless-headphones',
  },
  {
    name: 'Laptop Stand',
    description: 'Minimal aluminum stand that lifts your screen for a cleaner desk setup.',
    price: 39.99,
    category: 'Office',
    stock_quantity: 26,
    image_url: 'https://source.unsplash.com/featured/1200x900/?laptop-desk',
  },
  {
    name: 'Ceramic Coffee Mug',
    description: 'Matte-finish mug designed for daily use at home or in the office.',
    price: 12.5,
    category: 'Kitchen',
    stock_quantity: 42,
    image_url: 'https://source.unsplash.com/featured/1200x900/?coffee-mug',
  },
  {
    name: 'Canvas Backpack',
    description: 'Durable everyday backpack with padded straps and roomy internal storage.',
    price: 64.0,
    category: 'Accessories',
    stock_quantity: 14,
    image_url: 'https://source.unsplash.com/featured/1200x900/?backpack',
  },
  {
    name: 'Desk Lamp',
    description: 'Compact LED desk lamp with warm lighting for focused work sessions.',
    price: 29.0,
    category: 'Home',
    stock_quantity: 21,
    image_url: 'https://source.unsplash.com/featured/1200x900/?desk-lamp',
  },
];

async function main() {
  const count = await prisma.product.count();

  if (count > 0) {
    console.log('Seed skipped: products already exist.');
    return;
  }

  await prisma.product.createMany({ data: sampleProducts });
  console.log(`Seeded ${sampleProducts.length} sample products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
