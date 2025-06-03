import React from 'react';
import changeYourselfImg from './change-yourself.jpg';
import './change-yourself.css';

const ChangeYourself = () => {
  return (
    <div className="change-yourself-container">
      <div className="change-yourself-inner">
        <img
          src={changeYourselfImg}
          alt="Improve Yourself"
          className="change-yourself-image"
        />
        <p className="change-yourself-quote">
          If you want to change the world,<br />start with yourself.
        </p>
      </div>
    </div>
  );
};

export default ChangeYourself;

