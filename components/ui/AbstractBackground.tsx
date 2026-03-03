import React from 'react';

const AbstractBackground = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes blob1 {
          0% { transform: translate(-20%, -20%) scale(1); }
          33% { transform: translate(20%, 10%) scale(1.2); }
          66% { transform: translate(-10%, 20%) scale(0.9); }
          100% { transform: translate(-20%, -20%) scale(1); }
        }
        @keyframes blob2 {
          0% { transform: translate(20%, 20%) scale(0.9); }
          33% { transform: translate(-20%, -10%) scale(1.1); }
          66% { transform: translate(10%, -20%) scale(1); }
          100% { transform: translate(20%, 20%) scale(0.9); }
        }
        @keyframes blob3 {
          0% { transform: translate(10%, -10%) scale(1.1); }
          33% { transform: translate(30%, 20%) scale(0.8); }
          66% { transform: translate(-20%, 30%) scale(1.2); }
          100% { transform: translate(10%, -10%) scale(1.1); }
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
        }
        .blob-1 {
          top: 20%; left: 20%; width: 50vw; height: 50vh;
          background: radial-gradient(circle, rgba(37,99,235,0.8) 0%, rgba(37,99,235,0) 70%);
          animation: blob1 15s infinite linear;
        }
        .blob-2 {
          top: 40%; right: 10%; width: 60vw; height: 60vh;
          background: radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(124,58,237,0) 70%);
          animation: blob2 18s infinite linear;
        }
        .blob-3 {
          bottom: 10%; left: 30%; width: 45vw; height: 45vh;
          background: radial-gradient(circle, rgba(63,87,175,0.7) 0%, rgba(63,87,175,0) 70%);
          animation: blob3 20s infinite linear;
        }
      `}} />
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          overflow: 'hidden',
          filter: 'blur(80px)',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      >
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    </>
  );
};

export default AbstractBackground;