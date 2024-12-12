import React, { useState, useEffect } from 'react';

export default function App() {
  const [arrivalInfo, setArrivalInfo] = useState({
    services: [],
    bus_stop_id: ' ',
  });

  const fetchArrivalData = async () => {
    const response = await fetch(
      'https://sg-bus-arrivals.vercel.app/?id=18141'
    );
    const data = await response.json();
    setArrivalInfo(data);
  };

  useEffect(() => {
    fetchArrivalData();
    const timerId = setInterval(() => {
      console.log('fetching bus data');
      fetchArrivalData();
    }, 5000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>Bus Arrival Times - Bus Stop ID {arrivalInfo.bus_stop_id}</h1>
      <ul>
        {arrivalInfo.services.map((arrival, index) => (
          <li key={index}>
            Bus {arrival.bus_no} arriving in {arrival.next_bus_mins} minutes
          </li>
        ))}
      </ul>
    </div>
  );
}
