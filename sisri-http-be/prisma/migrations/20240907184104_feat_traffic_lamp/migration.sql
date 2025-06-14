-- CreateEnum
CREATE TYPE "Quality" AS ENUM ('GOOD', 'MILD', 'UNHEALTHY', 'VERY_UNHEALTHY', 'DANGEROUS');

-- CreateEnum
CREATE TYPE "Direction" AS ENUM ('NORTH', 'SOUTH', 'WEST', 'EAST', 'NORTH_EAST', 'NORTH_WEST', 'SOUTH_EAST', 'SOUTH_WEST');

-- CreateTable
CREATE TABLE "Junction" (
    "id" TEXT NOT NULL,
    "junction_num" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Junction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Road" (
    "id" TEXT NOT NULL,
    "road_name" TEXT NOT NULL,
    "road_length" DOUBLE PRECISION NOT NULL,
    "air_quality_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Road_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadLane" (
    "id" TEXT NOT NULL,
    "direction" "Direction" NOT NULL,
    "lane_num" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "road_id" TEXT NOT NULL,
    "lane_traffic_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadLane_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaneTraffic" (
    "id" TEXT NOT NULL,
    "traffic_flow" DOUBLE PRECISION NOT NULL,
    "vehicle_num" INTEGER NOT NULL,
    "detection_range" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LaneTraffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficViolation" (
    "id" TEXT NOT NULL,
    "detail" TEXT,
    "image_url" TEXT,
    "road_lane_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficViolation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadCctv" (
    "id" TEXT NOT NULL,
    "road_lane_id" TEXT NOT NULL,
    "junction_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadCctv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrafficLamp" (
    "id" TEXT NOT NULL,
    "green_duration" INTEGER NOT NULL DEFAULT 20,
    "yellow_duration" INTEGER NOT NULL DEFAULT 3,
    "red_duration" INTEGER NOT NULL DEFAULT 99,
    "order" INTEGER NOT NULL DEFAULT 1,
    "road_cctv_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrafficLamp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AirQuality" (
    "id" TEXT NOT NULL,
    "pm1" DOUBLE PRECISION NOT NULL,
    "pm10" DOUBLE PRECISION NOT NULL,
    "pm25" DOUBLE PRECISION NOT NULL,
    "co" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "ozone" DOUBLE PRECISION NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "pressure" DOUBLE PRECISION NOT NULL,
    "aqi" INTEGER NOT NULL,
    "quality" "Quality" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AirQuality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebRoadSearch" (
    "id" TEXT NOT NULL,
    "start_coor" DOUBLE PRECISION NOT NULL,
    "destination_coor" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebRoadSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JunctionToRoad" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JunctionToRoad_AB_unique" ON "_JunctionToRoad"("A", "B");

-- CreateIndex
CREATE INDEX "_JunctionToRoad_B_index" ON "_JunctionToRoad"("B");

-- AddForeignKey
ALTER TABLE "Road" ADD CONSTRAINT "Road_air_quality_id_fkey" FOREIGN KEY ("air_quality_id") REFERENCES "AirQuality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadLane" ADD CONSTRAINT "RoadLane_road_id_fkey" FOREIGN KEY ("road_id") REFERENCES "Road"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadLane" ADD CONSTRAINT "RoadLane_lane_traffic_id_fkey" FOREIGN KEY ("lane_traffic_id") REFERENCES "LaneTraffic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrafficViolation" ADD CONSTRAINT "TrafficViolation_road_lane_id_fkey" FOREIGN KEY ("road_lane_id") REFERENCES "RoadLane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadCctv" ADD CONSTRAINT "RoadCctv_road_lane_id_fkey" FOREIGN KEY ("road_lane_id") REFERENCES "RoadLane"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadCctv" ADD CONSTRAINT "RoadCctv_junction_id_fkey" FOREIGN KEY ("junction_id") REFERENCES "Junction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrafficLamp" ADD CONSTRAINT "TrafficLamp_road_cctv_id_fkey" FOREIGN KEY ("road_cctv_id") REFERENCES "RoadCctv"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JunctionToRoad" ADD CONSTRAINT "_JunctionToRoad_A_fkey" FOREIGN KEY ("A") REFERENCES "Junction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JunctionToRoad" ADD CONSTRAINT "_JunctionToRoad_B_fkey" FOREIGN KEY ("B") REFERENCES "Road"("id") ON DELETE CASCADE ON UPDATE CASCADE;
