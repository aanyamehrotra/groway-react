import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="pricing-section">
      <h2 className="pricing-heading">Plans and pricing</h2>
      <div className="pricing-cards">
        {[
          {
            name: "Try",
            price: "Free",
            details: "3 random personality traits (exclude Top 5)",
            button: "Start FREE test",
            className: "card try",
          },
          {
            name: "Fast",
            price: "€1",
            details: "TOP-15 personality traits\n1 FULL test",
            button: "Get FULL test",
            className: "card fast",
          },
          {
            name: "Grow",
            price: "€5 /mo",
            details: "TOP-15 personality traits\n1 FULL test per day",
            button: "Subscribe",
            className: "card grow",
          },
          {
            name: "Hack",
            price: "€19 /mo",
            details: "TOP-15 personality traits\nUnlimited tests per day",
            button: "Boost",
            className: "card hack",
          },
        ].map((plan) => (
          <div className={plan.className} key={plan.name}>
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <p className="details">{plan.details}</p>
            <button>{plan.button}</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
