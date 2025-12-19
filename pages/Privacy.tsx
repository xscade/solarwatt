import React from 'react';
import { Shield, Lock, Eye, UserCheck, Mail, Phone } from 'lucide-react';
import { BRAND_NAME, EMAIL_ADDRESS, PHONE_NUMBER, ADDRESS } from '../constants';

const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-secondary text-white py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl mb-4 md:mb-6">
            <Shield size={28} className="text-primary md:hidden" />
            <Shield size={32} className="text-primary hidden md:block" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">Privacy Policy</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-blue-200 text-sm mt-4">Last Updated: December 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-gray-600 text-lg leading-relaxed">
            {BRAND_NAME} ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our solar energy services.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mb-10 md:mb-12">
          <div className="flex items-start md:items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
              <Eye size={20} className="text-primary" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-dark">1. Information We Collect</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p><strong className="text-dark">Personal Information:</strong> When you fill out our contact form or request a quote, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Full Name</li>
              <li>Email Address</li>
              <li>Phone Number</li>
              <li>Monthly Electricity Bill Amount</li>
              <li>Address/Location (for site surveys)</li>
            </ul>
            <p><strong className="text-dark">Automatically Collected Information:</strong> We may automatically collect certain information when you visit our website, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP Address</li>
              <li>Browser Type and Version</li>
              <li>Pages Visited and Time Spent</li>
              <li>Device Information</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
              <UserCheck size={20} className="text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-dark">2. How We Use Your Information</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your inquiries and provide customer support</li>
              <li>Process and fulfill your solar installation requests</li>
              <li>Send you quotes, proposals, and project updates</li>
              <li>Conduct site surveys and shadow analysis</li>
              <li>Facilitate government subsidy applications (PM Surya Ghar, etc.)</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Lock size={20} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">3. Data Security</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>We implement appropriate technical and organizational security measures to protect your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encrypted data transmission (SSL/TLS)</li>
              <li>Secure database storage</li>
              <li>Limited access to personal information</li>
              <li>Regular security assessments</li>
            </ul>
            <p>However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">4. Information Sharing</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Partners:</strong> Authorized installers and technicians for project execution</li>
              <li><strong>Government Bodies:</strong> For subsidy processing and net-metering applications (DISCOM, MNRE)</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <UserCheck size={20} className="text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">5. Your Rights</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
            </ul>
            <p>To exercise any of these rights, please contact us using the information provided below.</p>
          </div>
        </section>

        {/* Section 6 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">6. Cookies</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Improve our services</li>
            </ul>
            <p>You can control cookies through your browser settings. Disabling cookies may affect some website functionality.</p>
          </div>
        </section>

        {/* Section 7 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">7. Third-Party Links</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>Our website may contain links to third-party websites (e.g., government portals, payment gateways). We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.</p>
          </div>
        </section>

        {/* Section 8 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <Lock size={20} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">8. Data Retention</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>We retain your personal information for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide our services and support</li>
              <li>Comply with legal obligations</li>
              <li>Honor warranty and guarantee commitments (up to 27 years for PPG)</li>
              <li>Resolve disputes</li>
            </ul>
          </div>
        </section>

        {/* Section 9 */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-dark">9. Changes to This Policy</h2>
          </div>
          <div className="pl-13 space-y-4 text-gray-600">
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-light rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-dark mb-6">10. Contact Us</h2>
          <p className="text-gray-600 mb-6">If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={20} />
              <a href={`mailto:${EMAIL_ADDRESS}`} className="text-secondary hover:text-primary font-medium">{EMAIL_ADDRESS}</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={20} />
              <a href={`tel:${PHONE_NUMBER}`} className="text-secondary hover:text-primary font-medium">{PHONE_NUMBER}</a>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="text-primary mt-1" size={20} />
              <span className="text-gray-600">{ADDRESS}</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Privacy;

