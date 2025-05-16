import { memo } from 'react';

// Create a lightweight loading screen
const LoadingScreen = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#242424'
  }}>
    <div>Loading application...</div>
  </div>
);

export default memo(LoadingScreen);