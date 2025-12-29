import React from 'react';

// IMAGES
import pastorErnest from '../images/pastor_ernest.jpg'; 
import drTebogo from '../images/dr_tebogo.jpg'; 
import pastorEphraim from '../images/Mr_Mashala.jpeg';
import pastorWin from '../images/Mr_Win.jpeg';
import pastorSimphiwe from '../images/Mr_Nkutha.jpeg';

export default function Leadership() {
  // STYLES (Smart Responsive)
  const sectionTitle = { color: 'var(--church-blue)', marginBottom: '15px', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 'bold' };
  const roleTitle = { color: 'var(--church-gold)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' };
  const subHeader = { color: 'var(--church-blue)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', marginTop: '25px' };
  const text = { fontSize: '1.05rem', lineHeight: '1.8', color: '#444', marginBottom: '15px' };

  // Glowing Blue Name Style
  const glowingNameStyle = {
    fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
    fontWeight: 'bold',
    color: 'var(--church-blue)',
    textAlign: 'center',
    marginTop: '20px',
    textShadow: '0 0 10px rgba(24, 44, 91, 0.4)'
  };

  const glowingRoleStyle = {
    fontSize: '0.9rem',
    color: 'var(--church-blue)',
    textAlign: 'center',
    marginTop: '5px',
    fontWeight: '600'
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ backgroundColor: 'var(--church-blue)', padding: '60px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 'bold', marginBottom: '10px' }}>Our Leadership</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: 'var(--church-gold)' }}>
          Meet the visionaries behind Abundant Rain Church
        </p>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>

        {/* 1. PASTOR ERNEST */}
        <LeaderSection 
          image={pastorErnest} 
          name="Pastor Ernest Peter Umanah" 
          role="Founding Senior Pastor"
          nameStyle={glowingNameStyle}
          roleStyle={glowingRoleStyle}
        >
          <h2 style={sectionTitle}>Meet Our Pastor</h2>
          <h4 style={roleTitle}>Founding Senior Pastor</h4>
          
          <h5 style={subHeader}>Heritage and Calling</h5>
          <p style={text}>Pastor Ernest Peter Umanah was born into the Royal House of Umanah in Nigeria. Despite his royal heritage, he chose to dedicate his life to serving God and proclaiming the Gospel across the nations.</p>
          
          <h5 style={subHeader}>Global Ministry</h5>
          <p style={text}>His ministry spans over 150 countries across six continents. Recognized as one of Africa's most prolific preachers, he has ministered extensively throughout the US, Europe, and Asia.</p>

          <h5 style={subHeader}>Vision</h5>
          <p style={text}>To preach the Gospel, make disciples, raise leaders, and establish God's Kingdom. "For I am not ashamed of the gospel of Christ..." — Romans 1:16.</p>
        </LeaderSection>

        {/* 2. DR TEBOGO */}
        <LeaderSection 
          image={drTebogo} 
          name="Dr. Tebogo Umanah" 
          role="Co-Founding Senior Pastor"
          reverse={true}
          nameStyle={glowingNameStyle}
          roleStyle={glowingRoleStyle}
        >
          <h2 style={sectionTitle}>Dr. Tebogo Umanah</h2>
          <h4 style={roleTitle}>Co-Founding Senior Pastor</h4>

          <p style={text}>Dr. Tebogo Umanah is the Co-Founder of Abundant Rain Church. Born in Polokwane, Limpopo, she hails from the distinguished Mafokoane family.</p>
          
          <h5 style={subHeader}>Academic Excellence</h5>
          <p style={text}>She holds multiple postgraduate qualifications from Wits University, including a PhD. Her career spans the Presidency of South Africa and senior executive positions.</p>

          <h5 style={subHeader}>Ministry Leadership</h5>
          <p style={text}>Together with her husband, she provides visionary spiritual leadership, remaining passionately committed to raising empowered leaders.</p>
        </LeaderSection>

        {/* OTHER PASTORS... (Keep existing structure but use the component below) */}
         <LeaderSection image={pastorWin} name="Pastor Win Mbedzi" role="Pastor of Christian Education" nameStyle={glowingNameStyle} roleStyle={glowingRoleStyle}>
            <h2 style={sectionTitle}>Pastor Win Mbedzi</h2>
            <h4 style={roleTitle}>Pastor of Christian Education</h4>
            <p style={text}>Pastor Win Mbedzi serves with a heart for teaching and spiritual formation. His ministry focuses on grounding believers in sound doctrine.</p>
         </LeaderSection>

         <LeaderSection image={pastorEphraim} name="Pastor Ephraim Mashala" role="Pastor of Pastoral Care" reverse={true} nameStyle={glowingNameStyle} roleStyle={glowingRoleStyle}>
            <h2 style={sectionTitle}>Pastor Ephraim Mashala</h2>
            <h4 style={roleTitle}>Pastor of Pastoral Care</h4>
            <p style={text}>Pastor Ephraim Mashala is known for his compassionate leadership. He plays a vital role in caring for the spiritual and emotional well-being of the congregation.</p>
         </LeaderSection>

         <LeaderSection image={pastorSimphiwe} name="Pastor Simphiwe Nkutha" role="Pastor of Leadership Development" nameStyle={glowingNameStyle} roleStyle={glowingRoleStyle}>
            <h2 style={sectionTitle}>Pastor Simphiwe Nkutha</h2>
            <h4 style={roleTitle}>Pastor of Leadership Development</h4>
            <p style={text}>Pastor Simphiwe Nkutha carries a strong passion for education and youth empowerment. He believes in nurturing the next generation of leaders.</p>
         </LeaderSection>

      </div>
    </div>
  );
}

// Reusable Component to handle the Mobile Stacking Logic
function LeaderSection({ image, name, role, reverse, children, nameStyle, roleStyle }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '40px', 
      marginBottom: '100px', 
      flexDirection: reverse ? 'row-reverse' : 'row' // Switches side on Desktop, but 'flex-wrap' handles mobile
    }}>
      {/* Image Container: flex-basis 280px ensures it fits on small phones */}
      <div style={{ flex: '1 1 280px', minWidth: '280px' }}>
        <img src={image} alt={name} style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }} />
        <div style={nameStyle}>{name}</div>
        <div style={roleStyle}>{role}</div>
      </div>

      {/* Text Container */}
      <div style={{ flex: '2 1 300px' }}>
        {children}
      </div>
    </div>
  );
}