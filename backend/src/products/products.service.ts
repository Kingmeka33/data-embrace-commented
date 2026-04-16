import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  // Seed database with sample products if empty
  async onModuleInit() {
    const count = await this.prisma.product.count();

    if (count === 0) {
      await this.prisma.product.createMany({
        data: [
          {
            name: 'Wireless Headphones',
            description: 'High quality noise cancelling headphones',
            price: 120,
            stock_quantity: 15,
            category: 'electronics',
            image_url: 'https://images.unsplash.com/photo-1518441902114-9c0c7c3b2c88',
          },
          {
            name: 'Gaming Mouse',
            description: 'RGB gaming mouse',
            price: 40,
            stock_quantity: 30,
            category: 'electronics',
            image_url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04',
          },
          {
            name: 'Smart Watch',
            description: 'Fitness tracking smartwatch',
            price: 90,
            stock_quantity: 20,
            category: 'electronics',
            image_url: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b',
          },
          {
            name: 'Office Chair',
            description: 'Ergonomic chair',
            price: 150,
            stock_quantity: 10,
            category: 'furniture',
            image_url: 'https://images.unsplash.com/photo-1582582494700-f1c9a36d1d1a',
          },
          {
            name: 'Laptop Stand',
            description: 'Adjustable stand',
            price: 35,
            stock_quantity: 25,
            category: 'accessories',
            image_url: 'https://images.unsplash.com/photo-1587202372775-a5dbe7b2c6c4',
          },
        ],
      });
    }
  }

  // Get all products
  async findAll() {
    return this.prisma.product.findMany();
  }

  // Get single product
  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  // Create product
  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  // Update product
  async update(id: number, data: any) {
    return this.prisma.product.update({ where: { id }, data });
  }

  // Delete product
  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}
