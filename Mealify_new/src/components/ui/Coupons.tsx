import React, { useState } from 'react';
import { Percent, X } from 'lucide-react';
import RotatingText from './rotating_text';

interface Coupon {
    code: string;
    description: string;
    discount: string;
    validUntil: string;
}

const coupons: Coupon[] = [
    {
        code: "FIRST50",
        description: "50% off on your first order",
        discount: "50% OFF",
        validUntil: "31st July 2025"
    },
    {
        code: "SUMMER25",
        description: "25% off on all summer specials",
        discount: "25% OFF",
        validUntil: "15th Aug 2025"
    },
    {
        code: "COMBO20",
        description: "20% off on combo meals",
        discount: "20% OFF",
        validUntil: "30th Aug 2025"
    },
    {
        code: "SPECIAL15",
        description: "15% off on all orders above ₹500",
        discount: "15% OFF",
        validUntil: "31st Dec 2025"
    }
];

const Coupons: React.FC = () => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <div className="mb-12">
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-0 justify-between rounded-md sm:rounded-full p-4 bg-gradient-to-r from-[#475569cc] to-[#1e293bcc]">
                <div className="flex-1 w-full sm:w-auto overflow-hidden flex items-center">
                    <Percent className="h-8 w-8 rounded-xl p-1 bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] text-gray-200 flex-shrink-0 mr-2" />
                    <RotatingText
                        texts={coupons.map(coupon => `${coupon.code}: ${coupon.description}`)}
                        rotationInterval={3000}
                        className="text-gray-300 text-base sm:text-lg truncate"
                        auto
                        loop
                    />
                </div>

                <button
                    onClick={() => setIsDetailsOpen(true)}
                    className="w-full sm:w-auto sm:ml-24 shrink-0 bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] text-white px-4 py-2 rounded-full hover:scale-105 transition-transform duration-300"
                >
                    {coupons.length} Coupons Available
                </button>
            </div>

            {/* Coupon Details Modal */}
            <>
                <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 0.85; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0); 
          }
        }
      `}</style>

                {isDetailsOpen && (
                    <div className="fixed inset-0 z-50 overflow-y-auto opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
                        <div className="flex items-center justify-center min-h-screen px-4">
                            {/* Backdrop with smooth fade-in */}
                            <div
                                className="fixed inset-0 bg-black backdrop-blur-md opacity-0 animate-[backdropFadeIn_0.3s_ease-out_forwards]"
                                onClick={() => setIsDetailsOpen(false)}
                            />

                            {/* Modal with scale and fade animation */}
                            <div className="relative bg-gradient-to-r from-[#475569ee] to-[#1e293bee] rounded-2xl p-4 sm:p-6 mx-4 sm:mx-auto max-w-2xl w-full shadow-2xl transform scale-95 opacity-0 animate-[slideUp_0.3s_ease-out_forwards]">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                                    <h3 className="text-3xl sm:text-4xl font-bold text-indigo-400">
                                        Available Coupons
                                    </h3>
                                    <button
                                        onClick={() => setIsDetailsOpen(false)}
                                        className="p-1 hover:bg-gray-700/50 rounded-full transition-all duration-200 hover:scale-110"
                                    >
                                        <X className="h-6 w-6 text-gray-300" />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {coupons.map((coupon, index) => (
                                        <div
                                            key={index}
                                            className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-2">
                                                <div className="w-full sm:w-auto">
                                                    <h4 className="text-lg sm:text-xl font-bold text-gray-300 mb-1">{coupon.code}</h4>
                                                    <p className="text-sm sm:text-base text-gray-300">{coupon.description}</p>
                                                </div>
                                                <span className="bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] text-white px-3 py-1 rounded-full text-sm transform transition-all duration-200 hover:scale-105 whitespace-nowrap">
                                                    {coupon.discount}
                                                </span>
                                            </div>
                                            <p className="text-sm text-amber-400">Valid until {coupon.validUntil}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default Coupons;
