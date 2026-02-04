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
            phone: "+51 999 999 999",
            email: "proyectos@meliflu.com",
            address: "Ubicación Privada, Lima",
            whatsapp: "51999999999",
            instagram: "https://instagram.com/meliflu",
            facebook: "https://facebook.com/meliflu"
        }
    };

    // Load from Firebase or use default
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);

    // Cargar contenido desde Firebase al iniciar
    useEffect(() => {
        const loadContent = async () => {
            try {
                const docRef = doc(db, 'website', 'content');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setContent(docSnap.data());
                } else {
                    // Si no existe, crear el documento con valores por defecto
                    await setDoc(docRef, defaultContent);
                }
            } catch (error) {
                console.error('Error cargando contenido:', error);
                // Si hay error, usar localStorage como fallback
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

    // Función manual para guardar cambios
    const saveChanges = async () => {
        try {
            const docRef = doc(db, 'website', 'content');
            await setDoc(docRef, content);
            localStorage.setItem('meliflu_content', JSON.stringify(content));
            return { success: true };
        } catch (error) {
            console.error('Error guardando contenido:', error);
            // Si las imágenes son muy grandes, guardar solo en localStorage
            localStorage.setItem('meliflu_content', JSON.stringify(content));
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
