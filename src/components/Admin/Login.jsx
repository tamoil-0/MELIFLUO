import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (user === 'tamoil' && pass === 'tamoil12345') {
            localStorage.setItem('meliflu_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'white' }}>
            <form onSubmit={handleLogin} style={{ background: '#141414', padding: '3rem', borderRadius: '8px', border: '1px solid #333', width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Lock size={40} color="#c6a87c" />
                    <h2 style={{ fontFamily: 'var(--font-heading)', marginTop: '1rem' }}>Admin Access</h2>
                </div>

                {error && <div style={{ background: 'rgba(255,0,0,0.2)', color: '#ff6b6b', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Usuario</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', color: 'white', outline: 'none' }}
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#888' }}>Contraseña</label>
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        style={{ width: '100%', padding: '12px', background: '#0a0a0a', border: '1px solid #333', borderRadius: '4px', color: 'white', outline: 'none' }}
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
