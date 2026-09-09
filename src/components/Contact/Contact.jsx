import { useState } from "react";
import "./Contact.css";
import {
  FaPaperPlane,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaAt,
  FaCommentDots,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert("Error: " + (data.message || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Failed to send message. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Contact Me</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Have a project in mind? Let's work together!
          </p>
        </div>

        <div className="contact-content">
          {/* LEFT SIDE - Contact Info */}
          <div className="contact-info-wrapper">
            <div className="contact-info-card">
              <h3>Let's Talk</h3>
              <p className="contact-info-description">
                I'm currently available for freelance work and open to new
                opportunities. Feel free to reach out for collaborations or just
                a friendly chat!
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="detail-icon-wrapper">
                    <FaEnvelope className="detail-icon" />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Email</span>
                    <a
                      href="mailto:bruktsegaye3@gmail.com"
                      className="detail-value"
                    >
                      bruktsegaye3@gmail.com
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-wrapper">
                    <FaPhone className="detail-icon" />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Phone</span>
                    <a href="tel:+251914857491" className="detail-value">
                      +251 91 485 7491
                    </a>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-wrapper">
                    <FaMapMarkerAlt className="detail-icon" />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Location</span>
                    <span className="detail-value">Addis Ababa, Ethiopia</span>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="detail-icon-wrapper">
                    <FaClock className="detail-icon" />
                  </div>
                  <div className="detail-content">
                    <span className="detail-label">Availability</span>
                    <span className="detail-value status-available">
                      Available for Work
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Response Badge */}
              <div className="response-badge">
                <FaCheckCircle className="badge-icon" />
                <span>Usually responds within 24 hours</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon-wrapper">
                    <FaCheckCircle className="success-icon" />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you for reaching out. I'll get back to you as soon as
                    possible.
                  </p>
                  <button
                    className="send-another-btn"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="form-title">Send a Message</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">
                        <FaUser className="input-icon" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">
                        <FaAt className="input-icon" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="subject">
                        <FaCommentDots className="input-icon" />
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="message">
                        <FaPaperPlane className="input-icon" />
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="6"
                        placeholder="Write your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                        <FaArrowRight className="btn-arrow" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-grid"></div>
      </div>
    </section>
  );
};

export default Contact;
