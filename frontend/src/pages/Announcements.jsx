import { useState, useEffect } from 'react';
import api from '../apiClient';
import { Loader, Bell, Calendar } from 'lucide-react';

export default function Announcements() {
  const [allUpdates, setAllUpdates] = useState([]);
  const [filteredUpdates, setFilteredUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const { data } = await api.get('/ministries'); 
      console.log("Fetched Updates:", data); // <--- DEBUGGING LOG
      setAllUpdates(data);
      setFilteredUpdates(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (category) => {
    setFilter(category);
    if (category === 'All') {
      setFilteredUpdates(allUpdates);
    } else {
      setFilteredUpdates(allUpdates.filter(update => update.ministry === category));
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'General': return 'var(--church-gold)';
      case 'Men': return '#2563eb';
      case 'Women': return '#db2777';
      case 'Youth': return '#ea580c';
      case 'Children': return '#16a34a';
      default: return '#666';
    }
  };

  if (loading) return <div style={{padding:'100px', textAlign:'center'}}><Loader className="animate-spin" /></div>;

  return (
    <div>
      {/* Header */}
      <div style={{backgroundColor: 'var(--church-blue)', color: 'white', padding: '60px 20px', textAlign: 'center'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>News & Announcements</h1>
        <p style={{fontSize: '1.2rem', color: 'var(--church-gold)'}}>Latest updates from Abundant Rain Vosloorus</p>
      </div>

      <div className="container" style={{padding: '40px 20px'}}>
        
        {/* Filter Buttons */}
        <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '30px', borderBottom: '1px solid #eee'}}>
          {['All', 'General', 'Men', 'Women', 'Youth', 'Children'].map(cat => (
            <button 
              key={cat}
              onClick={() => handleFilter(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: filter === cat ? 'var(--church-blue)' : '#f0f0f0',
                color: filter === cat ? 'white' : '#333',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                transition: '0.3s'
              }}
            >
              {cat === 'General' ? '📢 General' : cat}
            </button>
          ))}
        </div>

        {/* Announcements List */}
        {filteredUpdates.length === 0 ? (
          <div style={{textAlign:'center', padding: '60px', color: '#888', backgroundColor: '#f9f9f9', borderRadius: '10px'}}>
            <Bell size={50} style={{marginBottom: '15px', opacity: 0.3}} />
            <h3>No announcements found for {filter}.</h3>
            <p>Check back later or select "All" to see other news.</p>
          </div>
        ) : (
          <div style={{display: 'grid', gap: '25px'}}>
            {filteredUpdates.map(update => (
              <div key={update._id} style={{
                backgroundColor: 'white', 
                padding: '30px', 
                borderRadius: '12px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                borderLeft: `6px solid ${getCategoryColor(update.ministry)}`,
                position: 'relative'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', flexWrap: 'wrap'}}>
                  <span style={{
                    fontSize: '0.75rem', 
                    fontWeight: 'bold', 
                    textTransform: 'uppercase', 
                    color: 'white',
                    backgroundColor: getCategoryColor(update.ministry),
                    padding: '4px 12px',
                    borderRadius: '50px'
                  }}>
                    {update.ministry}
                  </span>
                  <span style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', color: '#888'}}>
                    <Calendar size={14}/> {new Date(update.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <h2 style={{margin: '0 0 15px 0', color: '#333', fontSize: '1.5rem'}}>{update.title}</h2>
                <p style={{color: '#555', lineHeight: '1.7', whiteSpace: 'pre-wrap', fontSize: '1.05rem'}}>{update.content}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}