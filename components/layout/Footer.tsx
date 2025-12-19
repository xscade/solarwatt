import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { BRAND_NAME, ADDRESS, PHONE_NUMBER, PHONE_NUMBER_2, EMAIL_ADDRESS, NAV_LINKS, SERVICES } from '../../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-0.5 mb-6">
              <img 
                src="https://storage.googleapis.com/clientmedia/Solar%20watt/solarwatt_energies_solarwat%20energy%20logo.png" 
                alt={`${BRAND_NAME} Logo`}
                className="h-auto w-20 mr-[10px] -my-6 -ml-6 group-hover:opacity-80 transition-opacity"
              />
              <span className="text-base md:text-lg font-extrabold text-primary tracking-tight -ml-6">{BRAND_NAME}</span>
            </div>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Empowering homes and businesses with premium, high-efficiency solar solutions. Join the renewable revolution today.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/solarwattenergy.in?igsh=cmdkbjZtcTM0dGFx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/solarwattenergy.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="bg-white/10 p-2 rounded-full hover:bg-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-blue-400/30 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="text-blue-100 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/privacy" className="text-blue-100 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-blue-400/30 pb-2 inline-block">Our Services</h3>
            <ul className="space-y-3">
              {SERVICES.map(service => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="text-blue-100 hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-b border-blue-400/30 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-100">
                <MapPin className="shrink-0 text-primary mt-1" size={18} />
                <span className="text-sm md:text-base leading-relaxed">{ADDRESS}</span>
              </li>
              <li className="flex items-start gap-3 text-blue-100">
                <Phone className="shrink-0 text-primary mt-0.5" size={18} />
                <div className="flex flex-col text-sm md:text-base">
                  <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white">{PHONE_NUMBER}</a>
                  <a href={`tel:${PHONE_NUMBER_2}`} className="hover:text-white">{PHONE_NUMBER_2}</a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-blue-100">
                <Mail className="shrink-0 text-primary mt-0.5" size={18} />
                <a href={`mailto:${EMAIL_ADDRESS}`} className="hover:text-white text-sm md:text-base break-all">{EMAIL_ADDRESS}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800/50 pt-8 text-center text-blue-200 text-sm">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
