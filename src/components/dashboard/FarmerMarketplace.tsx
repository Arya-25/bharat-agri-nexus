import { useState } from "react";
import { Plus, Edit3, Trash2, Package, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import wheatIcon from '@/assets/wheat-icon.png';
import appleIcon from '@/assets/apple-icon.png';
import tomatoIcon from '@/assets/tomato-icon.png';

interface Product {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalValue: number;
  quality: string;
  harvestDate: string;
  status: 'available' | 'sold' | 'reserved';
}

const FarmerMarketplace = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Organic Tomatoes',
      category: 'Vegetables',
      quantity: 50,
      unit: 'quintals',
      pricePerUnit: 2500,
      totalValue: 125000,
      quality: 'Grade A',
      harvestDate: '2024-01-15',
      status: 'available'
    },
    {
      id: '2',
      name: 'Fresh Apples',
      category: 'Fruits',
      quantity: 30,
      unit: 'quintals',
      pricePerUnit: 4000,
      totalValue: 120000,
      quality: 'Premium',
      harvestDate: '2024-01-10',
      status: 'available'
    },
    {
      id: '3',
      name: 'Wheat',
      category: 'Grains',
      quantity: 100,
      unit: 'quintals',
      pricePerUnit: 2200,
      totalValue: 220000,
      quality: 'Grade A',
      harvestDate: '2024-01-05',
      status: 'sold'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: 'quintals',
    pricePerUnit: 0,
    quality: '',
    harvestDate: ''
  });

  const categories = ['Vegetables', 'Fruits', 'Grains', 'Pulses', 'Spices', 'Other'];
  const qualities = ['Grade A', 'Grade B', 'Premium', 'Organic'];

  const getProductIcon = (category: string, name: string) => {
    if (name.toLowerCase().includes('wheat')) return wheatIcon;
    if (name.toLowerCase().includes('apple')) return appleIcon;
    if (name.toLowerCase().includes('tomato')) return tomatoIcon;
    
    switch (category.toLowerCase()) {
      case 'grains': return wheatIcon;
      case 'fruits': return appleIcon;
      case 'vegetables': return tomatoIcon;
      default: return tomatoIcon;
    }
  };

  const handleAddProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      totalValue: newProduct.quantity * newProduct.pricePerUnit,
      status: 'available'
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      category: '',
      quantity: 0,
      unit: 'quintals',
      pricePerUnit: 0,
      quality: '',
      harvestDate: ''
    });
    setIsAddDialogOpen(false);
    toast({
      title: "Product Added",
      description: `${product.name} has been added to your marketplace.`,
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      quantity: product.quantity,
      unit: product.unit,
      pricePerUnit: product.pricePerUnit,
      quality: product.quality,
      harvestDate: product.harvestDate
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    const updatedProduct: Product = {
      ...editingProduct,
      ...newProduct,
      totalValue: newProduct.quantity * newProduct.pricePerUnit,
    };
    
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setNewProduct({
      name: '',
      category: '',
      quantity: 0,
      unit: 'quintals',
      pricePerUnit: 0,
      quality: '',
      harvestDate: ''
    });
    setEditingProduct(null);
    setIsEditDialogOpen(false);
    toast({
      title: "Product Updated",
      description: `${updatedProduct.name} has been updated successfully.`,
    });
  };

  const handleDeleteProduct = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (!deletingProduct) return;
    
    setProducts(products.filter(p => p.id !== deletingProduct.id));
    setDeletingProduct(null);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Delete Successful",
      description: `${deletingProduct.name} has been deleted from your marketplace.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalValue = products.reduce((sum, product) => sum + product.totalValue, 0);
  const availableProducts = products.filter(p => p.status === 'available').length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>My Marketplace</span>
          </CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g., Organic Tomatoes"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quintals">Quintals</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="price">Price per {newProduct.unit}</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.pricePerUnit}
                    onChange={(e) => setNewProduct({...newProduct, pricePerUnit: Number(e.target.value)})}
                    placeholder="₹"
                  />
                </div>
                <div>
                  <Label htmlFor="quality">Quality</Label>
                  <Select value={newProduct.quality} onValueChange={(value) => setNewProduct({...newProduct, quality: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      {qualities.map(quality => (
                        <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="harvestDate">Harvest Date</Label>
                  <Input
                    id="harvestDate"
                    type="date"
                    value={newProduct.harvestDate}
                    onChange={(e) => setNewProduct({...newProduct, harvestDate: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">₹{(totalValue / 100000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{availableProducts}</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{products.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <img 
                    src={getProductIcon(product.category, product.name)} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <Badge variant="outline" className="text-xs">{product.category}</Badge>
                      <Badge className={getStatusColor(product.status)}>{product.status}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <div className="font-medium">{product.quantity} {product.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <div className="font-medium">₹{product.pricePerUnit}/{product.unit}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Value:</span>
                        <div className="font-medium text-green-600">₹{product.totalValue.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Quality:</span>
                        <div className="font-medium">{product.quality}</div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Harvested: {new Date(product.harvestDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 ml-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteProduct(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Product Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="e.g., Organic Tomatoes"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-quantity">Quantity</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    value={newProduct.quantity}
                    onChange={(e) => setNewProduct({...newProduct, quantity: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-unit">Unit</Label>
                  <Select value={newProduct.unit} onValueChange={(value) => setNewProduct({...newProduct, unit: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quintals">Quintals</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="edit-price">Price per {newProduct.unit}</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={newProduct.pricePerUnit}
                  onChange={(e) => setNewProduct({...newProduct, pricePerUnit: Number(e.target.value)})}
                  placeholder="₹"
                />
              </div>
              <div>
                <Label htmlFor="edit-quality">Quality</Label>
                <Select value={newProduct.quality} onValueChange={(value) => setNewProduct({...newProduct, quality: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualities.map(quality => (
                      <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-harvestDate">Harvest Date</Label>
                <Input
                  id="edit-harvestDate"
                  type="date"
                  value={newProduct.harvestDate}
                  onChange={(e) => setNewProduct({...newProduct, harvestDate: e.target.value})}
                />
              </div>
              <Button onClick={handleUpdateProduct} className="w-full">
                Update Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>Are you sure you want to delete <strong>{deletingProduct?.name}</strong>? This action cannot be undone.</p>
              <div className="flex space-x-2 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={confirmDeleteProduct}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FarmerMarketplace;