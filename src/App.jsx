import React, { useState, useEffect } from 'react';
import AdminMessages from './AdminMessages';
import { Menu, X, ArrowRight, Code2, Zap, Globe } from 'lucide-react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ['About', 'Work', 'Services', 'Insights'];
  const technicalSkills = [
    { title: 'Frontend Framework', skills: ['React', 'Vue.js', 'TypeScript'] },
    { title: 'Full-Stack Tools', skills: ['Node.js', 'Python', 'Express'] },
    { title: 'Data & Database', skills: ['PostgreSQL', 'MongoDB', 'Redis'] },
    { title: 'Cloud Services', skills: ['AWS', 'Docker', 'Kubernetes'] },
    { title: 'DevOps & Tools', skills: ['CI/CD', 'Git', 'Linux'] },
    { title: 'Design Systems', skills: ['Figma', 'UI/UX', 'A11y'] }
  ];

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [contactStatus, setContactStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(response => response.json())
      .then(data => {
        const formattedProjects = data.map(project => ({
          title: project.title,
          desc: project.description,
          imageUrl: project.imageUrl,
          tech: project.technologies
            ? project.technologies.split(',').map(item => item.trim())
            : [],
          status: project.status ? `• ${project.status}` : '• Live'
        }));

        setProjects(formattedProjects);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);
  // ADMIN PAGE
  if (window.location.pathname === '/admin-messages') {
    return <AdminMessages />;
  }

  const journey = [
    {
      title: 'Started B.E. Computer Science & Engineering',
      desc: 'Began my engineering journey at a leading institution',
      year: '2021'
    },
    {
      title: 'Focused on Engineering Fundamentals & Web Dev',
      desc: 'Discovered passion for building web applications and solving problems',
      year: '2022'
    },
    {
      title: 'Building Practical-level based Projects & Architecture',
      desc: 'Started creating real-world projects with proper system design',
      year: '2023'
    },
    {
      title: 'Specialized in Cloud Systems & Scalable Architectures',
      desc: 'Deep dive into cloud infrastructure, microservices, and distributed systems',
      year: '2024'
    }
  ];

  const learning = [
    {
      title: 'Advanced React & State Management',
      desc: 'Mastered React patterns, Redux, and Context API'
    },
    {
      title: 'Full-Stack Web Development',
      desc: 'End-to-end application development with modern stacks'
    },
    {
      title: 'System Design & Architecture',
      desc: 'Building scalable, maintainable systems and microservices'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Thiruppathi
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-cyan-400"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex gap-8 items-center">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-6 py-2 rounded-lg font-semibold text-sm transition-all"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-slate-300 hover:text-cyan-400"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen pt-24 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-20 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                <span className="text-cyan-400 text-sm font-semibold">Full-Stack Developer</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Building{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                  Digital Experiences
                </span>
                {' '}That Actually Work.
              </h1>

              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-md">
                I craft scalable web applications with modern technologies. Transforming ideas into responsive, high-performance digital solutions.
              </p>

              <div className="flex gap-4 flex-wrap">
                <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-slate-950 px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
                  View My Work
                  <ArrowRight size={18} />
                </button>
                <button className="border border-slate-500 hover:border-cyan-400 text-slate-300 hover:text-cyan-400 px-8 py-3 rounded-lg font-semibold transition-all">
                  Download CV
                </button>
              </div>

              <div className="mt-12 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-cyan-400">20+</div>
                  <div className="text-slate-400 text-sm">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">3+</div>
                  <div className="text-slate-400 text-sm">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cyan-400">100%</div>
                  <div className="text-slate-400 text-sm">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Animated Elements */}
            <div className="relative h-96 hidden md:block">
              <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/20 rounded-lg border border-cyan-500/30 animate-pulse"></div>
              <div className="absolute bottom-20 left-10 w-40 h-40 bg-pink-500/20 rounded-full border border-pink-500/30 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-40 left-1/2 w-24 h-24 bg-blue-500/20 rounded-lg border border-blue-500/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Arsenal */}
      <section className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Technical Arsenal</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            A comprehensive toolkit of technologies and frameworks I've mastered to build robust, scalable applications.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skill, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg">{skill.title}</h3>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <Code2 size={20} className="text-cyan-400" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map((s, i) => (
                    <span key={i} className="text-xs bg-slate-700/50 text-cyan-300 px-3 py-1 rounded-full">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Than Just Code */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">More Than Just Code.</h2>
              <p className="text-slate-300 mb-6 leading-relaxed">
                I believe in creating digital products that solve real problems. Every line of code is written with purpose, every design decision backed by user research and best practices.
              </p>
              <p className="text-slate-300 leading-relaxed">
                From concept to deployment, I ensure that applications are not just functional, but delightful to use. I stay current with industry trends and continuously evolve my skillset.
              </p>
              <button className="mt-8 text-cyan-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                Learn More <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-12 border border-slate-700 flex items-center justify-center h-96">
              <div className="text-center">
                <Zap size={64} className="text-cyan-400 mx-auto mb-4 opacity-80" />
                <p className="text-slate-400">Innovative Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Things I've Built */}
      <section id="work" className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Things I've Built</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            A selection of projects that showcase my ability to create elegant solutions to complex problems.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
              >
                {project.imageUrl && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-slate-700">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <ArrowRight size={20} className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
                </div>
                <p className="text-slate-300 mb-6">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="text-cyan-400 text-sm font-semibold">{project.status}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Journey */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12">My Journey</h2>

          <div className="relative">
            {journey.map((item, idx) => (
              <div key={idx} className="mb-12 flex gap-6 md:gap-12">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mt-1.5"></div>
                  {idx !== journey.length - 1 && (
                    <div className="w-0.5 h-24 bg-gradient-to-b from-cyan-400/50 to-transparent mt-4"></div>
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-sm text-cyan-400 font-semibold">{item.year}</div>
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                  <p className="text-slate-400 mt-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Learning Beyond the Classroom */}
      <section id="insights" className="py-20 bg-slate-900/50 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4">Learning Beyond the Classroom</h2>
          <p className="text-slate-400 mb-12 max-w-2xl">
            Continuous learning and self-development are at the core of my professional growth.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {learning.map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <Globe size={24} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Work Together */}
      <section id="contact" className="py-20 relative">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-30"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">LET'S WORK</span><br />
            <span className="text-slate-500">TOGETHER</span>
          </h2>

          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto">
            Ready to turn your ideas into reality? Let's collaborate and create something extraordinary together.
          </p>

          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 border border-slate-700">
            <form
              className="space-y-6"
              onSubmit={async (event) => {
                event.preventDefault();

                setIsSubmitting(true);
                setContactStatus('');

                try {
                  const response = await fetch(`${API_BASE_URL}/api/contact`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactForm)
                  });

                  if (!response.ok) {
                    throw new Error('Failed to send message');
                  }

                  setContactStatus('Message sent successfully!');

                  setContactForm({
                    name: '',
                    email: '',
                    message: ''
                  });

                } catch (error) {
                  console.error('Error sending message:', error);
                  setContactStatus('Something went wrong. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {/* NAME */}
              <input
                type="text"
                placeholder="Your Name"
                required
                value={contactForm.name}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    name: event.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Your Email"
                required
                value={contactForm.email}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    email: event.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />

              {/* MESSAGE */}
              <textarea
                placeholder="Tell me about your project"
                rows="5"
                required
                value={contactForm.message}
                onChange={(event) =>
                  setContactForm({
                    ...contactForm,
                    message: event.target.value
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-6 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none"
              />

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 text-slate-950 py-3 rounded-lg font-semibold transition-all"
              >
                {isSubmitting ? 'SENDING...' : 'GET IN TOUCH'}
              </button>

              {/* STATUS MESSAGE */}
              {contactStatus && (
                <p className="text-cyan-400 text-sm text-center">
                  {contactStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Thiruppathi
              </div>
              <p className="text-slate-400 text-sm">Full-Stack Developer</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">About</a></li>
                <li><a href="#work" className="hover:text-cyan-400 transition-colors">Work</a></li>
                <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a></li>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub</a></li>
                <li><a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-slate-400 text-sm">hello@thiruppathi.dev</p>
              <p className="text-slate-400 text-sm">+91 XXXX XXXXX</p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-sm">© 2024 Thiruppathi. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-slate-500">
              <a href="/privacy" className="hover:text-cyan-400 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-cyan-400 transition-colors">Terms</a>
              <a href="/sitemap" className="hover:text-cyan-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
