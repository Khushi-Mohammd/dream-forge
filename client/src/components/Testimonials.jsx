import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "motion/react";

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer testimonials
      </h1>
      <p className="text-gray-500 dark:text-[#c6c6c6] mb-12">
        What Our Users Are Saying
      </p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/20 dark:bg-[#36415355] p-12 rounded-lg shadow-md dark:shadow-[#0c243eb2] w-80 m-auto cursor-pointer hover:scale-[1.020] transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <img
                src={testimonial.image}
                alt=""
                className="rounded-full w-14"
              />

              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 dark:text-[#c6c6c6] mb-4">
                {testimonial.role}
              </p>

              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((item, index) => (
                    <img src={assets.rating_star} alt="" key={index} />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-[#bdbdbd]">
                {testimonial.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
