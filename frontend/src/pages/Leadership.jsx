import React from 'react';

// IMAGES - Matching your folder names exactly
import pastorErnest from '../images/pastor_ernest.jpg'; 
import drTebogo from '../images/dr_tebogo.jpg'; 
import pastorEphraim from '../images/Mr_Mashala.jpeg';
import pastorWin from '../images/Mr_Win.jpeg';
import pastorSimphiwe from '../images/Mr_Nkutha.jpeg';

export default function Leadership() {
  // STYLES
  const sectionTitle = { color: 'var(--church-blue)', marginBottom: '15px', fontSize: '2rem', fontWeight: 'bold' };
  const roleTitle = { color: 'var(--church-gold)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' };
  const subHeader = { color: 'var(--church-blue)', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '8px', marginTop: '25px' };
  const text = { fontSize: '1.05rem', lineHeight: '1.8', color: '#444', marginBottom: '15px' };

  // Glowing Blue Name Style
  const glowingNameStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'var(--church-blue)',
    textAlign: 'center',
    marginTop: '20px',
    textShadow: '0 0 10px rgba(24, 44, 91, 0.4)'
  };

  // Glowing Blue Role Style
  const glowingRoleStyle = {
    fontSize: '1.1rem',
    color: 'var(--church-blue)',
    textAlign: 'center',
    marginTop: '5px',
    fontWeight: '600',
    textShadow: '0 0 8px rgba(24, 44, 91, 0.3)'
  };

  return (
    <div>
      {/* HEADER */}
      <div style={{ backgroundColor: 'var(--church-blue)', padding: '100px 20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '15px' }}>Our Leadership</h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--church-gold)' }}>
          Meet the visionaries behind Abundant Rain Church
        </p>
      </div>

      <div className="container" style={{ padding: '80px 20px' }}>

        {/* ================= 1. PASTOR ERNEST (FULL BIO) ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', marginBottom: '120px' }}>
          {/* Image Left */}
          <div style={{ flex: '1 1 350px' }}>
            <img src={pastorErnest} alt="Pastor Ernest" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            <div style={glowingNameStyle}>Pastor Ernest Peter Umanah</div>
            <div style={glowingRoleStyle}>Founding Senior Pastor</div>
          </div>

          {/* Text Right */}
          <div style={{ flex: '2 1 500px' }}>
            <h2 style={sectionTitle}>Meet Our Pastor</h2>
            <h4 style={roleTitle}>Founding Senior Pastor</h4>
            
            <h5 style={subHeader}>Heritage and Calling</h5>
            <p style={text}>Pastor Ernest Peter Umanah was born into the Royal House of Umanah, the Abak Annang royal house in Nigeria. His great-great-great-grandfather, known as Abak Annang, was the founding father of the Annang tribe, one of Nigeria's largest ethnic groups. Despite this royal heritage, Pastor Umanah chose a different path—dedicating his life to serving God and proclaiming the Gospel across the nations.</p>
            
            <h5 style={subHeader}>Education and Training</h5>
            <p style={text}>Pastor Umanah studied Psychology and Theology at leading institutions, equipping him with both a deep understanding of human nature and a solid biblical foundation. This unique combination has made him an exceptionally effective minister, capable of addressing the spiritual, emotional, and practical needs of those he serves.</p>

            <h5 style={subHeader}>Global Ministry</h5>
            <p style={text}>Pastor Umanah's ministry spans over 150 countries across six continents. Recognized as one of Africa's most prolific preachers, he has ministered extensively throughout the United States—having preached in all 50 states—as well as across Europe, Africa, Asia, and beyond.</p>

            <h5 style={subHeader}>Humanitarian Service</h5>
            <p style={text}>Before entering pastoral ministry, Pastor Umanah served with several international humanitarian organizations, including World Horizon, World Vision, and Africa Vision. His work with these organizations reflected his compassionate heart and unwavering commitment to serving the most vulnerable.</p>

            <h5 style={subHeader}>Business Leadership</h5>
            <p style={text}>Pastor Umanah is also an accomplished entrepreneur and business consultant. He co-founded Africa Petroleum, an oil export company, and established Enipima Investment Corporation. He continues to serve as a strategic consultant to individuals, corporations, and government entities, and works as a life coach, empowering people to achieve their God-given potential in every area of life.</p>

            <h5 style={subHeader}>Pastoral Ministry in Nigeria</h5>
            <p style={text}>Pastor Umanah pastored one of the fastest-growing churches in Victoria Island, Lagos, where thousands came to faith in Christ and many leaders were raised and equipped for ministry. His visionary leadership during this season established him as a dynamic and transformational pastor.</p>

            <h5 style={subHeader}>Missionary Work</h5>
            <p style={text}>Answering God's call to missionary work, Pastor Umanah has served in some of the world's most challenging regions, including Islamic nations across North Africa and the Arab world. His courage and faithfulness in these difficult fields have resulted in countless individuals coming to know Christ.</p>

            <h5 style={subHeader}>Denominational Leadership and Speaking Ministry</h5>
            <p style={text}>Since the early 1990s, Pastor Umanah has been a pioneering member of the Full Gospel Baptist Church in America. He is a respected voice across denominational lines and has been invited to speak at world conventions for Baptist, Lutheran, Methodist, Episcopal, Advent Churches Movement, Oneness Apostolic, Mennonite, Anabaptist, and many other Christian denominations.</p>

            <h5 style={subHeader}>Academic Contributions</h5>
            <p style={text}>Pastor Umanah has served as a visiting lecturer at prominent theological seminaries around the world, where he has trained and mentored future ministry leaders. His teaching combines theological depth with practical application, preparing students for effective Kingdom service.</p>
 
            <h5 style={subHeader}>Church Planting</h5>
            <p style={text}>Pastor Umanah founded Blessed Hope Fellowship in South Africa, which grew to include campuses in South Africa, Namibia, Zimbabwe, and Europe. After years of faithful service, Pastor Umanah followed God's leading to establish a new work.</p>

            <h5 style={subHeader}>Abundant Rain Church Vision</h5>
            <p style={text}>In obedience to God's vision, Pastor Umanah founded Abundant Rain Church, headquartered on a beautiful campus in Vosloorus, Ekurhuleni, South Africa. From its beginnings in a South African township, Abundant Rain has grown into a dynamic, multi-ethnic congregation with global influence. The church is known for its powerful worship, sound biblical teaching, and commitment to seeing lives transformed by the Gospel.</p>
            <p style={{...text, fontStyle: 'italic', fontWeight: 'bold', color: 'var(--church-blue)'}}>"For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes." — Romans 1:16</p>
          </div>
        </div>


        {/* ================= 2. DR TEBOGO (FULL BIO) ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '60px', marginBottom: '120px' }}>
          {/* Text Left */}
          <div style={{ flex: '2 1 500px' }}>
            <h2 style={sectionTitle}>Dr. Tebogo Umanah</h2>
            <h4 style={roleTitle}>Co-Founding Senior Pastor</h4>

            <p style={text}>Dr. Tebogo Umanah is the Co-Founder of Abundant Rain Church. Born in Polokwane, Limpopo, she hails from the distinguished Mafokoane family.</p>
            
            <h5 style={subHeader}>Academic and Executive Leader</h5>
            <p style={text}>Dr. Umanah is a highly accomplished academic and executive leader. She holds multiple postgraduate qualifications from the University of the Witwatersrand, including two Master's degrees and a Doctor of Philosophy (PhD). Her academic achievements are complemented by numerous executive and leadership certifications, reflecting her dedication to excellence, strategic governance, and transformational leadership.</p>

            <h5 style={subHeader}>Distinguished Career</h5>
            <p style={text}>Her distinguished career spans both the public and private sectors. She has served at the Presidency of the Republic of South Africa within the Security Cluster and held senior executive positions across government and corporate institutions. Her expertise encompasses strategic leadership, policy development, governance frameworks, and high-level organizational administration.</p>

            <h5 style={subHeader}>Ministry Leadership</h5>
            <p style={text}>Today, Dr. Tebogo Umanah co-pastors Abundant Rain Church alongside her husband. Together, they provide visionary spiritual leadership and pastoral care, while remaining passionately committed to the growth, development, and expansion of their ministry. Their mission centers on raising empowered leaders and transforming communities through the Word of God.</p>
          </div>

          {/* Image Right */}
          <div style={{ flex: '1 1 350px' }}>
            <img src={drTebogo} alt="Dr Tebogo" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            <div style={glowingNameStyle}>Dr. Tebogo Umanah</div>
            <div style={glowingRoleStyle}>Co-Founding Senior Pastor</div>
          </div>
        </div>


        {/* ================= 3. PASTOR WIN ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', marginBottom: '120px' }}>
          {/* Image Left */}
          <div style={{ flex: '1 1 350px' }}>
            <img src={pastorWin} alt="Pastor Win" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            <div style={glowingNameStyle}>Pastor Win Mbedzi</div>
            <div style={glowingRoleStyle}>Pastor of Christian Education</div>
          </div>

          {/* Text Right */}
          <div style={{ flex: '2 1 500px' }}>
            <h2 style={sectionTitle}>Pastor Win Mbedzi</h2>
            <h4 style={roleTitle}>Pastor of Christian Education</h4>
            
            <p style={text}>Pastor Win Mbedzi serves with a heart for teaching and spiritual formation. His ministry focuses on grounding believers in sound doctrine and practical Christian living.</p>

            <h5 style={subHeader}>Teaching & Discipleship</h5>
            <p style={text}>He is deeply committed to developing structured learning environments that empower believers to grow spiritually, intellectually, and morally. Through the Christian Education department, he ensures that members are equipped with the Word of God to face life's challenges with faith and wisdom.</p>
          </div>
        </div>


        {/* ================= 4. PASTOR EPHRAIM ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap-reverse', gap: '60px', marginBottom: '120px' }}>
          {/* Text Left */}
          <div style={{ flex: '2 1 500px' }}>
            <h2 style={sectionTitle}>Pastor Ephraim Mashala</h2>
            <h4 style={roleTitle}>Pastor of Pastoral Care</h4>

            <p style={text}>Pastor Ephraim Mashala is known for his compassionate leadership and pastoral sensitivity. He plays a vital role in caring for the spiritual and emotional well-being of the congregation.</p>

            <h5 style={subHeader}>Shepherding the Flock</h5>
            <p style={text}>His ministry emphasizes restoration, counseling, and walking alongside members through life’s challenges with wisdom and grace. He ensures that every member feels seen, heard, and supported, embodying the heart of a true shepherd.</p>
          </div>

          {/* Image Right */}
          <div style={{ flex: '1 1 350px' }}>
            <img src={pastorEphraim} alt="Pastor Ephraim" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            <div style={glowingNameStyle}>Pastor Ephraim Mashala</div>
            <div style={glowingRoleStyle}>Pastor of Pastoral Care</div>
          </div>
        </div>


        {/* ================= 5. PASTOR SIMPHIWE ================= */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '60px', marginBottom: '120px' }}>
          {/* Image Left */}
          <div style={{ flex: '1 1 350px' }}>
            <img src={pastorSimphiwe} alt="Pastor Simphiwe" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            <div style={glowingNameStyle}>Pastor Siphiwe Nkutha</div>
            <div style={glowingRoleStyle}>Pastor of Leadership Development</div>
          </div>

          {/* Text Right */}
          <div style={{ flex: '2 1 500px' }}>
            <h2 style={sectionTitle}>Pastor Simphiwe Nkutha</h2>
            <h4 style={roleTitle}>Pastor of Leadership Development</h4>
            
            <p style={text}>Pastor Simphiwe Nkutha carries a strong passion for education, leadership development, and the empowerment of young people.</p>

            <h5 style={subHeader}>Youth & Education Focus</h5>
            <p style={text}>He believes that investing in education and nurturing youth leadership is essential for building strong communities and a sustainable future for the church. His ministry seeks to inspire discipline, purpose, and faith-driven excellence in the next generation.</p>
          </div>
        </div>

      </div>
    </div>
  );
}