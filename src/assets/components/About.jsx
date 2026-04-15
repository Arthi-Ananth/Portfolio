import { FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <section className="about" id="about">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </div>

                <div className="about-content">
                    <div className="about-image">
                        <div className="image-placeholder">
                            <div className="avatar-circle">
                                <FaCode className="avatar-icon" />
                            </div>
                        </div>
                        <div className="floating-card card-1">
                            <FaGraduationCap className="card-icon" />
                            <span>MCA Graduate</span>
                        </div>
                        <div className="floating-card card-2">
                            <FaBriefcase className="card-icon" />
                            <span>1 Yr Exp</span>
                        </div>
                    </div>

                    <div className="about-text">
                        <h3 className="about-heading">
                            Full Stack Developer with Passion for Innovation
                        </h3>
                        <p className="about-description">
                            I'm a Master of Computer Applications graduate with 1 year of hands-on
                            experience in full-stack development. My journey in tech has been driven
                            by a passion for solving real-world problems through elegant code.
                        </p>
                        <p className="about-description">
                            Throughout my career, I've worked on diverse projects ranging from
                            e-commerce platforms to data-driven web applications. I specialize in
                            modern JavaScript frameworks and have a strong foundation in both
                            frontend and backend technologies.
                        </p>

                        <div className="about-highlights">
                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <FaGraduationCap />
                                </div>
                                <div className="highlight-content">
                                    <h4>Education</h4>
                                    <p>Master of Computer Applications</p>
                                    <span className="highlight-detail">Completed with distinction</span>
                                </div>
                            </div>

                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <FaBriefcase />
                                </div>
                                <div className="highlight-content">
                                    <h4>Experience</h4>
                                    <p>1+ Year Professional Experience</p>
                                    <span className="highlight-detail">Full Stack Development</span>
                                </div>
                            </div>

                            <div className="highlight-item">
                                <div className="highlight-icon">
                                    <FaCode />
                                </div>
                                <div className="highlight-content">
                                    <h4>Specialization</h4>
                                    <p>Modern Web Technologies</p>
                                    <span className="highlight-detail">React, Node.js, Databases</span>
                                </div>
                            </div>
                        </div>

                        <div className="personal-interests">
                            <h4>When I'm not coding</h4>
                            <div className="interests">
                                <span className="interest-tag">Problem Solving</span>
                                <span className="interest-tag">Open Source</span>
                                <span className="interest-tag">Learning New Tech</span>
                                <span className="interest-tag">Tech Blogs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
