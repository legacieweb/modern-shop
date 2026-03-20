import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, MapPin, Clock, DollarSign, Heart, Star, Coffee, Laptop, Globe } from 'lucide-react';

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      experience: '5+ years',
      description: 'Join our frontend team to build amazing user experiences with React, TypeScript, and modern web technologies.',
      requirements: [
        '5+ years of experience with React and JavaScript',
        'Experience with TypeScript and modern CSS',
        'Knowledge of responsive design and accessibility',
        'Experience with Git and agile development'
      ]
    },
    {
      id: 2,
      title: 'Product Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Design intuitive and beautiful user experiences for our e-commerce platform.',
      requirements: [
        '3+ years of product design experience',
        'Proficiency in Figma and design systems',
        'Strong portfolio demonstrating UX/UI skills',
        'Experience with user research and testing'
      ]
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '4+ years',
      description: 'Lead our digital marketing efforts and drive customer acquisition.',
      requirements: [
        '4+ years of digital marketing experience',
        'Experience with SEO, SEM, and social media',
        'Data-driven approach to marketing',
        'Strong analytical and communication skills'
      ]
    },
    {
      id: 4,
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Austin, TX',
      type: 'Full-time',
      experience: '2+ years',
      description: 'Help our customers succeed and build lasting relationships.',
      requirements: [
        '2+ years of customer success experience',
        'Excellent communication and problem-solving skills',
        'Experience with CRM systems',
        'Passion for helping others succeed'
      ]
    },
    {
      id: 5,
      title: 'Data Analyst',
      department: 'Data',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      description: 'Analyze data to drive business decisions and customer insights.',
      requirements: [
        '3+ years of data analysis experience',
        'Proficiency in SQL and Python',
        'Experience with data visualization tools',
        'Strong analytical and critical thinking skills'
      ]
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Competitive Salary',
      description: 'We offer competitive compensation packages that reflect your skills and experience.'
    },
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, mental health support, and wellness programs.'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Work-life balance with flexible schedules and remote work options.'
    },
    {
      icon: Coffee,
      title: 'Learning & Development',
      description: 'Annual learning budget, conference attendance, and career growth opportunities.'
    },
    {
      icon: Laptop,
      title: 'Latest Technology',
      description: 'Top-of-the-line equipment and the latest software tools to do your best work.'
    },
    {
      icon: Globe,
      title: 'Global Team',
      description: 'Work with talented people from around the world in a diverse, inclusive environment.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Build the future of e-commerce with us. We're looking for passionate, talented individuals who want to make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#openings" 
                className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#benefits" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Learn About Benefits
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're more than just a company - we're a community of innovators, creators, and problem-solvers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaborative Culture</h3>
              <p className="text-gray-600">
                Work together with talented teammates who support each other and share knowledge freely.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Meaningful Work</h3>
              <p className="text-gray-600">
                Build products that impact millions of customers and shape the future of online shopping.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Growth Opportunities</h3>
              <p className="text-gray-600">
                Continuous learning and development opportunities to advance your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
            <p className="text-xl text-gray-600">
              We take care of our team with comprehensive benefits and perks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity and join our growing team.
            </p>
          </div>
          
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {job.experience}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors w-full lg:w-auto">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl text-primary-100 mb-8">
            We're always looking for talented people to join our team. Send us your resume and we'll be in touch!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Send Your Resume
            </button>
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

export default CareersPage;