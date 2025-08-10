import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  priority?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width = 400,
  height = 300,
  quality = 80,
  priority = false,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Cloudinary変換URL生成
  const getOptimizedUrl = (originalUrl: string): string => {
    if (!originalUrl.includes('cloudinary.com')) {
      return originalUrl;
    }

    // Cloudinary URLに変換パラメータを追加
    const transformParams = [
      `w_${width}`,
      `h_${height}`,
      `c_fill`,
      `q_${quality}`,
      'f_auto', // 自動フォーマット選択（WebPなど）
      'dpr_auto', // デバイスピクセル比に対応
    ].join(',');

    // URLの/upload/の後に変換パラメータを挿入
    return originalUrl.replace('/upload/', `/upload/${transformParams}/`);
  };

  const optimizedSrc = getOptimizedUrl(src);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`${className} bg-gray-200 flex items-center justify-center`}>
        <span className="text-gray-500 text-sm">画像を読み込めませんでした</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* メイン画像 */}
      <img
        src={optimizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
      
      {/* ローディングインジケーター */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;