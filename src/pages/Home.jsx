import { useState, useEffect } from 'react';
import { getExperiencias } from '../services/api';
import { Briefcase, MapPin } from 'lucide-react';

export default function Home() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarExperiencias();
  }, []);

  const cargarExperiencias = async () => {
    try {
      const res = await getExperiencias();
      setExperiencias(res.data || []);
    } catch (err) {
      console.error('Error al cargar experiencias:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', color: '#0f172a', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '40px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2.2rem', color: '#1e293b', margin: '0 0 10px 0' }}>Gabriel Alfonso Sánchez Martínez</h1>
          <p style={{ fontSize: '1.1rem', color: '#2563eb', margin: 0, fontWeight: '600' }}>Desarrollador de Software | API REST & Frontend</p>
        </header>

        <section style={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ borderBottom: '3px solid #2563eb', paddingBottom: '10px', color: '#1e3a8a', marginTop: 0 }}>
            Experiencia Profesional
          </h2>

          {loading ? (
            <p style={{ color: '#64748b' }}>Cargando datos desde la API...</p>
          ) : experiencias.length === 0 ? (
            <div style={{ padding: '20px', backgroundColor: '#f1f5f9', borderRadius: '8px', textAlign: 'center', color: '#475569' }}>
              No hay experiencias registradas en la base de datos. ¡Agrega una desde el <strong>Panel Admin</strong>!
            </div>
          ) : (
            experiencias.map((exp) => (
              <div key={exp._id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#ffffff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.3rem' }}>{exp.cargo}</h3>
                  {exp.trabajoActual && (
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      Actual
                    </span>
                  )}
                </div>
                
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={18} />
                  {exp.empresa}
                </p>

                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <MapPin size={18} />
                  {exp.ubicacion || 'Ubicación no especificada'}
                </p>

                <p style={{ color: '#334155', lineHeight: '1.6' }}>{exp.descripcion}</p>

                {exp.tecnologias && exp.tecnologias.length > 0 && (
                  <div style={{ marginTop: '15px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                    <small style={{ color: '#64748b', fontWeight: 'bold' }}>Tecnologías:</small>
                    {exp.tecnologias.map((tech, i) => (
                      <span key={i} style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '500' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}