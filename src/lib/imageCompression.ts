
/**
 * Utility functions for compressing and resizing images client-side
 * before uploading them to storage.
 */

/**
 * Configuration options for image compression
 */
export interface ImageCompressionOptions {
  /**
   * Maximum width of the compressed image in pixels
   * @default 1200
   */
  maxWidth?: number;
  
  /**
   * Maximum height of the compressed image in pixels
   * @default 1200
   */
  maxHeight?: number;
  
  /**
   * Quality of compressed image (0-1)
   * @default 0.8
   */
  quality?: number;
  
  /**
   * Output format of the compressed image
   * @default 'image/jpeg'
   */
  outputFormat?: string;
  
  /**
   * Whether to preserve the original image aspect ratio when resizing
   * @default true
   */
  preserveAspectRatio?: boolean;
}

/**
 * Result of image compression
 */
export interface CompressedImage {
  /**
   * Compressed image as a Blob
   */
  blob: Blob;
  
  /**
   * Compressed image data URL (for previews)
   */
  dataUrl: string;
  
  /**
   * Original image size in bytes
   */
  originalSize: number;
  
  /**
   * Compressed image size in bytes
   */
  compressedSize: number;
  
  /**
   * The MIME type of the compressed image
   */
  type: string;
}

/**
 * Default compression options
 */
const DEFAULT_OPTIONS: ImageCompressionOptions = {
  maxWidth: 1200,
  maxHeight: 1200,
  quality: 0.8,
  outputFormat: 'image/jpeg',
  preserveAspectRatio: true,
};

/**
 * Compresses an image using HTMLCanvas
 * 
 * @param file The image file to compress
 * @param options Compression options
 * @returns Promise resolving to compressed image data
 */
export async function compressImage(
  file: File,
  options?: Partial<ImageCompressionOptions>
): Promise<CompressedImage> {
  // Skip non-image files
  if (!file.type.startsWith('image/')) {
    throw new Error('Only image files can be compressed');
  }
  
  // Merge default options with user options
  const settings = { ...DEFAULT_OPTIONS, ...options };
  
  // Load the image
  const image = await createImageFromFile(file);
  
  // Calculate new dimensions while preserving aspect ratio if needed
  let { width, height } = calculateDimensions(
    image.width,
    image.height,
    settings.maxWidth!,
    settings.maxHeight!,
    settings.preserveAspectRatio!
  );
  
  // Create a canvas element to draw and compress the image
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  
  // Draw the image onto the canvas
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }
  
  // Draw the image onto the canvas with the new dimensions
  ctx.drawImage(image, 0, 0, width, height);
  
  // Convert the canvas to a blob with the specified quality
  const outputFormat = settings.outputFormat!;
  const dataUrl = canvas.toDataURL(outputFormat, settings.quality);
  const blob = await canvasToBlob(canvas, outputFormat, settings.quality!);
  
  return {
    blob,
    dataUrl,
    originalSize: file.size,
    compressedSize: blob.size,
    type: outputFormat,
  };
}

/**
 * Creates an HTMLImageElement from a File object
 */
function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = URL.createObjectURL(file);
  });
}

/**
 * Calculates dimensions while preserving aspect ratio if needed
 */
function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number,
  preserveAspectRatio: boolean
): { width: number; height: number } {
  if (!preserveAspectRatio) {
    return { width: maxWidth, height: maxHeight };
  }
  
  // No resizing needed if image is already smaller than max dimensions
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }
  
  const aspectRatio = originalWidth / originalHeight;
  
  // Calculate new dimensions based on aspect ratio
  if (originalWidth > originalHeight) {
    // Landscape image
    const width = Math.min(maxWidth, originalWidth);
    const height = width / aspectRatio;
    return { width, height };
  } else {
    // Portrait or square image
    const height = Math.min(maxHeight, originalHeight);
    const width = height * aspectRatio;
    return { width, height };
  }
}

/**
 * Converts a canvas to a blob
 */
function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas to Blob conversion failed'));
        }
      },
      type,
      quality
    );
  });
}

/**
 * Compresses an array of image files
 * 
 * @param files Array of image files to compress
 * @param options Compression options
 * @returns Promise resolving to an array of compressed images
 */
export async function compressImages(
  files: File[],
  options?: Partial<ImageCompressionOptions>
): Promise<CompressedImage[]> {
  const compressionPromises = files.map(file => compressImage(file, options));
  return Promise.all(compressionPromises);
}
