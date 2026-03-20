import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

const SpinnerDemo = () => {
  const [selectedStyle, setSelectedStyle] = useState('elegant');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('large');
  const [selectedBackground, setSelectedBackground] = useState('elegant');
  const [showText, setShowText] = useState(true);

  const styles = [
    { value: 'elegant', label: '✨ Elegant', description: 'Classic spinning ring with subtle pulse' },
    { value: 'minimal', label: '⚪ Minimal', description: 'Simple bouncing dots' },
    { value: 'pulse', label: '💫 Pulse', description: 'Breathing pulse effect' },
    { value: 'dual-ring', label: '🎯 Dual Ring', description: 'Double rotating rings' },
    { value: 'wave', label: '🌊 Wave', description: 'Animated waveform bars' },
    { value: 'scale', label: '🔄 Scale', description: 'Ping and spin combination' },
    { value: 'breathing', label: '🫁 Breathing', description: 'Concentric breathing effect' },
    { value: 'dots', label: '••• Dots', description: 'Traditional loading dots' }
  ];

  const colors = [
    { value: 'primary', label: '🔵 Blue', description: 'Professional blue theme' },
    { value: 'secondary', label: '⚫ Gray', description: 'Neutral gray theme' },
    { value: 'success', label: '🟢 Green', description: 'Success green theme' },
    { value: 'danger', label: '🔴 Red', description: 'Alert red theme' },
    { value: 'warning', label: '🟡 Yellow', description: 'Warning yellow theme' },
    { value: 'purple', label: '🟣 Purple', description: 'Premium purple theme' }
  ];

  const backgrounds = [
    { value: 'none', label: '🚫 None', description: 'No background' },
    { value: 'circle', label: '⚪ Circle', description: 'White circular background' },
    { value: 'subtle', label: '🔘 Subtle', description: 'Light gray rounded background' },
    { value: 'elegant', label: '✨ Elegant', description: 'Clean white with shadow' },
    { value: 'glass', label: '🥃 Glass', description: 'Glass morphism effect' },
    { value: 'gradient', label: '🌈 Gradient', description: 'Subtle gradient background' },
    { value: 'dark', label: '⚫ Dark', description: 'Dark theme background' },
    { value: 'colorful', label: '🌈 Colorful', description: 'Colorful gradient background' }
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'X-Large' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Clean & Elegant Loading Spinners
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Beautiful, professional loading spinners with customizable styles, colors, 
            and background options. Perfect for any modern application.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customize Your Spinner</h2>
          
          {/* Style Selection */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-3">Animation Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {styles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setSelectedStyle(style.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedStyle === style.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{style.label}</div>
                  <div className="text-xs opacity-75 mt-1">{style.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-3">Color Theme</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedColor === color.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{color.label}</div>
                  <div className="text-xs opacity-75 mt-1">{color.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Background Selection */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-3">Background Style</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {backgrounds.map((bg) => (
                <button
                  key={bg.value}
                  onClick={() => setSelectedBackground(bg.value)}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    selectedBackground === bg.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{bg.label}</div>
                  <div className="text-xs opacity-75 mt-1">{bg.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-3">Size</label>
            <div className="flex flex-wrap gap-3">
              {sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size.value)}
                  className={`px-4 py-2 rounded-xl border-2 transition-all duration-300 ${
                    selectedSize === size.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={showText}
                onChange={(e) => setShowText(e.target.checked)}
                className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Show Loading Text
            </label>
          </div>
        </div>

        {/* Live Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-12 mb-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Live Preview</h3>
          <div className="flex justify-center">
            <LoadingSpinner
              style={selectedStyle}
              color={selectedColor}
              size={selectedSize}
              background={selectedBackground}
              showText={showText}
              text="Loading amazing content..."
              className="transform scale-125"
            />
          </div>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((style) => (
            <div key={style.value} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg font-bold text-gray-900 mb-4">{style.label}</h4>
              <div className="flex justify-center mb-4">
                <LoadingSpinner
                  style={style.value}
                  color="primary"
                  size="medium"
                  background="elegant"
                  showText={false}
                />
              </div>
              <p className="text-gray-600 text-sm text-center">{style.description}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Clean Design</h3>
            <p className="text-gray-600">Elegant, professional animations that enhance rather than distract from your content</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fully Customizable</h3>
            <p className="text-gray-600">Choose from 8 styles, 6 color themes, 8 background options, and 4 sizes</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Optimized</h3>
            <p className="text-gray-600">Lightweight CSS animations with smooth 60fps performance</p>
          </div>
        </div>

        {/* Background Examples */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Background Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {backgrounds.map((bg) => (
              <div key={bg.value} className="text-center">
                <div className="flex justify-center mb-3">
                  <LoadingSpinner
                    style="elegant"
                    color="primary"
                    size="small"
                    background={bg.value}
                    showText={false}
                  />
                </div>
                <p className="text-sm text-gray-700 font-medium">{bg.label}</p>
                <p className="text-xs text-gray-500 mt-1">{bg.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Usage Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-gray-900 font-bold mb-2">Basic Usage</h4>
              <pre className="text-green-600 text-sm overflow-x-auto">
{`<LoadingSpinner 
  style="elegant" 
  color="primary"
  size="large"
  background="elegant"
/>`}
              </pre>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="text-gray-900 font-bold mb-2">Advanced Usage</h4>
              <pre className="text-green-600 text-sm overflow-x-auto">
{`<LoadingSpinner 
  style="breathing"
  color="success"
  size="medium"
  background="glass"
  showText={true}
  text="Processing..."
  className="my-custom-class"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerDemo;