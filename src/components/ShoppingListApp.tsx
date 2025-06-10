import React, { useState } from 'react';
import { Plus, Store, ShoppingCart, Calendar, Edit2, Trash2, Check, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import Footer from './Footer';

interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  notes: string;
  purchased: boolean;
  movedToNext: boolean;
}

interface ShoppingList {
  id: string;
  storeName: string;
  items: ShoppingItem[];
  createdAt: Date;
}

const ShoppingListApp = () => {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);

  const createNewList = () => {
    if (!newStoreName.trim()) {
      toast({
        title: "Store name required",
        description: "Please enter a store name to create a shopping list.",
        variant: "destructive"
      });
      return;
    }

    const newList: ShoppingList = {
      id: Date.now().toString(),
      storeName: newStoreName,
      items: [],
      createdAt: new Date()
    };

    setLists([...lists, newList]);
    setNewStoreName('');
    setShowNewListForm(false);
    toast({
      title: "Shopping list created!",
      description: `Created shopping list for ${newStoreName}`,
    });
  };

  const addItemToList = (listId: string, itemName: string, quantity: number, notes: string) => {
    if (!itemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: itemName,
      quantity: quantity || 1,
      notes: notes || '',
      purchased: false,
      movedToNext: false
    };

    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, items: [...list.items, newItem] }
        : list
    ));

    toast({
      title: "Item added!",
      description: `Added ${itemName} to your shopping list`,
    });
  };

  const toggleItemPurchased = (listId: string, itemId: string) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: list.items.map(item => 
              item.id === itemId 
                ? { ...item, purchased: !item.purchased, movedToNext: false }
                : item
            )
          }
        : list
    ));
  };

  const moveItemToNext = (listId: string, itemId: string) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: list.items.map(item => 
              item.id === itemId 
                ? { ...item, movedToNext: !item.movedToNext, purchased: false }
                : item
            )
          }
        : list
    ));

    toast({
      title: "Item moved to next week",
      description: "Item has been scheduled for next week's shopping",
    });
  };

  const removeItem = (listId: string, itemId: string) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.filter(item => item.id !== itemId) }
        : list
    ));

    toast({
      title: "Item removed",
      description: "Item has been removed from your shopping list",
    });
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
    toast({
      title: "Shopping list deleted",
      description: "Shopping list has been removed",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2 flex items-center justify-center gap-3">
              <ShoppingCart className="h-10 w-10 text-blue-600" />
              Smart Shopping Lists
            </h1>
            <p className="text-muted-foreground text-lg">
              Organize your shopping by store and never forget an item again
            </p>
          </div>

          {/* Create New List Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={() => setShowNewListForm(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Shopping List
            </Button>
          </div>

          {/* New List Form */}
          {showNewListForm && (
            <Card className="mb-8 mx-auto max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  New Shopping List
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName" className="text-sm font-medium">
                      Store Name
                    </Label>
                    <Input
                      id="storeName"
                      placeholder="e.g., Walmart, Target, Costco..."
                      value={newStoreName}
                      onChange={(e) => setNewStoreName(e.target.value)}
                      className="mt-1"
                      onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={createNewList} className="flex-1">
                      Create List
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setShowNewListForm(false);
                        setNewStoreName('');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Shopping Lists */}
          {lists.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
                No shopping lists yet
              </h3>
              <p className="text-muted-foreground">
                Create your first shopping list to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists.map((list) => (
                <ShoppingListCard
                  key={list.id}
                  list={list}
                  onAddItem={addItemToList}
                  onTogglePurchased={toggleItemPurchased}
                  onMoveToNext={moveItemToNext}
                  onRemoveItem={removeItem}
                  onDeleteList={deleteList}
                  editingItem={editingItem}
                  setEditingItem={setEditingItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

interface ShoppingListCardProps {
  list: ShoppingList;
  onAddItem: (listId: string, itemName: string, quantity: number, notes: string) => void;
  onTogglePurchased: (listId: string, itemId: string) => void;
  onMoveToNext: (listId: string, itemId: string) => void;
  onRemoveItem: (listId: string, itemId: string) => void;
  onDeleteList: (listId: string) => void;
  editingItem: string | null;
  setEditingItem: (itemId: string | null) => void;
}

const ShoppingListCard: React.FC<ShoppingListCardProps> = ({
  list,
  onAddItem,
  onTogglePurchased,
  onMoveToNext,
  onRemoveItem,
  onDeleteList,
  editingItem,
  setEditingItem,
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemNotes, setNewItemNotes] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    onAddItem(list.id, newItemName, newItemQuantity, newItemNotes);
    setNewItemName('');
    setNewItemQuantity(1);
    setNewItemNotes('');
    setShowAddForm(false);
  };

  const purchasedCount = list.items.filter(item => item.purchased).length;
  const totalCount = list.items.length;
  const progress = totalCount > 0 ? (purchasedCount / totalCount) * 100 : 0;

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg relative">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            {list.storeName}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDeleteList(list.id)}
            className="text-white hover:bg-white/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {totalCount > 0 && (
          <div className="mt-2">
            <div className="flex justify-between text-sm text-white/90 mb-1">
              <span>{purchasedCount} of {totalCount} items</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-6">
        {/* Add Item Button */}
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          className="w-full mb-4 border-dashed border-2 hover:bg-blue-50 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>

        {/* Add Item Form */}
        {showAddForm && (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 space-y-3">
            <Input
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Qty"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(parseInt(e.target.value) || 1)}
                className="w-20"
                min="1"
              />
              <Input
                placeholder="Notes (optional)"
                value={newItemNotes}
                onChange={(e) => setNewItemNotes(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddItem} size="sm" className="flex-1">
                Add
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setNewItemName('');
                  setNewItemQuantity(1);
                  setNewItemNotes('');
                }}
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-2">
          {list.items.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                item.purchased 
                  ? 'bg-green-50 border-green-200' 
                  : item.movedToNext 
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${item.purchased ? 'line-through text-gray-500' : ''}`}>
                      {item.name}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.quantity}x
                    </Badge>
                    {item.purchased && (
                      <Badge className="bg-green-600 text-white text-xs">Purchased</Badge>
                    )}
                    {item.movedToNext && (
                      <Badge className="bg-yellow-600 text-white text-xs">Next Week</Badge>
                    )}
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-600 mt-1">{item.notes}</p>
                  )}
                </div>
                
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onTogglePurchased(list.id, item.id)}
                    className={`h-8 w-8 p-0 ${
                      item.purchased 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-gray-400 hover:text-green-600'
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onMoveToNext(list.id, item.id)}
                    className={`h-8 w-8 p-0 ${
                      item.movedToNext 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-400 hover:text-yellow-600'
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveItem(list.id, item.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {list.items.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p>No items yet. Add your first item!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingListApp;
