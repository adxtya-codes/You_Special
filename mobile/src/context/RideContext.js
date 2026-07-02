import React, { createContext, useContext, useState } from 'react';
import { mockRides, rideRequests } from '../data/mockData';

const RideContext = createContext(null);

export function RideProvider({ children }) {
  const [currentRide, setCurrentRide] = useState(null);
  const [rideStep, setRideStep] = useState('idle'); // idle | searching | matched | tracking | rating
  const [pendingRequest, setPendingRequest] = useState(rideRequests[0]);
  const [history] = useState(mockRides);
  const [sosActive, setSosActive] = useState(false);
  const [driverOnline, setDriverOnline] = useState(true);

  const bookRide = (pickup, drop) => {
    setRideStep('searching');
    setTimeout(() => {
      setCurrentRide({ pickup, drop, fare: 78, distance: '5.1 km', duration: '22 min' });
      setRideStep('matched');
    }, 2500);
  };

  const startTracking = () => setRideStep('tracking');
  const completeRide  = () => setRideStep('rating');
  const finishRide    = () => { setRideStep('idle'); setCurrentRide(null); };
  const triggerSOS    = () => setSosActive(true);
  const clearSOS      = () => setSosActive(false);

  return (
    <RideContext.Provider value={{
      currentRide, rideStep, pendingRequest, history, sosActive, driverOnline,
      bookRide, startTracking, completeRide, finishRide,
      triggerSOS, clearSOS, setDriverOnline,
    }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
