import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Portfolio</h3>
                        <p>Building digital experiences that make a difference</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-column">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#skills">Skills</a></li>
                                <li><a href="#projects">Projects</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Connect</h4>
                            <ul>
                                <li><a href="https://github.com/Arthi-Ananth" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                <li><a href="https://www.linkedin.com/in/arthi-a-577b63251/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                <li><a href="mailto:arthiananth1101@gmail.com">Email</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Made with <FaHeart className="heart-icon" /> by Arthi Ananth
                    </p>
                    <p className="copyright">
                        &copy; {currentYear} All rights reserved
                    </p>
                    <div className="footer-social">
                        <a href="https://github.com/Arthi-Ananth" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/arthi-a-577b63251/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
