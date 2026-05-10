import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from 'react-icons/fa';
import './Hero.css';
import profilePhoto from '../profile-photo/me.jpeg';

const Hero = () => {
    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" id="home">
            <div className="hero-bg">
                <div className="grid-overlay"></div>
            </div>

            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="greeting">Hello, I'm</div>
                        <h1 className="hero-title">
                            <span className="gradient-text">Full Stack Developer</span>
                        </h1>
                        <p className="hero-description">
                            MCA Graduate with 1+ year of professional experience in building modern,
                            scalable web applications. Passionate about creating elegant solutions
                            to complex problems.
                        </p>

                        <div className="hero-stats">
                            <div className="stat-item">
                                <div className="stat-number">1+</div>
                                <div className="stat-label">Years Experience</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">15+</div>
                                <div className="stat-label">Projects Completed</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">10+</div>
                                <div className="stat-label">Technologies</div>
                            </div>
                        </div>

                        <div className="hero-buttons">
                            <button className="btn btn-primary" onClick={scrollToContact}>
                                Get In Touch
                            </button>
                            <a href="/Arthi_A.pdf" download="Arthi_A.pdf" className="btn btn-secondary">
                                <FaDownload /> Download CV
                            </a>
                        </div>

                        <div className="social-links">
                            <a href="https://github.com/Arthi-Ananth" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="https://www.linkedin.com/in/arthi-a-577b63251" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="mailto:arthiananth1101@gmail.com" className="social-link">
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>

                    <div className="hero-image-container">
                        <div className="hero-image-wrapper">
                            <div className="image-border"></div>
                            <img
                                src={profilePhoto}
                                alt="Profile"
                                className="hero-profile-image"
                            />
                            <div className="image-glow"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse"></div>
            </div>
        </section>
    );
};

export default Hero;
