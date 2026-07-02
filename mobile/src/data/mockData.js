// Mock data for the You Special Expo app
export const mockRiders = [
  { id: 'r1', name: 'Priya Sharma',  phone: '+91 98765 43210', initials: 'PS', rating: 4.8, rides: 42,  joined: '2024-01', status: 'active',    emergencyContacts: [{ name: 'Neha Sharma', phone: '+91 99887 76655', relation: 'Sister' }] },
  { id: 'r2', name: 'Ananya Reddy',  phone: '+91 87654 32109', initials: 'AR', rating: 4.9, rides: 89,  joined: '2023-11', status: 'active',    emergencyContacts: [] },
  { id: 'r3', name: 'Kavya Menon',   phone: '+91 76543 21098', initials: 'KM', rating: 4.7, rides: 15,  joined: '2024-03', status: 'active',    emergencyContacts: [] },
  { id: 'r4', name: 'Meera Joshi',   phone: '+91 65432 10987', initials: 'MJ', rating: 4.6, rides: 67,  joined: '2023-08', status: 'suspended', emergencyContacts: [] },
];

export const mockDrivers = [
  { id: 'd1', name: 'Sunita Verma',  phone: '+91 90000 11111', initials: 'SV', rating: 4.9, rides: 312, joined: '2023-06', status: 'active',   verified: true,  vehicle: 'Honda Activa 6G',    vehicleNo: 'MH-12-AB-3456', online: true,  earnings: 24500, todayEarnings: 840 },
  { id: 'd2', name: 'Rekha Patel',   phone: '+91 90000 22222', initials: 'RP', rating: 4.8, rides: 198, joined: '2023-09', status: 'active',   verified: true,  vehicle: 'TVS Jupiter',        vehicleNo: 'MH-04-CD-7890', online: false, earnings: 18200, todayEarnings: 0   },
  { id: 'd3', name: 'Deepa Nair',    phone: '+91 90000 33333', initials: 'DN', rating: 4.7, rides: 89,  joined: '2024-01', status: 'active',   verified: true,  vehicle: 'Honda Dio',          vehicleNo: 'KL-05-EF-1234', online: true,  earnings: 9800,  todayEarnings: 560 },
  { id: 'd4', name: 'Lalitha Rao',   phone: '+91 90000 44444', initials: 'LR', rating: 4.5, rides: 45,  joined: '2024-02', status: 'pending',  verified: false, vehicle: 'Yamaha Ray ZR',      vehicleNo: 'AP-11-GH-5678', online: false, earnings: 4200,  todayEarnings: 0   },
  { id: 'd5', name: 'Anjali Gupta',  phone: '+91 90000 55555', initials: 'AG', rating: 4.6, rides: 134, joined: '2023-12', status: 'active',   verified: true,  vehicle: 'Suzuki Access 125',  vehicleNo: 'DL-08-IJ-9012', online: true,  earnings: 13600, todayEarnings: 420 },
];

export const mockRides = [
  { id: 'ride1', rider: mockRiders[0], driver: mockDrivers[0], pickup: 'Koramangala 5th Block', drop: 'Indiranagar Metro',  fare: 65,  distance: '4.2 km', duration: '18 min', date: '2024-06-23', time: '09:15', status: 'completed', rating: 5 },
  { id: 'ride2', rider: mockRiders[1], driver: mockDrivers[1], pickup: 'Whitefield IT Park',    drop: 'HSR Layout Sec 7',  fare: 120, distance: '8.7 km', duration: '32 min', date: '2024-06-23', time: '10:45', status: 'completed', rating: 4 },
  { id: 'ride3', rider: mockRiders[2], driver: mockDrivers[2], pickup: 'Jayanagar 4th Block',   drop: 'JP Nagar Metro',    fare: 48,  distance: '3.1 km', duration: '14 min', date: '2024-06-23', time: '11:30', status: 'active',    rating: null },
  { id: 'ride4', rider: mockRiders[0], driver: mockDrivers[4], pickup: 'Electronic City',        drop: 'BTM Layout',        fare: 95,  distance: '6.3 km', duration: '25 min', date: '2024-06-22', time: '20:00', status: 'completed', rating: 5 },
  { id: 'ride5', rider: mockRiders[3], driver: mockDrivers[0], pickup: 'Marathahalli Bridge',    drop: 'Bellandur Lake',    fare: 55,  distance: '3.8 km', duration: '16 min', date: '2024-06-22', time: '22:30', status: 'completed', rating: 3 },
  { id: 'ride6', rider: mockRiders[1], driver: mockDrivers[2], pickup: 'Hebbal Flyover',          drop: 'Yelahanka',         fare: 145, distance: '10.2 km',duration: '38 min', date: '2024-06-21', time: '08:00', status: 'cancelled', rating: null },
];

