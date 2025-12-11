import React from 'react';

const ProfileCard = () => {
    return (
        <div 
            className="card border-0 shadow-lg mt-3"
            style={{
                position: 'absolute',
                bottom: '70px',
                left: '20px',
                right: '20px',
                width: 'auto',
                zIndex: 1000,
                animation: 'slideUp 0.3s ease-out'
            }}
        >
            <div className="card-body">
                <div className="d-flex gap-3 mb-3 pb-3 border-bottom">
                    <div 
                        style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px',
                            flexShrink: 0
                        }}
                    >
                        👤
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="mb-1" style={{ fontSize: '14px', fontWeight: '600' }}>John Developer</h6>
                        <small className="text-primary d-block mb-1" style={{ fontWeight: '600' }}>IP Manager</small>
                        <small className="text-muted">john.dev@globalipi.com</small>
                    </div>
                </div>

                <div className="row text-center mb-3 pb-3 border-bottom">
                    <div className="col-6">
                        <h5 className="mb-1 text-primary" style={{ fontSize: '18px', fontWeight: '700' }}>12</h5>
                        <small className="text-muted text-uppercase" style={{ fontSize: '11px', fontWeight: '600' }}>Active Cases</small>
                    </div>
                    <div className="col-6">
                        <h5 className="mb-1 text-primary" style={{ fontSize: '18px', fontWeight: '700' }}>8</h5>
                        <small className="text-muted text-uppercase" style={{ fontSize: '11px', fontWeight: '600' }}>Documents</small>
                    </div>
                </div>

                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-light btn-sm">⚙️ Settings</button>
                    <button className="btn btn-light btn-sm">📞 Support</button>
                </div>
            </div>
            <style>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default ProfileCard;