const CACHE: Record<string, HTMLImageElement> = {};

export default async function loadImage(url: string): Promise<HTMLImageElement> {
  if (CACHE[url]) {
    return CACHE[url];
  }

  const { promise, resolve } = Promise.withResolvers<HTMLImageElement>();

  const image = new Image();
  image.addEventListener("load", () => {
    resolve(image);

    CACHE[url] = image;
  });
  image.src = url;

  return promise;
};