export const mockComplaints = [
  { id: 'c1', rideId: 'ride5', reporter: 'Meera Joshi',  against: 'Sunita Verma', type: 'Route Deviation', description: 'Driver took longer route via unknown roads.', date: '2024-06-22', status: 'investigating', severity: 'medium' },
  { id: 'c2', rideId: 'ride2', reporter: 'Ananya Reddy', against: 'Rekha Patel',  type: 'Rude Behavior',   description: 'Driver was dismissive and refused calls.',   date: '2024-06-23', status: 'open',          severity: 'low'    },
  { id: 'c3', rideId: 'ride4', reporter: 'Priya Sharma', against: 'App Issue',    type: 'Payment Failed',  description: 'Payment deducted but ride shows cancelled.', date: '2024-06-22', status: 'resolved',      severity: 'high'   },
];

export const mockSafetyAlerts = [
  { id: 'sa1', type: 'SOS',            rider: 'Meera Joshi',  driver: 'Sunita Verma', location: 'Marathahalli',   time: '22:31', date: '2024-06-22', status: 'resolved',   details: 'SOS pressed by rider. Driver confirmed safe arrival.' },
  { id: 'sa2', type: 'Route Deviation',rider: 'Priya Sharma', driver: 'Anjali Gupta', location: 'Outer Ring Road', time: '20:05', date: '2024-06-22', status: 'resolved',   details: 'Route deviated 1.8 km. Rider confirmed safe.' },
  { id: 'sa3', type: 'Idle Stop',       rider: 'Kavya Menon',  driver: 'Deepa Nair',   location: 'JP Nagar',        time: '11:35', date: '2024-06-23', status: 'monitoring', details: 'Ride paused >5 min at unscheduled stop. Monitoring.' },
];

export const mockEarnings = [
  { day: 'Mon', amount: 620 },
  { day: 'Tue', amount: 840 },
  { day: 'Wed', amount: 510 },
  { day: 'Thu', amount: 780 },
  { day: 'Fri', amount: 1100 },
  { day: 'Sat', amount: 960 },
  { day: 'Sun', amount: 430 },
];

export const aiInsights = {
  demandZones: [
    { zone: 'Koramangala',  level: 'high',   demand: 94, drivers: 3 },
    { zone: 'Whitefield IT',level: 'high',   demand: 88, drivers: 4 },
    { zone: 'Indiranagar',  level: 'medium', demand: 62, drivers: 6 },
    { zone: 'BTM Layout',   level: 'medium', demand: 57, drivers: 5 },
    { zone: 'Hebbal',       level: 'low',    demand: 31, drivers: 8 },
    { zone: 'Yelahanka',    level: 'low',    demand: 24, drivers: 9 },
  ],
  driverScores: [
    { driver: 'Sunita Verma', score: 98, reason: 'Closest (0.4 km) · 4.9★ · 0 complaints' },
    { driver: 'Anjali Gupta', score: 87, reason: 'Near (1.2 km) · 4.6★ · on-time 96%' },
    { driver: 'Deepa Nair',   score: 74, reason: 'Moderate (2.1 km) · 4.7★ · new driver' },
  ],
  suspiciousPatterns: [
    { rideId: 'ride5', reason: 'Late-night + unfamiliar route + SOS pressed', risk: 'high' },
    { rideId: 'ride6', reason: 'Cancelled mid-route — 3rd time this week',     risk: 'medium' },
  ],
  summary: "Today's peak: 8–10 AM and 6–9 PM. Koramangala & Whitefield have driver shortages. 2 suspicious patterns flagged. Overall safety score: 96/100.",
};

export const nearbyDrivers = [
  { name: 'Sunita V.', dist: '0.4 km', eta: '2 min', rating: 4.9, initials: 'SV' },
  { name: 'Anjali G.', dist: '1.2 km', eta: '5 min', rating: 4.6, initials: 'AG' },
  { name: 'Deepa N.',  dist: '2.1 km', eta: '8 min', rating: 4.7, initials: 'DN' },
];

export const rideRequests = [
  { id: 'req1', rider: mockRiders[0], pickup: 'Koramangala 6th Block', drop: 'MG Road Metro', distance: '5.1 km', fare: 78, eta: '3 min away' },
];
