import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, width, height, className, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className || ''} ${isLoaded ? 'loaded' : 'loading'}`}
      loading="lazy"
      decoding="async"
      onLoad={() => setIsLoaded(true)}
      style={{ 
        opacity: isLoaded ? 1 : 0, 
        transition: 'opacity 0.5s ease-in-out',
        ...props.style 
      }}
      {...props}
    />
  );
};

export default Image;
