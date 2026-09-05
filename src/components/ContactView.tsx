import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { personalData } from '../data/portfolioData';

interface FormData {
  name: string;
  email: string;
  organization: string;
  projectType: string;
  timeline: string;
  message: string;
}

export const ContactView: React.FC<{ onBackToPortfolio: () => void }> = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    projectType: 'Full-Stack Web App',
    timeline: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Send via FormSubmit or mailto fallback
      const res = await fetch(`https://formsubmit.co/ajax/${personalData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Organization: formData.organization || 'Not provided',
          'Project Type': formData.projectType,
          Timeline: formData.timeline || 'Flexible',
          Message: formData.message,
          _subject: `New Portfolio Enquiry from ${formData.name}`,
        }),
      });

      if (!res.ok) {
        throw new Error('Dispatch failed');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        organization: '',
        projectType: 'Full-Stack Web App',
        timeline: '',
        message: '',
      });
    } catch {
      // Fallback: If external API fails, open user's email client
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nType: ${formData.projectType}\nTimeline: ${formData.timeline}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:${personalData.email}?subject=${subject}&body=${body}`;
      setStatus('success');
    }
  };

  return (
    <div className="contact-page">
      <section className="contact-intro">
        <div className="contact-intro-title">
          <p className="dossier-marker">06 — START A CONVERSATION</p>
          <h1>
            Let’s build <br />
            <i>something durable.</i>
          </h1>
        </div>
        <p className="contact-intro-desc">
          Whether you have an internship opportunity, a project proposal, or want to discuss systems architecture, dispatch a message below.
        </p>
      </section>

      <section className="contact-layout">
        <aside className="contact-aside">
          <p className="dossier-marker">DIRECT LINE</p>
          <div className="aside-group">
            <a href={`mailto:${personalData.email}`} className="aside-link">
              <Icon icon="lucide:mail" width={16} height={16} />
              <span>{personalData.email}</span>
            </a>
            <p className="aside-info">
              <Icon icon="lucide:map-pin" width={15} height={15} />
              <span>{personalData.location}</span>
            </p>
            <p className="aside-info">
              <Icon icon="lucide:check-circle-2" width={15} height={15} className="status-green" />
              <span>{personalData.availability}</span>
            </p>
            <p className="aside-info">
              <Icon icon="lucide:clock" width={15} height={15} />
              <span>Standard response time: 24–48 hours</span>
            </p>
          </div>

          <div className="aside-footnote">
            <p>
              Available for software engineering internships, technical collaborations, and select freelance system builds.
            </p>
          </div>
        </aside>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label className="form-field">
              <span>Your Name *</span>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Rivera"
              />
            </label>

            <label className="form-field">
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
              />
            </label>

            <label className="form-field">
              <span>Company / Institution <em className="optional-tag">optional</em></span>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="Company, university, or lab"
              />
            </label>

            <label className="form-field">
              <span>Project Type / Scope</span>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="form-select"
              >
                <option value="Full-Stack Web App">Full-Stack Web Application</option>
                <option value="Mobile Application">Mobile Application (Flutter/Dart)</option>
                <option value="Internship / Role">Internship / Junior Engineering Role</option>
                <option value="System Architecture">System Architecture &amp; Database</option>
                <option value="General Collaboration">General Inquiries &amp; Collaboration</option>
              </select>
            </label>
          </div>

          <label className="form-field">
            <span>Estimated Timeline <em className="optional-tag">optional</em></span>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g. Q2 2026, Immediate start, 3 months"
            />
          </label>

          <label className="form-field">
            <span>Project Scope &amp; Details *</span>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about what you are looking to build, technical requirements, goals, or role details..."
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="send-button"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span>DISPATCHING...</span>
              ) : status === 'success' ? (
                <>
                  <Icon icon="lucide:check" width={16} height={16} />
                  <span>TRANSMISSION SENT</span>
                </>
              ) : (
                <>
                  <Icon icon="lucide:send" width={15} height={15} />
                  <span>DISPATCH ENQUIRY</span>
                </>
              )}
            </button>

            {status === 'success' && (
              <p className="form-status success" role="alert">
                ✓ Message successfully recorded. Thank you for reaching out!
              </p>
            )}

            {status === 'error' && (
              <p className="form-status error" role="alert">
                Transmission error. Please dispatch directly to {personalData.email}.
              </p>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

