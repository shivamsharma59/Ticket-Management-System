import React from 'react';
import NavBar from '../../components/header/NavBar';
import AsideBar from '../../components/AsideBar/AsideBar';
import { Outlet } from 'react-router-dom';
import './Home.page.css';

function HomePage() {
  return (
    <div className="home-page">
      <NavBar />
      <div className="main-content">
        <AsideBar />
        <div className="content-area">
          <Outlet /> {/* render the nest element here */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
