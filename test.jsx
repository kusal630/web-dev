import React, { useState, useEffect } from 'react';

const OnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>Connection Status</h2>
      <p>
        You are currently{' '}
        <strong style={{ color: isOnline ? 'green' : 'red' }}>
          {isOnline ? 'Online' : 'Offline'}
        </strong>
      </p>
    </div>
  );
};

export default OnlineStatus;