import React, { useState, useEffect } from 'react';
import { useContent } from '../../context/ContentContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Layout, Type, Image as ImageIcon, Briefcase, Phone, Plus, Trash2, Upload } from 'lucide-react';

const Dashboard = () => {
    const { content, updateSection, updateService, addService, deleteService, updateGallery, addGalleryImage, deleteGalleryImage, saveChanges } = useContent();
    const [activeTab, setActiveTab] = useState('hero');
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('meliflu_auth')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('meliflu_auth');
        navigate('/');
    };

    const handleSave = async () => {
        setSaving(true);
        setSaveMessage('');
        
        const result = await saveChanges();
        
        if (result.success) {
            setSaveMessage('✓ Cambios guardados correctamente');
        } else {
            setSaveMessage('⚠ Cambios guardados localmente. Imágenes muy grandes para Firebase.');
        }
        
        setSaving(false);
        setTimeout(() => setSaveMessage(''), 3000);
    };

    // Función para convertir y comprimir imagen a base64
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    // Redimensionar si es muy grande
                    const maxDimension = 1200;
                    if (width > maxDimension || height > maxDimension) {
                        if (width > height) {
                            height = (height / width) * maxDimension;
                            width = maxDimension;
                        } else {
                            width = (width / height) * maxDimension;
                            height = maxDimension;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    // Comprimir a JPEG con 70% de calidad
                    resolve(canvas.toDataURL('image/jpeg', 0.7));
                };
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // Manejar carga de imagen para servicios
    const handleServiceImageUpload = async (index, e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10000000) { // 10MB máximo antes de comprimir
                alert('La imagen es demasiado grande. Máximo 10MB.');
                return;
            }
            const base64 = await convertToBase64(file);
            updateService(index, { img: base64 });
        }
    };

    // Manejar carga de imágenes para galería
    const handleGalleryImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        
        if (files.length + content.gallery.length > 20) {
            alert('Máximo 20 imágenes en la galería. Elimina algunas antes de agregar más.');
            return;
        }
        
        for (const file of files) {
            if (file.size > 10000000) {
                alert(`${file.name} es muy grande. Máximo 10MB por imagen.`);
                continue;
            }
            const base64 = await convertToBase64(file);
            addGalleryImage(base64);
        }
    };

    const InputGroup = ({ label, value, onChange, type = "text" }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>{label}</label>
            {type === 'textarea' ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={4}
                    style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', color: 'white', minHeight: '100px' }}
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
                />
            )}
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: 'white' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', background: '#141414', borderRight: '1px solid #333', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '3rem', color: '#c6a87c' }}>Meliflu Admin</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                    <button onClick={() => setActiveTab('hero')} style={{ textAlign: 'left', padding: '10px', background: activeTab === 'hero' ? '#1f1f1f' : 'transparent', color: activeTab === 'hero' ? '#c6a87c' : '#888', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                        <Layout size={18} /> Portada
                    </button>
                    <button onClick={() => setActiveTab('about')} style={{ textAlign: 'left', padding: '10px', background: activeTab === 'about' ? '#1f1f1f' : 'transparent', color: activeTab === 'about' ? '#c6a87c' : '#888', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                        <Type size={18} /> Nosotros
                    </button>
                    <button onClick={() => setActiveTab('services')} style={{ textAlign: 'left', padding: '10px', background: activeTab === 'services' ? '#1f1f1f' : 'transparent', color: activeTab === 'services' ? '#c6a87c' : '#888', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                        <Briefcase size={18} /> Servicios
                    </button>
                    <button onClick={() => setActiveTab('gallery')} style={{ textAlign: 'left', padding: '10px', background: activeTab === 'gallery' ? '#1f1f1f' : 'transparent', color: activeTab === 'gallery' ? '#c6a87c' : '#888', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                        <ImageIcon size={18} /> Galería
                    </button>
                    <button onClick={() => setActiveTab('contact')} style={{ textAlign: 'left', padding: '10px', background: activeTab === 'contact' ? '#1f1f1f' : 'transparent', color: activeTab === 'contact' ? '#c6a87c' : '#888', borderRadius: '4px', display: 'flex', gap: '10px' }}>
                        <Phone size={18} /> Contacto y Redes
                    </button>
                </div>

                <button onClick={handleLogout} style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '10px', color: '#ff6b6b', background: 'transparent' }}>
                    <LogOut size={18} /> Cerrar Sesión
                </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', margin: 0 }}>Editar Contenido</h1>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {saveMessage && (
                            <span style={{ color: saveMessage.includes('✓') ? '#4ade80' : '#fbbf24', fontSize: '0.9rem' }}>
                                {saveMessage}
                            </span>
                        )}
                        <button 
                            onClick={handleSave}
                            disabled={saving}
                            style={{ 
                                padding: '12px 24px', 
                                background: saving ? '#666' : '#c6a87c', 
                                color: '#0a0a0a', 
                                border: 'none', 
                                borderRadius: '6px', 
                                cursor: saving ? 'not-allowed' : 'pointer', 
                                fontWeight: 'bold',
                                fontSize: '1rem'
                            }}
                        >
                            {saving ? 'Guardando...' : '💾 Guardar Cambios'}
                        </button>
                    </div>
                </div>

                {activeTab === 'hero' && (
                    <div style={{ background: '#141414', padding: '2rem', borderRadius: '8px' }}>
                        <InputGroup
                            label="Título Principal"
                            value={content.hero.title}
                            onChange={(e) => updateSection('hero', { title: e.target.value })}
                        />
                        <InputGroup
                            label="Subtítulo"
                            value={content.hero.subtitle}
                            onChange={(e) => updateSection('hero', { subtitle: e.target.value })}
                            type="textarea"
                        />
                        <InputGroup
                            label="Texto Botón Principal"
                            value={content.hero.cta}
                            onChange={(e) => updateSection('hero', { cta: e.target.value })}
                        />
                    </div>
                )}

                {activeTab === 'about' && (
                    <div style={{ background: '#141414', padding: '2rem', borderRadius: '8px' }}>
                        <InputGroup
                            label="Título"
                            value={content.about.title}
                            onChange={(e) => updateSection('about', { title: e.target.value })}
                        />
                        <InputGroup
                            label="Párrafo 1"
                            value={content.about.text1}
                            onChange={(e) => updateSection('about', { text1: e.target.value })}
                            type="textarea"
                        />
                        <InputGroup
                            label="Párrafo 2"
                            value={content.about.text2}
                            onChange={(e) => updateSection('about', { text2: e.target.value })}
                            type="textarea"
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <InputGroup label="Estadística 1 (Valor)" value={content.about.stat1} onChange={(e) => updateSection('about', { stat1: e.target.value })} />
                            <InputGroup label="Estadística 1 (Etiqueta)" value={content.about.stat1Label} onChange={(e) => updateSection('about', { stat1Label: e.target.value })} />
                            <InputGroup label="Estadística 2 (Valor)" value={content.about.stat2} onChange={(e) => updateSection('about', { stat2: e.target.value })} />
                            <InputGroup label="Estadística 2 (Etiqueta)" value={content.about.stat2Label} onChange={(e) => updateSection('about', { stat2Label: e.target.value })} />
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {content.services.map((service, index) => (
                            <div key={index} style={{ background: '#141414', padding: '2rem', borderRadius: '8px', position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ color: '#c6a87c' }}>Servicio {index + 1}</h3>
                                    {content.services.length > 1 && (
                                        <button 
                                            onClick={() => {
                                                if (window.confirm('¿Eliminar este servicio?')) {
                                                    deleteService(index);
                                                }
                                            }}
                                            style={{ background: '#ff6b6b', color: 'white', padding: '8px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}
                                        >
                                            <Trash2 size={16} /> Eliminar
                                        </button>
                                    )}
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
                                    <div>
                                        <InputGroup
                                            label="Título"
                                            value={service.title}
                                            onChange={(e) => updateService(index, { title: e.target.value })}
                                        />
                                        <InputGroup
                                            label="Descripción"
                                            value={service.desc}
                                            onChange={(e) => updateService(index, { desc: e.target.value })}
                                            type="textarea"
                                        />
                                        <InputGroup
                                            label="URL Imagen (opcional)"
                                            value={service.img.startsWith('data:') ? '' : service.img}
                                            onChange={(e) => updateService(index, { img: e.target.value })}
                                        />
                                        <div style={{ marginTop: '1rem' }}>
                                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>
                                                O cargar desde PC
                                            </label>
                                            <label style={{ display: 'inline-block', padding: '10px 20px', background: '#c6a87c', color: '#0a0a0a', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>
                                                <Upload size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                                                Subir Imagen
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    onChange={(e) => handleServiceImageUpload(index, e)}
                                                    style={{ display: 'none' }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: '#888', fontSize: '0.9rem' }}>Previsualización</label>
                                        <div style={{ width: '100%', height: '200px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {service.img ? (
                                                <img src={service.img} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                                            ) : (
                                                <span style={{ color: '#444' }}>Sin imagen</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={addService}
                            style={{ background: '#1f1f1f', border: '2px dashed #c6a87c', color: '#c6a87c', padding: '1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1rem', fontWeight: 500, cursor: 'pointer' }}
                        >
                            <Plus size={20} /> Agregar Nuevo Servicio
                        </button>
                    </div>
                )}

                {activeTab === 'gallery' && (
                    <div style={{ background: '#141414', padding: '2rem', borderRadius: '8px' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'inline-block', padding: '12px 24px', background: '#c6a87c', color: '#0a0a0a', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 600 }}>
                                <Upload size={18} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                                Subir Imágenes desde PC
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    multiple
                                    onChange={handleGalleryImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                            <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                                Puedes seleccionar múltiples imágenes. Máximo 20 imágenes total. 
                                Las imágenes se comprimen automáticamente.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginTop: '2rem' }}>
                            {content.gallery.filter(url => url.trim()).map((img, i) => (
                                <div key={i} style={{ position: 'relative', width: '100%', paddingBottom: '100%', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', overflow: 'hidden' }}>
                                    <img src={img} alt={`Galería ${i + 1}`} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                                    <button
                                        onClick={() => {
                                            if (window.confirm('¿Eliminar esta imagen?')) {
                                                deleteGalleryImage(i);
                                            }
                                        }}
                                        style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255, 107, 107, 0.9)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid #333', marginTop: '3rem', paddingTop: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#c6a87c' }}>O agregar por URL</h4>
                            <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>Pega URLs de imágenes. Una por línea.</p>
                            <textarea
                                value={content.gallery.filter(url => !url.startsWith('data:')).join('\n')}
                                onChange={(e) => {
                                    const urls = e.target.value.split('\n').filter(url => url.trim());
                                    const base64Images = content.gallery.filter(url => url.startsWith('data:'));
                                    updateGallery([...base64Images, ...urls]);
                                }}
                                rows={5}
                                placeholder="https://ejemplo.com/imagen1.jpg&#10;https://ejemplo.com/imagen2.jpg"
                                style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', color: 'white', fontFamily: 'monospace' }}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'contact' && (
                    <div style={{ background: '#141414', padding: '2rem', borderRadius: '8px' }}>
                        <h3 style={{ marginBottom: '2rem', color: '#c6a87c' }}>Información de Contacto y Redes Sociales</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <InputGroup
                                label="Teléfono"
                                value={content.contact.phone}
                                onChange={(e) => updateSection('contact', { phone: e.target.value })}
                            />
                            <InputGroup
                                label="Email"
                                value={content.contact.email}
                                onChange={(e) => updateSection('contact', { email: e.target.value })}
                            />
                        </div>

                        <InputGroup
                            label="Dirección"
                            value={content.contact.address}
                            onChange={(e) => updateSection('contact', { address: e.target.value })}
                        />

                        <div style={{ borderTop: '1px solid #333', marginTop: '2rem', paddingTop: '2rem' }}>
                            <h4 style={{ marginBottom: '1rem', color: '#c6a87c' }}>Redes Sociales y WhatsApp</h4>
                            <InputGroup
                                label="WhatsApp (solo número con código país, ej: 51999999999)"
                                value={content.contact.whatsapp}
                                onChange={(e) => updateSection('contact', { whatsapp: e.target.value })}
                            />
                            <InputGroup
                                label="Instagram URL"
                                value={content.contact.instagram}
                                onChange={(e) => updateSection('contact', { instagram: e.target.value })}
                            />
                            <InputGroup
                                label="Facebook URL"
                                value={content.contact.facebook}
                                onChange={(e) => updateSection('contact', { facebook: e.target.value })}
                            />
                            <div style={{ marginTop: '1rem', padding: '1rem', background: '#0a0a0a', borderRadius: '4px', border: '1px solid #333' }}>
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>
                                    <strong style={{ color: '#c6a87c' }}>Nota:</strong> El número de WhatsApp se usa en los botones "Cotizar Proyecto" y contacto directo. 
                                    Debe incluir el código de país sin el símbolo +.
                                </p>
                            </div>
                        </div>
                    </div>
                )}            </div>
        </div>
    );
};

export default Dashboard;