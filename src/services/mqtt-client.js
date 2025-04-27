const ws = new WebSocket('ws://localhost:8085'); // Connect to subscriber WebSocket server

ws.onopen = () => {
  console.log('Connected to subscriber WebSocket server');
};

ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);
    
    if (data.type === 'TOGGLE_UPDATE') {
      // Handle light toggle updates
      console.log('Light update received:', {
        value: data.value,
        timestamp: data.timestamp,
        source: data.source
      });
      
      // You can emit an event or call a callback here to update the UI
      if (typeof onLightUpdate === 'function') {
        onLightUpdate(data);
      }
    }
  } catch (error) {
    console.error('Error processing message:', error);
  }
};

ws.onclose = () => {
  console.log('Disconnected from subscriber WebSocket server');
  // Implement reconnection logic if needed
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

// Export a function to handle light updates
export const onLightUpdate = (callback) => {
  window.onLightUpdate = callback;
};