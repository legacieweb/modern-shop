import React from 'react';

const LoadingSpinner = ({ 
  size = 'medium', 
  style = 'elegant', 
  color = 'primary', 
  background = 'none',
  className = '', 
  showText = true,
  text = 'Loading...'
}) => {
  // Enhanced size configurations
  const sizeConfigs = {
    small: { 
      container: 'w-6 h-6', 
      text: 'text-sm',
      dots: 'w-1 h-1',
      ring: 'w-6 h-6',
      pulse: 'w-6 h-6',
      background: 'w-8 h-8'
    },
    medium: { 
      container: 'w-10 h-10', 
      text: 'text-base',
      dots: 'w-2 h-2',
      ring: 'w-10 h-10',
      pulse: 'w-10 h-10',
      background: 'w-14 h-14'
    },
    large: { 
      container: 'w-16 h-16', 
      text: 'text-lg',
      dots: 'w-3 h-3',
      ring: 'w-16 h-16',
      pulse: 'w-16 h-16',
      background: 'w-20 h-20'
    },
    xlarge: { 
      container: 'w-20 h-20', 
      text: 'text-xl',
      dots: 'w-4 h-4',
      ring: 'w-20 h-20',
      pulse: 'w-20 h-20',
      background: 'w-28 h-28'
    }
  };

  // Clean color configurations
  const colorConfigs = {
    primary: {
      ring: 'border-blue-600',
      dots: 'bg-blue-600',
      pulse: 'bg-blue-600',
      wave: 'bg-blue-600',
      background: 'bg-blue-50',
      text: 'text-blue-600'
    },
    secondary: {
      ring: 'border-gray-600',
      dots: 'bg-gray-600',
      pulse: 'bg-gray-600',
      wave: 'bg-gray-600',
      background: 'bg-gray-50',
      text: 'text-gray-600'
    },
    success: {
      ring: 'border-green-600',
      dots: 'bg-green-600',
      pulse: 'bg-green-600',
      wave: 'bg-green-600',
      background: 'bg-green-50',
      text: 'text-green-600'
    },
    danger: {
      ring: 'border-red-600',
      dots: 'bg-red-600',
      pulse: 'bg-red-600',
      wave: 'bg-red-600',
      background: 'bg-red-50',
      text: 'text-red-600'
    },
    warning: {
      ring: 'border-yellow-600',
      dots: 'bg-yellow-600',
      pulse: 'bg-yellow-600',
      wave: 'bg-yellow-600',
      background: 'bg-yellow-50',
      text: 'text-yellow-600'
    },
    purple: {
      ring: 'border-purple-600',
      dots: 'bg-purple-600',
      pulse: 'bg-purple-600',
      wave: 'bg-purple-600',
      background: 'bg-purple-50',
      text: 'text-purple-600'
    }
  };

  // Background configurations
  const backgroundConfigs = {
    none: '',
    circle: 'bg-white shadow-lg rounded-full',
    subtle: 'bg-gray-50 rounded-xl border border-gray-200',
    elegant: 'bg-white shadow-xl rounded-2xl border border-gray-100',
    glass: 'bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl border border-white border-opacity-20',
    gradient: 'bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100',
    dark: 'bg-gray-800 rounded-2xl border border-gray-700',
    colorful: 'bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl border border-blue-100'
  };

  const currentSize = sizeConfigs[size] || sizeConfigs.medium;
  const currentColor = colorConfigs[color] || colorConfigs.primary;
  const currentBackground = backgroundConfigs[background] || backgroundConfigs.none;

  // Clean Spinner Styles
  const renderSpinner = () => {
    switch (style) {
      case 'elegant':
        return (
          <div className={`${currentSize.container} relative flex items-center justify-center`}>
            <div className={`${currentSize.ring} border-4 ${currentColor.ring} border-t-transparent rounded-full animate-spin`}></div>
            <div className={`absolute inset-0 ${currentSize.ring} border-2 ${currentColor.ring} border-opacity-30 rounded-full animate-pulse`}></div>
          </div>
        );

      case 'minimal':
        return (
          <div className={`${currentSize.container} flex items-center justify-center`}>
            <div className={`${currentSize.dots} ${currentColor.dots} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
            <div className={`${currentSize.dots} ${currentColor.dots} rounded-full animate-bounce mx-1`} style={{ animationDelay: '150ms' }}></div>
            <div className={`${currentSize.dots} ${currentColor.dots} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
          </div>
        );

      case 'pulse':
        return (
          <div className={`${currentSize.container} relative flex items-center justify-center`}>
            <div className={`${currentSize.pulse} ${currentColor.pulse} rounded-full animate-pulse`}></div>
            <div className={`absolute inset-0 ${currentSize.pulse} ${currentColor.pulse} rounded-full animate-ping opacity-75`}></div>
          </div>
        );

      case 'dual-ring':
        return (
          <div className={`${currentSize.container} relative`}>
            <div className={`${currentSize.ring} border-4 border-transparent ${currentColor.ring} border-t-current rounded-full animate-spin`}></div>
            <div className={`absolute inset-1 border-4 border-transparent ${currentColor.ring} border-r-current rounded-full animate-spin`} style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
        );

      case 'wave':
        return (
          <div className={`${currentSize.container} flex items-end space-x-1`}>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 ${currentColor.wave} rounded-t animate-bounce`}
                style={{ 
                  height: `${20 + i * 4}px`,
                  animationDelay: `${i * 100}ms`,
                  animationDuration: '1s'
                }}
              ></div>
            ))}
          </div>
        );

      case 'scale':
        return (
          <div className={`${currentSize.container} relative flex items-center justify-center`}>
            <div className={`${currentSize.ring} border-2 ${currentColor.ring} rounded-full animate-ping`}></div>
            <div className={`absolute ${currentSize.ring} border-2 ${currentColor.ring} border-dashed rounded-full animate-spin opacity-75`}></div>
            <div className={`absolute ${currentSize.ring} ${currentColor.ring} rounded-full animate-pulse`}></div>
          </div>
        );

      case 'breathing':
        return (
          <div className={`${currentSize.container} relative flex items-center justify-center`}>
            <div className={`${currentSize.ring} ${currentColor.ring} rounded-full animate-pulse`}></div>
            <div className={`absolute inset-2 ${currentColor.ring} rounded-full animate-ping opacity-50`}></div>
            <div className={`absolute inset-4 ${currentColor.ring} rounded-full animate-pulse opacity-75`}></div>
          </div>
        );

      case 'dots':
        return (
          <div className={`${currentSize.container} flex items-center justify-center space-x-2`}>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`${currentSize.dots} ${currentColor.dots} rounded-full animate-bounce`}
                style={{ 
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );

      case 'spinner':
      default:
        return (
          <div className={`${currentSize.container} relative`}>
            <div className={`${currentSize.ring} border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin`}></div>
          </div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {/* Spinner Container with Background */}
      <div className="flex items-center justify-center">
        <div className={`${currentSize.background} ${currentBackground} flex items-center justify-center p-2`}>
          {renderSpinner()}
        </div>
      </div>
      
      {/* Loading Text */}
      {showText && (
        <div className="mt-4 text-center">
          <p className={`${currentSize.text} font-medium ${currentColor.text} animate-pulse`}>
            {text}
          </p>
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 ${currentColor.dots} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingSpinner;