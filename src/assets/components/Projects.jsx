import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import financeImg from '../projects/finance.png';
import knowledgeImg from '../projects/knowledge.png';
import studentImg from '../projects/student.png';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'Finance Dashboard UI',
            description: 'A modern financial analytics dashboard that visualizes income, expenses, and key financial metrics through interactive charts and widgets. Designed with a clean and responsive interface to provide insights into financial data trends.',
            tags: ['JavaScript', 'Chart.js', 'HTML', 'CSS'],
            image: financeImg,
            github: 'https://github.com/Arthi-Ananth/Finance-Dashboard-UI-',
            demo: 'https://arthi-ananth.github.io/Finance-Dashboard-UI-/',
        },
        {
            title: 'KnowledgeNexus Platform',
            description: 'A centralized knowledge-sharing platform that allows users to create, manage, and explore structured content. Focuses on improving information accessibility with a user-friendly interface and organized content flow.',
            tags: ['JavaScript', 'HTML', 'CSS'],
            image: knowledgeImg,
            github: 'https://github.com/Arthi-Ananth/KnowledgeNexus',
            demo: 'https://arthi-ananth.github.io/KnowledgeNexus/',
        },
        {
            title: 'Student Management System',
            description: 'A full-stack responsive web interface for managing student records, course information, and administrative operations. Integrated with a Node.js/Express backend and MongoDB for real-time data handling and persistence.',
            tags: ['React', 'Node.js', 'Express', 'MongoDB'],
            image: studentImg,
            github: 'https://github.com/Arthi-Ananth/student-management-frontend',
            demo: 'https://arthi-ananth.github.io/student-management-frontend/#/',
        },
    ];

    return (
        <section className="projects" id="projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Featured Projects</h2>
                    <p className="section-subtitle">Some of my recent work</p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, idx) => (
                        <div key={idx} className="project-card">
                            <div className="project-image">
                                <img src={project.image} alt={project.title} />
                                <div className="project-overlay">
                                    <div className="project-links">
                                        <a href={project.github} className="project-link" target="_blank" rel="noopener noreferrer">
                                            <FaGithub />
                                        </a>
                                        <a href={project.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tags">
                                    {project.tags.map((tag, tagIdx) => (
                                        <span key={tagIdx} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
