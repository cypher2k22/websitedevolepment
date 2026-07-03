import React, { useState } from 'react';

const TIERS = [
  { id: 'backer', amount: 15, name: 'Backer', perks: 'Access to monthly updates & community Discord.', color: '#00d2ff' },
  { id: 'sponsor', amount: 50, name: 'Sponsor', perks: 'All perks + name in project credits & premium helper badge.', color: '#af40ff' },
  { id: 'patron', amount: 250, name: 'Patron', perks: 'All perks + 1-on-1 mentorship session & lifetime access.', color: '#00ddeb' }
];

function Donate() {
  const [selectedTier, setSelectedTier] = useState('sponsor');
  const [customAmount, setCustomAmount] = useState('');
  const [thankYou, setThankYou] = useState(false);
  const [raised, setRaised] = useState(8450);
  const goal = 10000;

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : TIERS.find(t => t.id === selectedTier).amount;
    setRaised(prev => prev + finalAmount);
    setThankYou(true);
  };

  const currentPercent = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #00d2ff, #00ddeb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Support Fullstack Education
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          We provide high-quality educational resources for free. Help us keep servers running and build new curriculum.
        </p>
      </div>

      {thankYou ? (
        <div style={{
          background: 'rgba(16, 172, 132, 0.08)',
          border: '1px solid #10ac84',
          borderRadius: '16px',
          padding: '50px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(10px)'
        }}>
          <span style={{ fontSize: '4rem' }}>🎉</span>
          <h2 style={{ color: '#10ac84', fontSize: '2rem', margin: '20px 0 10px' }}>Thank You So Much!</h2>
          <p style={{ color: '#ccc', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 30px', lineHeight: '1.6' }}>
            Your support helps empower thousands of developers worldwide to access world-class programming resources.
          </p>
          <button 
            onClick={() => { setThankYou(false); setCustomAmount(''); }}
            style={{
              position: 'static',
              transform: 'none',
              backgroundImage: 'linear-gradient(135deg, #10ac84, #00ddeb)',
              padding: '12px 30px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            <span style={{ background: 'transparent' }}>Done</span>
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Progress Goal */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontWeight: 'bold' }}>
              <span>Monthly Hosting & Dev Funding</span>
              <span style={{ color: '#00d2ff' }}>${raised.toLocaleString()} / ${goal.toLocaleString()} ({currentPercent}%)</span>
            </div>
            {/* Progress Track */}
            <div style={{
              width: '100%',
              height: '14px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div style={{
                width: `${currentPercent}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00d2ff, #af40ff)',
                borderRadius: '10px',
                transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
          </div>

          {/* Form and Tiers */}
          <form onSubmit={handleDonateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}>
              {TIERS.map((tier) => {
                const isSelected = selectedTier === tier.id && !customAmount;
                return (
                  <div 
                    key={tier.id}
                    onClick={() => { setSelectedTier(tier.id); setCustomAmount(''); }}
                    style={{
                      background: isSelected ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                      backdropFilter: 'blur(10px)',
                      border: isSelected ? `2px solid ${tier.color}` : '1.5px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '25px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: isSelected ? `0 0 20px rgba(${parseInt(tier.color.slice(1,3),16)}, ${parseInt(tier.color.slice(3,5),16)}, ${parseInt(tier.color.slice(5,7),16)}, 0.15)` : 'none'
                    }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: tier.color }}>{tier.name}</h3>
                    <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '15px' }}>${tier.amount}</div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#ccc', lineHeight: '1.5' }}>{tier.perks}</p>
                  </div>
                );
              })}
            </div>

            {/* Custom Amount */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px',
              padding: '25px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <span style={{ fontWeight: 'bold' }}>Or Enter Custom Amount:</span>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '4px 15px',
                width: '180px'
              }}>
                <span style={{ color: '#aaa', marginRight: '5px' }}>$</span>
                <input 
                  type="number" 
                  min="1"
                  placeholder="Amount"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setSelectedTier(''); }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    outline: 'none',
                    width: '100%',
                    fontSize: '1.1rem',
                    padding: '8px 0'
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button 
                type="submit"
                style={{
                  position: 'static',
                  transform: 'none',
                  backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
                  minWidth: '220px',
                  height: '3.2rem',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}>
                <span style={{ background: 'transparent', padding: '0 30px' }}>
                  Support Project
                </span>
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  );
}

export default Donate;