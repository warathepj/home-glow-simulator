import { onLightUpdate } from '../services/mqtt-client';

// In your component
onLightUpdate((data) => {
  // Update room light state based on received data
  if (data.room === roomId) {
    updateLightState(data.value);
  }
});