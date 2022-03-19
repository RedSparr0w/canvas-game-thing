export const loadImage = async (src = ''): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = () => reject(img);
  img.src = src;
});

// Make sure a number is between 2 values (inclusive)
export const clipNumber = (num: number, min: number, max: number): number => Math.min(Math.max(min, num), max);
