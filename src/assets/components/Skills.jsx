import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaPython, FaHtml5, FaCss3Alt, FaJs, FaAngular } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiMysql, SiTailwindcss, SiTypescript, SiPostman } from 'react-icons/si';
import { DiJava } from "react-icons/di";
import './Skills.css';

const Skills = () => {
    const skillCategories = [
        {
            title: 'Frontend',
            skills: [
                { name: 'React', icon: <FaReact />, level: 90 },
                { name: 'Angular', icon: <FaAngular />, level: 75 },
                { name: 'JavaScript', icon: <FaJs />, level: 85 },
                { name: 'TypeScript', icon: <SiTypescript />, level: 80 },
                { name: 'HTML5', icon: <FaHtml5 />, level: 95 },
                { name: 'CSS3', icon: <FaCss3Alt />, level: 90 },
                { name: 'Tailwind', icon: <SiTailwindcss />, level: 85 },
            ],
        },
        {
            title: 'Backend',
            skills: [
                { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
                { name: 'Express', icon: <SiExpress />, level: 80 },
                { name: 'Java', icon: <DiJava />, level: 50 },
                { name: 'REST APIs', icon: <FaDatabase />, level: 85 },
            ],
        },
        {
            title: 'Database & Tools',
            skills: [
                { name: 'MongoDB', icon: <SiMongodb />, level: 80 },
                { name: 'mySQL', icon: <SiMysql />, level: 75 },
                { name: 'Git', icon: <FaGitAlt />, level: 85 },
                { name: 'Postman', icon: <SiPostman />, level: 80 },
            ],
        },
    ];

    return (
        <section className="skills" id="skills">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Skills & Technologies</h2>
                    <p className="section-subtitle">My technical expertise</p>
                </div>

                <div className="skills-grid">
                    {skillCategories.map((category, idx) => (
                        <div key={idx} className="skill-category">
                            <h3 className="category-title">{category.title}</h3>
                            <div className="skills-list">
                                {category.skills.map((skill, skillIdx) => (
                                    <div key={skillIdx} className="skill-item">
                                        <div className="skill-header">
                                            <div className="skill-info">
                                                <span className="skill-icon">{skill.icon}</span>
                                                <span className="skill-name">{skill.name}</span>
                                            </div>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className="skill-progress"
                                                style={{ width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="skills-additional">
                    <div className="additional-card">
                        <h4>Problem Solving</h4>
                        <p>Strong algorithmic thinking and data structures knowledge</p>
                    </div>
                    <div className="additional-card">
                        <h4>Team Collaboration</h4>
                        <p>Experience working in agile teams with version control</p>
                    </div>
                    <div className="additional-card">
                        <h4>Quick Learner</h4>
                        <p>Adaptable to new technologies and frameworks rapidly</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
