import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, Download, Megaphone, Users, TrendingUp, Award, Globe } from 'lucide-react';

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      title: 'ModernShop Raises $50M Series B to Accelerate E-commerce Innovation',
      date: '2024-11-15',
      excerpt: 'Funding will be used to expand our AI-powered personalization platform and enter new international markets.',
      category: 'Funding',
      featured: true
    },
    {
      id: 2,
      title: 'ModernShop Partners with Major Retail Brands to Launch Sustainable Shopping Initiative',
      date: '2024-10-28',
      excerpt: 'New partnership program helps customers discover and purchase eco-friendly products from leading brands.',
      category: 'Partnership',
      featured: true
    },
    {
      id: 3,
      title: 'ModernShop Reports 300% Growth in Mobile Commerce Sales',
      date: '2024-09-12',
      excerpt: 'Mobile-first approach drives unprecedented growth in smartphone shopping experiences.',
      category: 'Growth',
      featured: false
    },
    {
      id: 4,
      title: 'CEO Sarah Johnson Named to Forbes 30 Under 30',
      date: '2024-08-05',
      excerpt: 'Recognition highlights innovation in e-commerce technology and sustainable business practices.',
      category: 'Recognition',
      featured: false
    },
    {
      id: 5,
      title: 'ModernShop Launches AI-Powered Product Recommendation Engine',
      date: '2024-07-20',
      excerpt: 'New machine learning platform delivers personalized shopping experiences at scale.',
      category: 'Product',
      featured: false
    }
  ];

  const mediaAssets = [
    {
      title: 'Company Logo Pack',
      description: 'High-resolution logos in various formats and colors',
      type: 'Brand Assets',
      downloadUrl: '#'
    },
    {
      title: 'Executive Headshots',
      description: 'Professional photos of leadership team',
      type: 'Photography',
      downloadUrl: '#'
    },
    {
      title: 'Product Screenshots',
      description: 'High-quality screenshots of our platform',
      type: 'Product',
      downloadUrl: '#'
    },
    {
      title: 'Brand Guidelines',
      description: 'Complete brand identity and usage guidelines',
      type: 'Brand Assets',
      downloadUrl: '#'
    }
  ];

  const pressContacts = [
    {
      name: 'Emily Chen',
      title: 'Director of Communications',
      email: 'press@modernshop.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Michael Rodriguez',
      title: 'PR Manager',
      email: 'media@modernshop.com',
      phone: '+1 (555) 123-4568'
    }
  ];

  const companyStats = [
    {
      icon: Users,
      number: '10M+',
      label: 'Active Customers'
    },
    {
      icon: Globe,
      number: '50+',
      label: 'Countries Served'
    },
    {
      icon: TrendingUp,
      number: '300%',
      label: 'YoY Growth'
    },
    {
      icon: Award,
      number: '15+',
      label: 'Industry Awards'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Press & Media</h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Latest news, press releases, and media resources from ModernShop.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#press-releases" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <Megaphone className="mr-2 h-5 w-5" />
                Latest News
              </a>
              <a 
                href="#media-kit" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <Download className="mr-2 h-5 w-5" />
                Media Kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Press Releases */}
      <section id="press-releases" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Press Releases</h2>
            <p className="text-xl text-gray-600">
              Stay updated with our latest announcements and company news.
            </p>
          </div>
          
          <div className="space-y-8">
            {pressReleases.map((release) => (
              <article key={release.id} className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow ${release.featured ? 'ring-2 ring-primary-200' : ''}`}>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {release.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(release.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      {release.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors">
                      {release.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">{release.excerpt}</p>
                    
                    <div className="flex items-center gap-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center">
                        Read More
                        <ExternalLink className="ml-1 h-4 w-4" />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 inline-flex items-center">
                        <Download className="mr-1 h-4 w-4" />
                        Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section id="media-kit" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Media Kit</h2>
            <p className="text-xl text-gray-600">
              Download logos, photos, and brand assets for editorial use.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mediaAssets.map((asset, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{asset.title}</h3>
                    <p className="text-gray-600 mb-3">{asset.description}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                      {asset.type}
                    </span>
                  </div>
                  <button className="ml-4 p-2 text-primary-600 hover:text-primary-700 hover:bg-white rounded-lg transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Contacts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Press Contacts</h2>
            <p className="text-xl text-gray-600">
              Get in touch with our communications team for media inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pressContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{contact.name}</h3>
                <p className="text-primary-600 font-medium mb-4">{contact.title}</p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${contact.email}`}
                    className="block text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="block text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-xl text-primary-100 mb-8">
            For press inquiries, interview requests, or additional information, please contact our communications team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:press@modernshop.com"
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Press Team
            </a>
            <Link 
              to="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PressPage;