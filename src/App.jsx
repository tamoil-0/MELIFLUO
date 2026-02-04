import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, CheckCircle, Instagram, Facebook, Mail, Phone, MapPin, ExternalLink, X as CloseIcon } from 'lucide-react';
import './index.css';
import { ContentProvider, useContent } from './context/ContentContext';
import Login from './components/Admin/Login';
import Dashboard from './components/Admin/Dashboard';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#hero' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Servicios', href: '#services' },
    { name: 'Galería', href: '#gallery' },
    { name: 'Contacto', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'rgba(10, 10, 10, 0.5)', backdropFilter: 'blur(10px)', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', padding: scrolled ? '1rem 0' : '2.5rem 0', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="Meliflu" style={{ height: '45px' }} />
          <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '-0.02em' }}>Meliflu<span style={{ color: 'var(--col-accent)' }}>.</span></span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2.5rem' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 500, opacity: 0.9, position: 'relative' }} className="nav-link">{link.name}</a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          style={{ 
            background: 'var(--col-accent)', 
            color: '#0a0a0a', 
            display: 'none', 
            width: '50px', 
            height: '50px', 
            borderRadius: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(198, 168, 124, 0.3)',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }} 
          className="show-mobile"
        >
          {menuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.98)', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <button 
              onClick={() => setMenuOpen(false)} 
              style={{ 
                position: 'absolute', 
                top: '2rem', 
                right: '2rem', 
                background: 'var(--col-accent)', 
                color: '#0a0a0a',
                width: '50px',
                height: '50px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(198, 168, 124, 0.3)'
              }}
            >
              <X size={28} strokeWidth={2.5} />
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center', width: '100%', maxWidth: '400px' }}>
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ 
                    fontSize: '2rem', 
                    fontFamily: 'var(--font-heading)',
                    padding: '1rem',
                    borderBottom: '1px solid rgba(198, 168, 124, 0.2)',
                    transition: 'all 0.3s ease',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--col-accent)';
                    e.target.style.borderBottomColor = 'var(--col-accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.borderBottomColor = 'rgba(198, 168, 124, 0.2)';
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const { content } = useContent();

  // Limpiar número de WhatsApp (solo dígitos)
  const cleanWhatsApp = (number) => {
    return number ? number.replace(/\D/g, '') : '';
  };

  return (
    <section id="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Parallax Background */}
      <motion.div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '120%', zIndex: -1, y }}>
        <img src="/hero.png" alt="Interior Meliflu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--col-bg) 0%, rgba(10,10,10,0.4) 100%)' }}></div>
      </motion.div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ maxWidth: '800px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--col-accent)' }}></div>
            <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Arquitectura Interior</span>
          </div>

          <h1 className="heading-xl" style={{ marginBottom: '2rem', lineHeight: 1.1 }}>
            {content.hero.title}
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--col-text-muted)', marginBottom: '3.5rem', maxWidth: '550px', lineHeight: 1.8 }}>
            {content.hero.subtitle}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }} className="button-group">
            <a href={`https://wa.me/${cleanWhatsApp(content.contact.whatsapp)}?text=Hola,%20me%20interesa%20cotizar%20un%20proyecto`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {content.hero.cta} <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </a>
            <a href="#gallery" onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('gallery');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="btn-outline">Ver Portafolio</a>
          </div>
        </motion.div>
      </div>

      <motion.div style={{ position: 'absolute', bottom: '2rem', left: '50%', x: '-50%', opacity }} animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <div style={{ width: '1px', height: '60px', background: 'linear-gradient(to bottom, var(--col-accent), transparent)' }}></div>
      </motion.div>
    </section>
  );
};

