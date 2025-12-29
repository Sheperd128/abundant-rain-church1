import React from 'react';
import { Landmark, Heart } from 'lucide-react';

export default function Give() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <Heart size={50} color="var(--church-red)" style={{ marginBottom: '20px' }} />
      <h1 style={{ color: 'var(--church-blue)', marginBottom: '10px' }}>Support the Ministry</h1>
      <p style={{ maxWidth: '700px', margin: '0 auto 50px auto', fontSize: '1.1rem', color: '#666' }}>
        "For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes." — Romans 1:16
      </p>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1', minWidth: '320px', padding: '40px', backgroundColor: 'var(--church-blue)', color: 'white' }}>
          <Landmark size={40} color="var(--church-gold)" style={{ marginBottom: '20px' }} />
          <h3 style={{ color: 'white' }}>Banking Details</h3>
          <div style={{ marginTop: '20px', textAlign: 'left', border: '1px dashed var(--church-gold)', padding: '20px' }}>
            <p><strong>Bank:</strong> Standard Bank</p>
            <p><strong>Account Name:</strong> Abundant Rain Family Church</p>
            <p><strong>Account No:</strong> 007126832</p>
            <p><strong>Branch:</strong> Eloff Street, Johannesburg</p>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', opacity: '0.8' }}>
            Please use your name or "Tithe" as a reference.
          </p>
        </div>
      </div>
    </div>
  );
}