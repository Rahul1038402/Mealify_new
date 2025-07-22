import { Star } from "lucide-react";
import { CountUp } from "./ui/count-up";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="px-6 text-gray-300"
    >
      {/* constrain to a reasonable max width and center */}
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-5xl pb-8 font-bold bg-gradient-to-r from-[#5b32ffc9] to-[#613efbcb] bg-clip-text text-transparent">
          Our Story
        </h2>

        <p className="text-xl leading-relaxed">
          Founded with a passion for exceptional cuisine, TasteBite brings together the finest ingredients and culinary expertise to create unforgettable dining experiences.
        </p>
        <p className="text-lg leading-relaxed">
          Our team of expert chefs crafts each dish with care, ensuring every bite is a perfect blend of flavor, nutrition, and satisfaction. From farm‑fresh ingredients to innovative recipes, we're committed to excellence in every aspect of our service.
        </p>

        {/* stats row center aligned */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12">
          <div>
            <CountUp
          value={500}
          prefix=""
          suffix="+"
          decimals={0}
          duration={2}
          className="text-5xl font-bold text-[#613efbcb] mb-2"
        />
            <div className="text-xl font-medium">Happy Customers</div>
          </div>
          <div>
            <CountUp
          value={35}
          prefix=""
          suffix="+"
          decimals={0}
          duration={2}
          className="text-5xl font-bold text-[#613efbcb] mb-2"
        />
            <div className="text-xl font-medium">Menu Items</div>
          </div>
          <div>
            <CountUp
          value={15}
          prefix=""
          suffix="+"
          decimals={0}
          duration={2}
          className="text-5xl font-bold text-[#613efbcb] mb-2"
        />
            <div className="text-xl font-medium">Expert Chefs</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