const About = () => {
  const { content } = useContent();
  return (
    <section id="about" className="section" style={{ background: 'var(--col-surface)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', alignItems: 'center' }} className="grid-2-col">
        <div>
          <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>Nosotros</span>
          <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>{content.about.title}</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--col-text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
            {content.about.text1}
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--col-text-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            {content.about.text2}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="stats-grid">
            <div>
              <h4 style={{ fontSize: '3rem', color: 'var(--col-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{content.about.stat1}</h4>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{content.about.stat1Label}</p>
            </div>
            <div>
              <h4 style={{ fontSize: '3rem', color: 'var(--col-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>{content.about.stat2}</h4>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{content.about.stat2Label}</p>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <img src="/hero.png" alt="Nosotros Meliflu" style={{ width: '100%', borderRadius: '4px', filter: 'grayscale(10%) contrast(110%)' }} />
          </motion.div>
          <div style={{ position: 'absolute', top: '-2rem', right: '-2rem', width: '100%', height: '100%', border: '1px solid var(--col-accent)', zIndex: 1, opacity: 0.3 }} className="hidden-mobile"></div>
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ isOpen, onClose, service }) => {
  const { content } = useContent();
  const cleanWhatsApp = (number) => number ? number.replace(/\D/g, '') : '';
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)' }}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ background: 'var(--col-surface)', padding: '3rem', maxWidth: '600px', width: '100%', position: 'relative', borderRadius: '4px', border: '1px solid #333', maxHeight: '90vh', overflowY: 'auto' }}
        className="modal-content"
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', color: 'white' }}><CloseIcon /></button>
        <span style={{ color: 'var(--col-accent)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Detalles del Servicio</span>
        <h3 className="heading-lg" style={{ margin: '1rem 0 2rem' }}>{service.title}</h3>
        <img src={service.img} alt={service.title} style={{ width: '100%', height: '300px', objectFit: 'cover', marginBottom: '2rem', borderRadius: '4px' }} />
        <p style={{ color: 'var(--col-text-muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>{service.desc}</p>
        <ul style={{ marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {["Asesoría personalizada en diseño y materiales", "Render 3D previo a fabricación", "Instalación profesional incluida", "Garantía de acabados y durabilidad"].map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#ccc' }}>
              <CheckCircle size={16} color="var(--col-accent)" /> {item}
            </li>
          ))}
        </ul>
        <a href={`https://wa.me/${cleanWhatsApp(content.contact.whatsapp)}?text=Hola,%20me%20interesa%20más%20información%20sobre%20${encodeURIComponent(service.title)}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
          Consultar Disponibilidad
        </a>
      </motion.div>
    </div>
  );
};

const ServiceCard = ({ number, title, desc, img, align = 'left', onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}
      className="services-grid"
    >
      <div style={{ order: align === 'right' ? 2 : 1 }}>
        <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', height: '400px' }}>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            src={img}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '2rem', left: '-2rem', background: 'var(--col-surface)', padding: '2rem', borderLeft: '4px solid var(--col-accent)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', maxWidth: '250px' }} className="hidden-mobile">
            <span style={{ fontSize: '4rem', fontFamily: 'var(--font-heading)', color: 'rgba(255,255,255,0.1)', position: 'absolute', top: '-1rem', right: '1rem', lineHeight: 1 }}>{number}</span>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Elegancia</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--col-text-muted)' }}>Acabados premium.</p>
          </div>
        </div>
      </div>

      <div style={{ order: align === 'right' ? 1 : 2, padding: '0 1rem' }}>
        <span style={{ color: 'var(--col-accent)', fontSize: '4rem', fontFamily: 'var(--font-heading)', opacity: 0.5, lineHeight: 1, display: 'block', marginBottom: '1rem' }}>{number}</span>
        <h3 className="heading-lg" style={{ marginBottom: '1.5rem' }}>{title}</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--col-text-muted)', marginBottom: '2rem', maxWidth: '450px' }}>{desc}</p>
        <button onClick={onOpen} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--col-accent)', borderBottom: '1px solid var(--col-accent)', paddingBottom: '4px', background: 'transparent', fontSize: '1rem' }}>
          VER DETALLES <ExternalLink size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const { content } = useContent();

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          style={{ textAlign: 'center', marginBottom: '8rem' }}
        >
          <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Nuestras Especialidades</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem' }}>Espacios Curados</h2>
        </motion.div>

        {content.services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            align={index % 2 !== 0 ? 'right' : 'left'}
            onOpen={() => setSelectedService(service)}
          />
        ))}
      </div>
      <AnimatePresence>
        {selectedService && <ServiceModal isOpen={!!selectedService} onClose={() => setSelectedService(null)} service={selectedService} />}
      </AnimatePresence>
    </section>
  );
};

const Gallery = () => {
  const { content } = useContent();
  return (
    <section id="gallery" className="section" style={{ background: '#080808' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Portafolio</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem' }}>Detalles que Hablan</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }} className="gallery-grid">
          {content.gallery.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, opacity: 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ height: '300px', overflow: 'hidden', borderRadius: '4px', cursor: 'pointer' }}
            >
              <img src={img} alt={`Proyecto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline">Ver Más en Instagram</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { content } = useContent();
  const cleanWhatsApp = (number) => number ? number.replace(/\D/g, '') : '';
  return (
    <footer id="contact" style={{ background: '#050505', padding: '8rem 0 3rem', borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '5rem', marginBottom: '6rem' }} className="contact-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
              <img src="/logo.png" alt="Meliflu" style={{ height: '35px' }} />
              <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Meliflu.</span>
            </div>
            <p style={{ color: 'var(--col-text-muted)', fontSize: '1.1rem', maxWidth: '300px' }}>
              Elevando el estándar del diseño interior y la carpintería moderna.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem' }}>Contacto Directo</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--col-text-muted)' }}>
              <a href={`https://wa.me/${cleanWhatsApp(content.contact.whatsapp)}?text=Hola,%20me%20gustaría%20más%20información`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><Phone size={20} color="var(--col-accent)" /></div>
                {content.contact.phone}
              </a>
              <a href={`mailto:${content.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><Mail size={20} color="var(--col-accent)" /></div>
                {content.contact.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><MapPin size={20} color="var(--col-accent)" /></div>
                {content.contact.address}
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem' }}>Social</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '50px', height: '50px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}>
                <Instagram size={22} />
              </a>
              <a href={content.contact.facebook} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: '50px', height: '50px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}>
                <Facebook size={22} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '3rem', textAlign: 'center', color: '#444', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }} className="footer-content">
          <span>&copy; {new Date().getFullYear()} Meliflu Design Studio.</span>
          <span style={{ opacity: 0.5 }}>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
};

// --- Landing Page ---
const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ContentProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </ContentProvider>
    </Router>
  );
}

export default App;
