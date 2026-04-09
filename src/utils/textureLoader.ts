import { TextureLoader, Texture, SRGBColorSpace } from "three";

const loader = new TextureLoader();

/**
 * Loads a texture from the given path.
 * Returns the loaded Texture on success, or null on failure.
 */
export function loadTexture(path: string): Promise<Texture | null> {
  return new Promise((resolve) => {
    loader.load(
      path,
      (texture) => {
        texture.colorSpace = SRGBColorSpace;
        resolve(texture);
      },
      undefined,
      () => {
        console.warn(`[textureLoader] Failed to load texture: ${path}`);
        resolve(null);
      }
    );
  });
}
