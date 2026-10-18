import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Product, PurchaseMode } from '../types/product';
import { getDefaultMode, getUnitPrice } from '../utils/pricing';

export function usePurchaseOptions(product: Product) {
  const { addItem } = useCart();
  const [mode, setMode] = useState<PurchaseMode>(() => getDefaultMode(product));
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMode(getDefaultMode(product));
    setQuantity(1);
  }, [product]);

  const unitPrice = getUnitPrice(product, mode);
  const add = () => addItem(product.id, mode, quantity);

  return { mode, setMode, quantity, setQuantity, unitPrice, add };
}