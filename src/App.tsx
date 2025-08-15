import React, { useState, useEffect } from 'react';
import KultripWidget from './components/KultripWidget';
import { 
  Play, 
  BookOpen, 
  Tv, 
  MapPin, 
  Star, 
  ArrowRight, 
  Phone, 
  Mail, 
  Globe,
  Users,
  Award,
  Heart,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredStories = [
    {
      title: "Lord of the Rings",
      location: "New Zealand",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Movie"
    },
    {
      title: "Eat, Pray, Love",
      location: "Italy, India, Indonesia",
      image: "https://images.pexels.com/photos/2290753/pexels-photo-2290753.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Book"
    },
    {
      title: "Game of Thrones",
      location: "Croatia, Iceland, Spain",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "TV Show"
    },
    {
      title: "The Beach",
      location: "Thailand",
      image: "https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg?auto=compress&cs=tinysrgb&w=800",
      type: "Movie"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, USA",
      text: "Dreamm Travel made my Harry Potter dreams come true! The Edinburgh and Scotland tour was absolutely magical.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Marco Rodriguez",
      location: "Barcelona, Spain",
      text: "Following the James Bond locations across Europe was an adventure of a lifetime. Every detail was perfect!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200"
    },
    {
      name: "Lisa Chen",
      location: "Tokyo, Japan",
      text: "The Studio Ghibli-inspired tour of Japan exceeded all expectations. Pure magic in every location!",
      rating: 5,
      avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Globe className={`h-8 w-8 mr-2 ${scrollY > 50 ? 'text-blue-600' : 'text-white'}`} />
              <span className={`text-xl font-bold ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}>
                Dreamm Travel
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  scrollY > 50 ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}>Home</a>
                <a href="#how-it-works" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  scrollY > 50 ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}>How It Works</a>
                <a href="#destinations" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  scrollY > 50 ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}>Destinations</a>
                <a href="#testimonials" className={`px-3 py-2 text-sm font-medium transition-colors ${
                  scrollY > 50 ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}>Reviews</a>
                <a href="#contact" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                  Plan Your Journey
                </a>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#home" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Home</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-900 hover:text-blue-600">How It Works</a>
              <a href="#destinations" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Destinations</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-900 hover:text-blue-600">Reviews</a>
              <a href="#contact" className="block px-3 py-2 bg-amber-500 text-white rounded-md mx-3 text-center">
                Plan Your Journey
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Travel Your
              <span className="text-amber-400 block">Favorite Stories</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
              Transform your favorite books, movies, and TV shows into unforgettable journeys you can live. 
              Step into the worlds you love and turn imagined places into real destinations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                Start Your Story Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your favorite stories into real adventures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Story</h3>
                <p className="text-gray-600 leading-relaxed">
                  Tell us about your favorite book, movie, or TV show. Our Kultrip widget analyzes 
                  the story's locations and themes.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-r from-amber-500 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Your Itinerary</h3>
                <p className="text-gray-600 leading-relaxed">
                  Receive a personalized travel plan featuring real-world locations from your story, 
                  complete with activities and insider tips.
                </p>
              </div>
            </div>

            <div className="text-center group">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-600 to-green-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Your Adventure</h3>
                <p className="text-gray-600 leading-relaxed">
                  Embark on your story-inspired journey with full support, guided tours, 
                  and exclusive experiences you won't find anywhere else.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kultrip Widget Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Experience Your Favorite Stories Like Never Before
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our revolutionary travel planning widget analyzes your favorite stories and creates 
              personalized itineraries that bring fiction to life.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Experience Stories Like Never Before
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Literary Adventures</h4>
                      <p className="text-gray-600">Walk in the footsteps of your favorite book characters</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-amber-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <Play className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cinematic Journeys</h4>
                      <p className="text-gray-600">Visit iconic movie locations around the world</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                      <Tv className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">TV Show Tours</h4>
                      <p className="text-gray-600">Explore the real-world settings of hit series</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <KultripWidget />
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500 italic">
                  Powered by Kultrip and Your Imagination
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section id="destinations" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Popular Story Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most requested story-inspired travel experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStories.map((story, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                      {story.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">{story.title}</h3>
                    <p className="text-gray-200 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {story.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Explore All Destinations
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real adventurers who've lived their favorite tales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-gray-600">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1,200+</div>
              <div className="text-gray-600">Stories Mapped</div>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
              <div className="text-gray-600">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Live Your Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join thousands of travelers who've turned their favorite stories into unforgettable adventures. 
            Your next chapter starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Start Planning Now
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 mr-2 text-blue-400" />
                <span className="text-2xl font-bold">Dreamm Travel</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Transforming favorite stories into real-world adventures. Experience the magic of 
                storytelling through travel with our innovative approach.
              </p>
              <div className="flex space-x-4">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Heart className="h-5 w-5" />
                </div>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#destinations" className="hover:text-white transition-colors">Destinations</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Reviews</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+1 (555) 123-DREAM</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>hello@dreammtravel.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>New York, NY</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Dreamm Travel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;