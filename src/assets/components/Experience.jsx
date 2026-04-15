import { FaBriefcase, FaCalendar } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
    const experiences = [
        {
            role: 'Full Stack Developer',
            company: 'BornWhiz Teachnologies',
            period: '2024 - Present',
            description: 'Developing and maintaining web applications using Angular , React, Node.js, and MongoDB. Collaborating with cross-functional teams to deliver high-quality software solutions.',
            achievements: [
                'Built 1+ production-ready web applications',

                'Mentored junior developers in best practices',
                'Participated in code reviews and sprint planning',
            ],
        },
        {
            role: 'Software Development Intern',
            company: 'Virtual Tech Services',
            period: '2024',
            description: 'Assisted in developing frontend components and backend APIs. Gained hands-on experience with modern web technologies and agile development practices.',
            achievements: [
                'Contributed to 2 major project releases',
                'Improved application performance by 40%',
            ],
        },
    ];

    const education = [
        {
            degree: 'Master of Computer Applications (MCA)',
            institution: 'QMGC',
            period: '2022 - 2024',
            details: 'Specialized in Software Engineering and Web Technologies. Completed with distinction.',
            highlights: [
                'GPA: 8.6/10',
                'Major Project: E-Commerce Platform',
                'Research: Modern Web Architectures',
            ],
        },
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'Aries Arts And Science College for Women',
            period: '2018 - 2021',
            details: 'Foundation in computer science fundamentals, programming, and database management.',
            highlights: [
                'GPA: 8.0/10',
            ],
        },
    ];

    return (
        <section className="experience" id="experience">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Experience & Education</h2>
                    <p className="section-subtitle">My professional journey</p>
                </div>

                <div className="experience-content">
                    <div className="timeline-section">
                        <h3 className="timeline-heading">
                            <FaBriefcase /> Work Experience
                        </h3>
                        <div className="timeline">
                            {experiences.map((exp, idx) => (
                                <div key={idx} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card">
                                        <div className="timeline-header">
                                            <div>
                                                <h4 className="timeline-role">{exp.role}</h4>
                                                <p className="timeline-company">{exp.company}</p>
                                            </div>
                                            <span className="timeline-period">
                                                <FaCalendar /> {exp.period}
                                            </span>
                                        </div>
                                        <p className="timeline-description">{exp.description}</p>
                                        <div className="timeline-achievements">
                                            <strong>Key Achievements:</strong>
                                            <ul>
                                                {exp.achievements.map((achievement, achIdx) => (
                                                    <li key={achIdx}>{achievement}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="timeline-section">
                        <h3 className="timeline-heading">
                            <FaBriefcase /> Education
                        </h3>
                        <div className="timeline">
                            {education.map((edu, idx) => (
                                <div key={idx} className="timeline-item">
                                    <div className="timeline-dot"></div>
                                    <div className="timeline-card">
                                        <div className="timeline-header">
                                            <div>
                                                <h4 className="timeline-role">{edu.degree}</h4>
                                                <p className="timeline-company">{edu.institution}</p>
                                            </div>
                                            <span className="timeline-period">
                                                <FaCalendar /> {edu.period}
                                            </span>
                                        </div>
                                        <p className="timeline-description">{edu.details}</p>
                                        <div className="timeline-achievements">
                                            <strong>Highlights:</strong>
                                            <ul>
                                                {edu.highlights.map((highlight, hlIdx) => (
                                                    <li key={hlIdx}>{highlight}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
