import { Utensils } from "lucide-react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="text-white py-12">
            <hr className="text-white/40" />
            <div className="container pt-4 mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex flex-col mb-10">
                            {/* Icon and Text */}
                            <div className="flex items-center">
                                <div className="h-14 w-14 mr-2 flex items-center justify-center rounded-full bg-gradient-to-r from-[#5b32ffc9] to-[#5833ffcb]">
                                    <Utensils className="h-8 w-8 text-white" />
                                </div>

                                <div className="flex flex-col items-start">
                                    {/* Text */}
                                    <p
                                        className="text-5xl text-gray-300 tracking-wider"
                                        style={{ fontFamily: 'JapaneseStyle' }}
                                    >
                                        Mealify
                                    </p>

                                    {/* Line only as wide as text */}
                                    <div className="mt-2 h-1 w-full bg-white/40 rounded-full" />
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                            Delivering exceptional culinary experiences right to your doorstep.
                            Fresh ingredients, expert preparation, and unmatched flavor in every bite.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl text-[#5833ffcb] font-semibold mb-4">Quick Links</h3>
                        <div className="space-y-2">
                            <Link to="/" className="block text-gray-300 hover:text-white transition-colors">Home</Link>
                            <Link to="/order" className="block text-gray-300 hover:text-white transition-colors">Menu</Link>
                            <a href="#about" className="block text-gray-300 hover:text-white transition-colors">About</a>
                            <a href="#contact" className="block text-gray-300 hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl text-[#5833ffcb] font-semibold mb-4">Hours</h3>
                        <div className="space-y-4 text-gray-300">
                            <p>
                                Monday - Friday:<br />
                                9AM - 11PM
                            </p>
                            <p>
                                Saturday - Sunday:<br />
                                10AM - 12AM
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-300">
                        © 2025 Mealify. All rights reserved. Made with ❤️ for food lovers.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;