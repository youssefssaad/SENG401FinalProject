import React from 'react';
import '../index.css';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import Header from '../components/Header';
import Description from '../components/Description';
import MainInst from '../components/MainInst';


function Main() {
  return (
    <div className='main-page'>
      <Header/>
      <MainInst />
      <Description />
      <Testimonials />
      <Footer />
    </div>
  );
  };

export default Main;
