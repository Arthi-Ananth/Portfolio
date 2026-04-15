import { useState, useEffect } from 'react';
import { FaPalette, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import './ThemeSettings.css';

const ThemeSettings = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    const themes = [
        {
            name: 'Ocean Blue',
            primary: '#0ea5e9',
            secondary: '#06b6d4',
            accent: '#14b8a6',
        },
        {
            name: 'Sunset Orange',
            primary: '#f97316',
            secondary: '#fb923c',
            accent: '#fdba74',
        },
        {
            name: 'Forest Green',
            primary: '#10b981',
            secondary: '#34d399',
            accent: '#6ee7b7',
        },
        {
            name: 'Royal Purple',
            primary: '#a855f7',
            secondary: '#c084fc',
            accent: '#e9d5ff',
        },
        {
            name: 'Rose Pink',
            primary: '#ec4899',
            secondary: '#f472b6',
            accent: '#fbcfe8',
        },
    ];

    const applyTheme = (theme) => {
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent', theme.accent);

        localStorage.setItem('selectedTheme', JSON.stringify(theme));
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        }

        localStorage.setItem('darkMode', newMode);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            applyTheme(theme);
        }

        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode !== null) {
            const isDark = savedDarkMode === 'true';
            setIsDarkMode(isDark);
            if (isDark) {
                document.documentElement.classList.add('dark-mode');
            } else {
                document.documentElement.classList.add('light-mode');
            }
        } else {
            document.documentElement.classList.add('dark-mode');
        }
    }, []);

    const handleThemeSelect = (theme) => {
        applyTheme(theme);
        setIsOpen(false);
    };

    return (
        <>
            <div className="theme-controls">
                <button
                    className="dark-mode-toggle"
                    onClick={toggleDarkMode}
                    aria-label="Toggle Dark Mode"
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    {isDarkMode ? <FaSun /> : <FaMoon />}
                </button>

                <button
                    className="theme-toggle-btn"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Theme Settings"
                    title="Change Theme Colors"
                >
                    <FaPalette />
                </button>
            </div>

            {isOpen && (
                <>
                    <div className="theme-overlay" onClick={() => setIsOpen(false)}></div>
                    <div className="theme-panel">
                        <div className="theme-panel-header">
                            <h3>Choose Theme Color</h3>
                            <button className="theme-close-btn" onClick={() => setIsOpen(false)}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="theme-mode-switch">
                            <button
                                className={`mode-btn ${isDarkMode ? 'active' : ''}`}
                                onClick={toggleDarkMode}
                            >
                                <FaMoon /> Dark Mode
                            </button>
                            <button
                                className={`mode-btn ${!isDarkMode ? 'active' : ''}`}
                                onClick={toggleDarkMode}
                            >
                                <FaSun /> Light Mode
                            </button>
                        </div>

                        <div className="theme-list">
                            {themes.map((theme, idx) => (
                                <button
                                    key={idx}
                                    className="theme-option"
                                    onClick={() => handleThemeSelect(theme)}
                                >
                                    <div className="theme-preview">
                                        <span style={{ background: theme.primary }}></span>
                                        <span style={{ background: theme.secondary }}></span>
                                        <span style={{ background: theme.accent }}></span>
                                    </div>
                                    <span className="theme-name">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ThemeSettings;
