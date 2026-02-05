import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
    // Initial default state (mirrors the hardcoded content)
    const defaultContent = {
        hero: {
            title: "Diseño que inspira, espacios que perduran.",
            subtitle: "Transformamos melamina y madera en piezas de arte funcional. Especialistas en optimización de espacios residenciales y comerciales.",
            cta: "Cotizar Proyecto"
        },
        about: {
            title: "Minimalismo y Funcionalidad.",
            text1: "MELIFLUO es una empresa dedicada al diseño, fabricación e instalación de muebles a medida, enfocada en hogares y negocios que buscan trascender lo común. Nuestra filosofía se basa en crear muebles funcionales, modernos y bien hechos, adaptados milimétricamente al espacio de cada cliente.",
            text2: "No hacemos carpintería antigua; hacemos carpintería moderna. Tu espacio fluye mejor con muebles hechos para ti. Ya sea que estés remodelando tu casa o optimizando un negocio, creamos soluciones que equilibran la estética limpia con la utilidad diaria.",
            stat1: "+500",
            stat1Label: "Proyectos Ejecutados",
            stat2: "100%",
            stat2Label: "Personalizado"
        },
        services: [
            { id: 1, number: "01", title: "Cocinas Modernas", desc: "El corazón del hogar reinventado. Diseños minimalistas con sistemas de almacenamiento inteligente.", img: "/kitchen.jpg" },
            { id: 2, number: "02", title: "Closets & Walk-in", desc: "Organización de lujo. Vestidores diseñados a medida con iluminación LED integrada.", img: "/closet.jpg" },
            { id: 3, number: "03", title: "Home Office", desc: "Productividad y confort. Espacios de trabajo ergonómicos que se integran armoniosamente.", img: "/office.jpg" },
            { id: 4, number: "04", title: "Centros de TV", desc: "Entretenimiento con estilo. Paneles decorativos, listones de madera y muebles flotantes.", img: "/tv-unit.jpg" }
        ],
        gallery: [
            "/detail1.jpg", "/detail2.jpg", "/detail3.jpg", "/detail4.jpg", "/kitchen.jpg", "/closet.jpg"
        ],
        contact: {
            phone: "+51 962 147 179",
            email: "proyectos@meliflu.com",
            address: "Ubicación Privada, Lima",
            whatsapp: "51962147179",
            instagram: "https://www.instagram.com/melifluo225/",
            facebook: "https://www.facebook.com/david.daviddavid.104855"
        }
    };

    // Load from Firebase or use default
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);

    // Cargar contenido desde Firebase al iniciar
    useEffect(() => {
        const loadContent = async () => {
            try {
                // Cargar cada sección por separado
                const heroRef = doc(db, 'website', 'hero');
                const aboutRef = doc(db, 'website', 'about');
                const servicesRef = doc(db, 'website', 'services');
                const galleryRef = doc(db, 'website', 'gallery');
                const contactRef = doc(db, 'website', 'contact');
                
                const [heroSnap, aboutSnap, servicesSnap, gallerySnap, contactSnap] = await Promise.all([
                    getDoc(heroRef),
                    getDoc(aboutRef),
                    getDoc(servicesRef),
                    getDoc(galleryRef),
                    getDoc(contactRef)
                ]);
                
                const loadedContent = {
                    hero: heroSnap.exists() ? heroSnap.data() : defaultContent.hero,
                    about: aboutSnap.exists() ? aboutSnap.data() : defaultContent.about,
                    services: servicesSnap.exists() ? servicesSnap.data().items : defaultContent.services,
                    gallery: gallerySnap.exists() ? gallerySnap.data().items : defaultContent.gallery,
                    contact: contactSnap.exists() ? contactSnap.data() : defaultContent.contact
                };
                
                setContent(loadedContent);
            } catch (error) {
                console.error('Error cargando contenido:', error);
                const saved = localStorage.getItem('meliflu_content');
                if (saved) {
                    setContent(JSON.parse(saved));
                }
            } finally {
                setLoading(false);
            }
        };
        
        loadContent();
    }, []);

    // Función manual para guardar cambios por sección
    const saveChanges = async (section = 'all') => {
        try {
            localStorage.setItem('meliflu_content', JSON.stringify(content));
            
            if (section === 'all') {
                // Guardar todo (para compatibilidad)
                await Promise.all([
                    setDoc(doc(db, 'website', 'hero'), content.hero),
                    setDoc(doc(db, 'website', 'about'), content.about),
                    setDoc(doc(db, 'website', 'services'), { items: content.services }),
                    setDoc(doc(db, 'website', 'gallery'), { items: content.gallery }),
                    setDoc(doc(db, 'website', 'contact'), content.contact)
                ]);
            } else if (section === 'hero') {
                await setDoc(doc(db, 'website', 'hero'), content.hero);
            } else if (section === 'about') {
                await setDoc(doc(db, 'website', 'about'), content.about);
            } else if (section === 'services') {
                await setDoc(doc(db, 'website', 'services'), { items: content.services });
            } else if (section === 'gallery') {
                await setDoc(doc(db, 'website', 'gallery'), { items: content.gallery });
            } else if (section === 'contact') {
                await setDoc(doc(db, 'website', 'contact'), content.contact);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Error guardando contenido:', error);
            return { success: false, error: error.message };
        }
    };

    const updateSection = (section, data) => {
        setContent(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };

    const updateService = (index, data) => {
        const newServices = [...content.services];
        newServices[index] = { ...newServices[index], ...data };
        setContent(prev => ({ ...prev, services: newServices }));
    };

    const addService = () => {
        const newService = {
            id: Date.now(),
            number: String(content.services.length + 1).padStart(2, '0'),
            title: "Nuevo Servicio",
            desc: "Descripción del servicio",
            img: ""
        };
        setContent(prev => ({ ...prev, services: [...prev.services, newService] }));
    };

    const deleteService = (index) => {
        const newServices = content.services.filter((_, i) => i !== index);
        // Renumerar los servicios
        const renumbered = newServices.map((service, i) => ({
            ...service,
            number: String(i + 1).padStart(2, '0')
        }));
        setContent(prev => ({ ...prev, services: renumbered }));
    };

    const updateGallery = (newGallery) => {
        setContent(prev => ({ ...prev, gallery: newGallery }));
    };

    const addGalleryImage = (imageUrl) => {
        setContent(prev => ({ ...prev, gallery: [...prev.gallery, imageUrl] }));
    };

    const deleteGalleryImage = (index) => {
        setContent(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
    };

    return (
        <ContentContext.Provider value={{ content, updateSection, updateService, addService, deleteService, updateGallery, addGalleryImage, deleteGalleryImage, saveChanges }}>
            {children}
        </ContentContext.Provider>
    );
};
