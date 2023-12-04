import React from "react";
import '../../styles/component/Footer.css';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>KEA3_WANZA가 ♥을 담아만든</p>
          <p>Travelog는 국내 여행 블로그 서비스입니다.</p>
          <p>다양한 국내 여행을 공유해 보세요!</p>
          
        </div>
        <div className="footer-section links">
          <h3>Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="/postlist">PostList</a></li>
            <li><a href="/bookmark">BookMark</a></li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h3>Contact Us</h3>
          <a href="https://github.com/Wanza2023" target="_blank" rel="noopener noreferrer" className="footer-contact">
            <FaGithub size={30} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; travelog.com | Designed by WANZA
      </div>
    </footer>
  );
};

export default Footer;
