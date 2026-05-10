import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const response = await fetch('https://portfolio-uaft.onrender.com/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                setResult({ success: true, message: 'Thank you for your message! I will get back to you soon.' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                // If the backend sent specific details (like "Check App Password"), show them
                setResult({
                    success: false,
                    message: data.details || data.message || 'Something went wrong. Please try again later.'
                });
            }
        } catch (error) {
            setResult({ success: false, message: 'Could not connect to the mail server. Make sure it is running.' });
        }
        setLoading(false);
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Let's work together on your next project</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3 className="contact-heading">Let's Talk</h3>
                        <p className="contact-description">
                            I'm currently available for freelance work and full-time opportunities.
                            If you have a project you want to get started, think you need my help
                            with something or just fancy saying hey, then get in touch.
                        </p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:arthiananth1101@gmail.com">arthiananth1101@gmail.com</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaPhone />
                                </div>
                                <div>
                                    <h4>Phone</h4>
                                    <a href="tel:+1234567890">+91 86103 28781</a>
                                </div>
                            </div>

                            <div className="contact-item">
                                <div className="contact-icon">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4>Location</h4>
                                    <p>Chennai, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-social">
                            <h4>Follow Me</h4>
                            <div className="social-icons">
                                <a href="https://github.com/Arthi-Ananth" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaGithub />
                                </a>
                                <a href="https://www.linkedin.com/in/arthi-a-577b63251/" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaLinkedin />
                                </a>
                                <a href="mailto:arthiananth1101@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                                    <FaEnvelope />
                                </a>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="xxxxx@example.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder="Project Inquiry"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                        </button>
                        {result && (
                            <div className={`form-result ${result.success ? 'success' : 'error'}`} style={{ marginTop: '1rem' }}>
                                {result.message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section >
    );
};

export default Contact;
