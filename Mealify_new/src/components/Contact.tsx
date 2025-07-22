import {Phone, Mail, MapPin } from "lucide-react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have questions or special requests? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="text-center group">
            <div className="bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Call Us</h3>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Email Us</h3>
            <p className="text-gray-400">hello@mealify.com</p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Visit Us</h3>
            <p className="text-gray-400">Sector-62, Noida</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;