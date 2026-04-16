import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "@/lib/api";

// Product shape returned by the NestJS backend
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: string | number;
  category?: string | null;
  stock_quantity: number;
  image_url?: string | null;
  created_at?: string;
  updated_at?: string;
};

// Form shape used by the frontend dialogs/pages
export type ProductFormData = {
  name: string;
  description?: string;
  price: number;
  category?: string;
  stock_quantity: number;
  image_url?: string;
};

// Fetch all products
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

// Create a product
async function createProduct(product: ProductFormData): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}

// Update a product
// IMPORTANT:
// This matches your Index.tsx call:
// updateProduct.mutate({ ...data, id: editingProduct.id })
async function updateProduct(
  product: ProductFormData & { id: number }
): Promise<Product> {
  const { id, ...updateData } = product;

  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}

// Delete a product by ID
async function deleteProduct(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}

// Hook to load all products
export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
}

// Hook to create a product
export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Hook to update a product
export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

// Hook to delete a product
export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}