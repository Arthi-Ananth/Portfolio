import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="nav-content">
                    <div className="logo">
                        <span className="logo-text">Portfolio</span>
                    </div>

                    <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <a onClick={() => scrollToSection('home')} className="nav-link">Home</a>
                        <a onClick={() => scrollToSection('about')} className="nav-link">About</a>
                        <a onClick={() => scrollToSection('skills')} className="nav-link">Skills</a>
                        <a onClick={() => scrollToSection('projects')} className="nav-link">Projects</a>
                        <a onClick={() => scrollToSection('experience')} className="nav-link">Experience</a>
                        <a onClick={() => scrollToSection('contact')} className="nav-link">Contact</a>
                    </div>

                    <button className="menu-toggle" onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
