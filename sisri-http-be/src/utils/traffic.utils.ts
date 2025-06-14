export const getTrafficSeverity = (
  traffic_flow: number,
  detection_range: number,
  vehicle_number: number,
) => {
  const trafficStatus =
    traffic_flow > 0 ? vehicle_number / (detection_range * traffic_flow) : 99;

  return trafficStatus;
};

export const countGreentime = (
  vehicle_number: number,
  lane_number: number,
): number => {
  const vehicleJunctionTime = 100;

  const greenSignalTime =
    (vehicle_number * vehicleJunctionTime) / (lane_number + 1);

  return greenSignalTime;
};

export const defaultTrafficTime = {
  green: 20,
  yellow: 3,
  red: 99,
};
