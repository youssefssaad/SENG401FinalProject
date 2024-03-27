import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Since I started using this app, managing my finances has become not just easier, but actually enjoyable. I've always struggled to keep track of my spending and stick to a budget, but the app's intuitive design and insightful analytics have turned what was once a daunting task into a simple, rewarding routine. I'm saving more money than ever before, and I feel fully in control of my financial future. Truly a game-changer!",
      author: "Anna Amery",
    },
    {
      text: "As a busy professional with little time to spare, I needed a straightforward solution for managing my personal finances without the hassle of spreadsheets or manual tracking. This app has been a revelation, offering quick, efficient budget management and transaction tracking that fits seamlessly into my hectic schedule. The feature to export budget allocation as a CSV has been particularly useful for financial planning and discussions with my advisor.",
      author: "Mohammed George",
    },
    {
      text: "Starting out on my financial independence journey was intimidating, to say the least. This app has been an invaluable mentor, guiding me through the basics of budgeting, saving, and investing. The clear, user-friendly interface and helpful tips have made what seemed like a complex process completely manageable. I'm not only learning how to manage my money better but also understanding financial principles that will benefit me for a lifetime. I couldn't have asked for a better tool to start with.",
      author: "Gary Bob",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [slideDirection, setSlideDirection] = useState("left");

  const nextTestimonial = () => {
    setSlideDirection("left"); 
    setCurrentTestimonial((prevTestimonial) => (prevTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setSlideDirection("right"); 
    setCurrentTestimonial((prevTestimonial) =>
      prevTestimonial === 0 ? testimonials.length - 1 : prevTestimonial - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 3000);
    return () => clearInterval(interval);
  }, []); // Removed the dependency to avoid resetting the interval on testimonial change

  return (
    <div className="main-page-test">
      <div className="testimonial-container">
        {/* <button onClick={prevTestimonial} className="nav-button">&lt;</button> */}
        <div className={`testimonial ${slideDirection}`}>
          <p>{testimonials[currentTestimonial].text}</p>
          <p>- {testimonials[currentTestimonial].author}</p>
        </div>
        {/* <button onClick={nextTestimonial} className="nav-button">&gt;</button> */}
      </div>
    </div>
  );
};

export default Testimonials;