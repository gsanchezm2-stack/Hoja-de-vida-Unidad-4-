import { useState, useEffect } from 'react';
import { getExperiencias, createExperiencia, updateExperiencia, deleteExperiencia } from '../services/api';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function Admin() {
  const [experiencias, setExperiencias] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    empresa: '',
    cargo: '',
    descripcion: '',
    ubicacion: '',
    fechaInicio: '',
    fechaFin: '',
    trabajoActual: false,
    tecnologias: ''
  });

  useEffect(() => {
    cargarExperiencias();
  }, []);

  const cargarExperiencias = async () => {
    try {
      const res = await getExperiencias();
      setExperiencias(res.data || []);
    } catch (err) {
      console.error('Error al cargar experiencias:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tecnologias: typeof formData.tecnologias === 'string' 
        ? formData.tecnologias.split(',').map(t => t.trim()).filter(Boolean)
        : formData.tecnologias
    };

    try {
      if (editingId) {
        await updateExperiencia(editingId, payload);
      } else {
        await createExperiencia(payload);
      }
      resetForm();
      cargarExperiencias();
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.mensaje || err.message));
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setFormData({
      empresa: exp.empresa || '',
      cargo: exp.cargo || '',
      descripcion: exp.descripcion || '',
      ubicacion: exp.ubicacion || '',
      fechaInicio: exp.fechaInicio ? exp.fechaInicio.split('T')[0] : '',
      fechaFin: exp.fechaFin ? exp.fechaFin.split('T')[0] : '',
      trabajoActual: exp.trabajoActual || false,
      tecnologias: Array.isArray(exp.tecnologias) ? exp.tecnologias.join(', ') : ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta experiencia?')) {
      try {
        await deleteExperiencia(id);
        cargarExperiencias();
      } catch (err) {
        alert('Error al eliminar: ' + err.message);
      }
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      empresa: '',
      cargo: '',
      descripcion: '',
      ubicacion: '',
      fechaInicio: '',
      fechaFin: '',
      trabajoActual: false,
      tecnologias: ''
    });
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px 20px', color: '#0f172a', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#1e293b' }}>Panel Administrativo CRUD</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '40px' }}>
          <h2 style={{ marginTop: 0, color: '#2563eb', fontSize: '1.4rem' }}>
            {editingId ? 'Editar Experiencia' : 'Nueva Experiencia'}
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Empresa *</label>
              <input 
                type="text" 
                required 
                value={formData.empresa} 
                onChange={e => setFormData({...formData, empresa: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Cargo *</label>
              <input 
                type="text" 
                required 
                value={formData.cargo} 
                onChange={e => setFormData({...formData, cargo: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Ubicación</label>
              <input 
                type="text" 
                value={formData.ubicacion} 
                onChange={e => setFormData({...formData, ubicacion: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Tecnologías (separadas por coma)</label>
              <input 
                type="text" 
                placeholder="React, Node.js, Express" 
                value={formData.tecnologias} 
                onChange={e => setFormData({...formData, tecnologias: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Fecha Inicio *</label>
              <input 
                type="date" 
                required 
                value={formData.fechaInicio} 
                onChange={e => setFormData({...formData, fechaInicio: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Fecha Fin</label>
              <input 
                type="date" 
                disabled={formData.trabajoActual} 
                value={formData.fechaFin} 
                onChange={e => setFormData({...formData, fechaFin: e.target.value})} 
                style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: formData.trabajoActual ? '#f1f5f9' : '#ffffff', color: '#0f172a' }} 
              />
            </div>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#1e293b' }}>
              <input type="checkbox" checked={formData.trabajoActual} onChange={e => setFormData({...formData, trabajoActual: e.target.checked, fechaFin: ''})} />
              <span style={{ fontWeight: 'bold' }}>Es mi trabajo actual</span>
            </label>
          </div>

          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#1e293b' }}>Descripción *</label>
            <textarea 
              required 
              rows="3" 
              value={formData.descripcion} 
              onChange={e => setFormData({...formData, descripcion: e.target.value})} 
              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', color: '#0f172a' }}
            ></textarea>
          </div>

          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={18} /> {editingId ? 'Actualizar' : 'Guardar'}
            </button>

            {editingId && (
              <button type="button" onClick={resetForm} style={{ backgroundColor: '#64748b', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        {/* Tabla de Registros */}
        <section style={{ backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0, color: '#1e293b', fontSize: '1.4rem' }}>Listado de Experiencias</h2>
          
          {experiencias.length === 0 ? (
            <p style={{ color: '#64748b' }}>No existen registros guardados.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Empresa</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Cargo</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1' }}>Ubicación</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #cbd5e1', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {experiencias.map((exp) => (
                  <tr key={exp._id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: '600' }}>{exp.empresa}</td>
                    <td style={{ padding: '12px' }}>{exp.cargo}</td>
                    <td style={{ padding: '12px' }}>{exp.ubicacion || '-'}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button onClick={() => handleEdit(exp)} style={{ backgroundColor: '#f59e0b', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', marginRight: '8px' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => handleDelete(exp._id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
} 