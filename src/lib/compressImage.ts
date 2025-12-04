import imageCompression from "browser-image-compression";

export const compressImage = (file: File) => {
  return new Promise(async (resolve, reject) => {
    try {
      const compressed = await imageCompression(file, { maxSizeMB: 2 });
      resolve(compressed);
    } catch (error) {
      reject("An error occurred in image compression");
    }
  });
};
