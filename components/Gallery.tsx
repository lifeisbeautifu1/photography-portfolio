import Image from 'next/image';
import Masonry from 'react-masonry-css';
import LightGalleryComponent from 'lightgallery/react';
import { useRef } from 'react';
import type { LightGallery } from 'lightgallery/lightgallery';
import type { Photo } from '../types';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

type GalleryProps = {
  photos: Photo[];
};

const Gallery = ({ photos }: GalleryProps) => {
  const lightGalleryRef = useRef<LightGallery | null>(null);
  return (
    <>
      <Masonry breakpointCols={2} className="flex gap-4" columnClassName="">
        {photos.map((photo, i) => (
          <div key={photo.src} className="relative">
            <Image
              src={photo.src}
              width={photo.width}
              height={photo.height}
              alt={photo.alt}
              className="relative my-4"
              placeholder="blur"
              blurDataURL={photo.blurDataUrl}
            />
            <div
              onClick={() => lightGalleryRef?.current?.openGallery(i)}
              className="h-full w-full absolute inset-0 bg-transparent hover:bg-stone-900 hover:opacity-20 cursor-pointer"
            ></div>
          </div>
        ))}
      </Masonry>
      <LightGalleryComponent
        onInit={(ref) => {
          if (ref) lightGalleryRef.current = ref.instance;
        }}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        dynamic
        dynamicEl={photos.map((photo) => ({
          src: photo.src,
          thumb: photo.thumb,
        }))}
      />
    </>
  );
};

export default Gallery;
