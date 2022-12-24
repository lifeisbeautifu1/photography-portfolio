import type { Photo } from '../types';
import { createApi } from 'unsplash-js';
import { getDataUrl } from './getDataUrl';

export async function getImages(
  cli: ReturnType<typeof createApi>,
  query: string
): Promise<Photo[]> {
  const photos = await cli.photos.getRandom({
    count: 10,
    query,
  });

  const mappedPhotos: Photo[] = [];

  if (photos.type === 'success') {
    const responseArr = Array.isArray(photos.response)
      ? photos.response
      : [photos.response];

    const photosArr = responseArr.map((photo, i) => ({
      src: photo.urls.full,
      thumb: photo.urls.thumb,
      width: photo.width,
      height: photo.height,
      likes: photo.likes,
      alt: photo.alt_description ?? query + '-' + i,
    }));

    const photosArrWithDataUrl: Photo[] = [];

    for (const photo of photosArr) {
      const blurDataUrl = await getDataUrl(photo.src);
      photosArrWithDataUrl.push({
        ...photo,
        blurDataUrl,
      });
    }

    mappedPhotos.push(...photosArrWithDataUrl);
  } else {
    console.error('saje');
  }

  return mappedPhotos;
}
