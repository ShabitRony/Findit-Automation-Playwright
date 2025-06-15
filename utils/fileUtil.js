import fs from 'fs';
import path from 'path';

export function saveProductIdToFile(productId) {
  const filePath = path.resolve('utils', 'productId.txt');
  fs.writeFileSync(filePath, productId, 'utf8');
  console.log(`✅ Product ID "${productId}" saved to ${filePath}`);
}
export function readProductId() {
  const filePath = './utils/productId.txt';
  if (fs.existsSync(filePath)) {
    const id = fs.readFileSync(filePath, 'utf-8').trim();
    return id;
  }
  throw new Error('productId.txt not found or empty');
}
