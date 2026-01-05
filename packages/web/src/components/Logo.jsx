import React from 'react';
import logoImg from '../assets/logo.png';

export default function Logo({ size = 'large' }) {
    const isSmall = size === 'small';
    const isMedium = size === 'medium';

    return (
        <div className="login-logo" style={{ marginBottom: (isSmall || isMedium) ? 0 : '24px', gap: '8px' }}>
            <img
                src={logoImg}
                alt="Heihei Logo"
                style={{
                    height: isSmall ? '24px' : (isMedium ? '40px' : '60px'),
                    width: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                }}
            />
            <span className="logo-text" style={{ fontSize: isSmall ? '24px' : (isMedium ? '36px' : '60px'), color: 'inherit' }}>Heihei</span>
        </div>
    );
}
