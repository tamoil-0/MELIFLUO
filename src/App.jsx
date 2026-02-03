import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, CheckCircle, Instagram, Facebook, Mail, Phone, MapPin, ExternalLink, X as CloseIcon } from 'lucide-react';
import './index.css';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`} style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none', padding: scrolled ? '1rem 0' : '2.5rem 0', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
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
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', color: 'white', display: 'none' }} className="show-mobile">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.98)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)' }}
                >
                  {link.name}
                </motion.a>
              ))}
              <button onClick={() => setMenuOpen(false)} style={{ marginTop: '2rem', background: 'none', color: 'var(--col-text-muted)' }}><X size={40} /></button>
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
            Diseño que <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--col-accent)' }}>inspira</span>,<br />
            espacios que <span style={{ fontStyle: 'italic', fontFamily: 'var(--font-heading)', fontWeight: 400, color: 'var(--col-text-main)' }}>perduran.</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--col-text-muted)', marginBottom: '3.5rem', maxWidth: '550px', lineHeight: 1.8 }}>
            Transformamos melamina y madera en piezas de arte funcional. Especialistas en optimización de espacios residenciales y comerciales.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="https://wa.me/51999999999" target="_blank" className="btn-primary">
              Cotizar Proyecto <ArrowRight size={18} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
            </a>
            <a href="#gallery" onClick={(e) => {
              e.preventDefault();
              document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
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
  return (
    <section id="about" className="section" style={{ background: 'var(--col-surface)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
        <div>
          <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>Nosotros</span>
          <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>Minimalismo y <br /> <span style={{ color: 'var(--col-accent)' }}>Funcionalidad.</span></h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--col-text-muted)', marginBottom: '1.5rem', lineHeight: 1.8 }}>
            MELIFLUO es una empresa dedicada al diseño, fabricación e instalación de muebles a medida, enfocada en hogares y negocios que buscan trascender lo común. Nuestra filosofía se basa en crear <strong>muebles funcionales, modernos y bien hechos</strong>, adaptados milimétricamente al espacio de cada cliente.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--col-text-muted)', marginBottom: '2.5rem', lineHeight: 1.8 }}>
            No hacemos carpintería antigua; hacemos carpintería moderna. Tu espacio fluye mejor con muebles hechos para ti. Ya sea que estés remodelando tu casa o optimizando un negocio, creamos soluciones que equilibran la estética limpia con la utilidad diaria.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h4 style={{ fontSize: '3rem', color: 'var(--col-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>+500</h4>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Proyectos Ejecutados</p>
            </div>
            <div>
              <h4 style={{ fontSize: '3rem', color: 'var(--col-accent)', fontFamily: 'var(--font-heading)', lineHeight: 1 }}>100%</h4>
              <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Personalizado</p>
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
          <div style={{ position: 'absolute', top: '-2rem', right: '-2rem', width: '100%', height: '100%', border: '1px solid var(--col-accent)', zIndex: 1, opacity: 0.3 }}></div>
        </div>
      </div>
    </section>
  );
};

const ServiceModal = ({ isOpen, onClose, service }) => {
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
        <a href="https://wa.me/51999999999?text=Hola,%20me%20interesa%20más%20información%20sobre%20sus%20servicios" target="_blank" className="btn-primary" style={{ width: '100%', textAlign: 'center' }}>
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
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}
    >
      <div style={{ order: align === 'right' ? 2 : 1 }}>
        <div style={{ overflow: 'hidden', borderRadius: '4px', position: 'relative', height: '500px' }}>
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

      <div style={{ order: align === 'right' ? 1 : 2, padding: '0 2rem' }}>
        <span style={{ color: 'var(--col-accent)', fontSize: '5rem', fontFamily: 'var(--font-heading)', opacity: 0.5, lineHeight: 1, display: 'block', marginBottom: '1rem' }}>{number}</span>
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

  const servicesList = [
    { number: "01", title: "Cocinas Modernas", desc: "El corazón del hogar reinventado. Diseños minimalistas con sistemas de almacenamiento inteligente.", img: "/kitchen.jpg" },
    { number: "02", title: "Closets & Walk-in", desc: "Organización de lujo. Vestidores diseñados a medida con iluminación LED integrada.", img: "/closet.jpg" },
    { number: "03", title: "Home Office", desc: "Productividad y confort. Espacios de trabajo ergonómicos que se integran armoniosamente.", img: "/office.jpg" },
    { number: "04", title: "Centros de TV", desc: "Entretenimiento con estilo. Paneles decorativos, listones de madera y muebles flotantes.", img: "/tv-unit.jpg" }
  ];

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

        {servicesList.map((service, index) => (
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
  return (
    <section id="gallery" className="section" style={{ background: '#080808' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <span style={{ color: 'var(--col-accent)', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.9rem' }}>Portafolio</span>
          <h2 className="heading-lg" style={{ marginTop: '1rem' }}>Detalles que Hablan</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {["/detail1.jpg", "/detail2.jpg", "/detail3.jpg", "/detail4.jpg", "/kitchen.jpg", "/closet.jpg"].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02, opacity: 0.8 }}
              transition={{ duration: 0.4 }}
              style={{ height: '350px', overflow: 'hidden', borderRadius: '4px', cursor: 'pointer' }}
            >
              <img src={img} alt={`Proyecto ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a href="https://wa.me/51999999999" target="_blank" className="btn-outline">Ver Más en Instagram</a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" style={{ background: '#050505', padding: '8rem 0 3rem', borderTop: '1px solid #1a1a1a' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', marginBottom: '6rem' }}>
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
              <a href="https://wa.me/51999999999" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><Phone size={20} color="var(--col-accent)" /></div>
                +51 999 999 999
              </a>
              <a href="mailto:proyectos@meliflu.com" style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'inherit' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><Mail size={20} color="var(--col-accent)" /></div>
                proyectos@meliflu.com
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ background: 'var(--col-surface)', padding: '10px', borderRadius: '50%' }}><MapPin size={20} color="var(--col-accent)" /></div>
                Ubicación Privada, Lima
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.2rem' }}>Social</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" className="social-link" style={{ width: '50px', height: '50px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}>
                <Instagram size={22} />
              </a>
              <a href="#" className="social-link" style={{ width: '50px', height: '50px', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'white', transition: 'all 0.3s' }}>
                <Facebook size={22} />
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '3rem', textAlign: 'center', color: '#444', fontSize: '0.9rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <span>&copy; {new Date().getFullYear()} Meliflu Design Studio.</span>
          <span style={{ opacity: 0.5 }}>Designed with precision.</span>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
