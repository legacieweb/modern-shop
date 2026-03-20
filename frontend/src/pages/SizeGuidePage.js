import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, ShoppingCart, CheckCircle, AlertCircle, Info } from 'lucide-react';

const SizeGuidePage = () => {
  const [activeCategory, setActiveCategory] = useState('clothing');

  const sizeCharts = {
    clothing: {
      title: 'Clothing & Apparel',
      image: '/size-guide/clothing.jpg',
      sizes: {
        'XS': { chest: '30-32"', waist: '26-28"', hips: '32-34"', length: '27"' },
        'S': { chest: '32-34"', waist: '28-30"', hips: '34-36"', length: '28"' },
        'M': { chest: '34-36"', waist: '30-32"', hips: '36-38"', length: '29"' },
        'L': { chest: '38-40"', waist: '32-34"', hips: '38-40"', length: '30"' },
        'XL': { chest: '42-44"', waist: '36-38"', hips: '42-44"', length: '31"' },
        'XXL': { chest: '46-48"', waist: '40-42"', hips: '46-48"', length: '32"' }
      },
      measurements: [
        { name: 'Chest', description: 'Measure around the fullest part of your chest' },
        { name: 'Waist', description: 'Measure around your natural waistline' },
        { name: 'Hips', description: 'Measure around the fullest part of your hips' },
        { name: 'Length', description: 'From shoulder to desired length' }
      ]
    },
    shoes: {
      title: 'Footwear',
      image: '/size-guide/shoes.jpg',
      sizes: {
        '6': { length: '9.25"', width: '3.5"' },
        '7': { length: '9.5"', width: '3.6"' },
        '8': { length: '9.75"', width: '3.7"' },
        '9': { length: '10"', width: '3.8"' },
        '10': { length: '10.25"', width: '3.9"' },
        '11': { length: '10.5"', width: '4"' },
        '12': { length: '10.75"', width: '4.1"' }
      },
      measurements: [
        { name: 'Length', description: 'From heel to longest toe' },
        { name: 'Width', description: 'Around the ball of your foot' }
      ]
    },
    accessories: {
      title: 'Accessories',
      image: '/size-guide/accessories.jpg',
      sizes: {
        'S': { neck: '14-14.5"', wrist: '6-6.5"', waist: '28-30"' },
        'M': { neck: '15-15.5"', wrist: '7-7.5"', waist: '32-34"' },
        'L': { neck: '16-16.5"', wrist: '8-8.5"', waist: '36-38"' },
        'XL': { neck: '17-17.5"', wrist: '9-9.5"', waist: '40-42"' }
      },
      measurements: [
        { name: 'Neck', description: 'Around the base of your neck' },
        { name: 'Wrist', description: 'Around your wrist bone' },
        { name: 'Waist', description: 'Around your natural waistline' }
      ]
    }
  };

  const currentChart = sizeCharts[activeCategory];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center mb-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-3 rounded-xl shadow-lg">
              <ShoppingCart className="h-8 w-8 text-white" />
            </div>
            <span className="ml-3 text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
              ModernShop
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Size Guide</h1>
          <p className="text-xl text-gray-600">
            Find the perfect fit with our comprehensive sizing guide.
          </p>
        </div>

        {/* Size Guide Intro */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Info className="h-8 w-8 text-primary-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">How to Measure</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Getting Accurate Measurements</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  Use a soft measuring tape for best results
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  Wear the type of clothing you plan to wear over the item
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  Stand straight with arms relaxed at your sides
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  Have someone help you for more accurate measurements
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">General Tips</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  If between sizes, choose the larger size for comfort
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  Check individual product descriptions for specific fit information
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  Different brands may have slight variations in sizing
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                  Consider shrinkage for cotton items
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {Object.entries(sizeCharts).map(([key, chart]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeCategory === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {chart.title}
              </button>
            ))}
          </div>
        </div>

        {/* Size Chart */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gray-50 px-8 py-6">
            <div className="flex items-center">
              <Ruler className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{currentChart.title} Size Chart</h2>
            </div>
          </div>

          <div className="p-8">
            {/* Measurement Instructions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Measurement Guide</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentChart.measurements.map((measurement, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-1">{measurement.name}</h4>
                    <p className="text-sm text-gray-600">{measurement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">Size</th>
                    {currentChart.sizes && Object.keys(currentChart.sizes[Object.keys(currentChart.sizes)[0]]).map((measurement) => (
                      <th key={measurement} className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900 uppercase">
                        {measurement}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(currentChart.sizes).map(([size, measurements]) => (
                    <tr key={size} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-3 font-semibold text-gray-900 bg-primary-50">
                        {size}
                      </td>
                      {Object.values(measurements).map((value, index) => (
                        <td key={index} className="border border-gray-200 px-4 py-3 text-center text-gray-700">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Fit Guide */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Slim Fit</h3>
            <p className="text-gray-600 mb-4">
              Close-fitting design that follows body contours. Choose this for a modern, tailored look.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                1-2" smaller than regular fit
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Regular Fit</h3>
            <p className="text-gray-600 mb-4">
              Classic fit with comfortable room through the chest and arms. Our most popular fit.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Comfortable and versatile
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Relaxed Fit</h3>
            <p className="text-gray-600 mb-4">
              Roomy fit for maximum comfort. Great for casual wear and active lifestyles.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                1-2" larger than regular fit
              </div>
            </div>
          </div>
        </div>

        {/* International Size Conversion */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">International Size Conversion</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">US/UK</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">EU</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-semibold text-gray-900">Asia</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold">XS</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">34</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">S</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold">S</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">36</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">M</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold">M</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">38</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">L</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-4 py-3 font-semibold">L</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">40</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">XL</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-4 py-3 font-semibold">XL</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">42</td>
                  <td className="border border-gray-200 px-4 py-3 text-center">XXL</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            If you're unsure about sizing or need personalized recommendations, our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/faq"
              className="border border-white text-white hover:bg-white hover:text-primary-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Size FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuidePage;