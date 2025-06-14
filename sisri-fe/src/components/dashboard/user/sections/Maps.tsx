"use client";
import {
  Autocomplete,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
// import { CiLocationArrow1 } from "react-icons/ci";
import { FaCar, FaMapMarkerAlt } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";

// import { IoMdClose } from "react-icons/io";
import Button from "@/components/buttons/Button";
import IconButton from "@/components/buttons/IconButton";
import Input from "@/components/forms/Input";
import Typography from "@/components/Typography";

type MapsForm = {
  originRef: string;
  destinationRef: string;
};

type Library = "places";

const libraries: Library[] = ["places"];

const Maps = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries,
  });

  const center = { lat: -7.250445, lng: 112.768845 };

  // const [map, setMap] = useState<google.maps.Map | null>(null);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const [directionsResponse, setDirectionsResponse] = useState<any | null>(
    null,
  );

  const methods = useForm<MapsForm>({ mode: "onTouched" });
  const { handleSubmit } = methods;

  const [routeIndex, setRouteIndex] = useState(0);

  const onSubmit: SubmitHandler<MapsForm> = async (data) => {
    const directionsService = new google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: data.originRef,
      destination: data.destinationRef,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    });

    setDirectionsResponse(results);
    setRouteIndex(0);
  };

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   reset();
  // }

  if (!isLoaded) return <></>;

  return (
    <>
      <section className="flex h-auto flex-col md:flex-row">
        <div className="relative top-0 flex h-auto w-full flex-col gap-8 overflow-auto bg-white p-8 shadow-lg md:sticky md:h-screen md:w-full md:translate-x-0">
          <div className="mx-auto flex w-full flex-col justify-center gap-6 md:w-10/12">
            <Link href="/">
              <Image
                src="/images/LOGO-PRIMARY.png"
                width={75}
                height={75}
                alt="logo"
              />
            </Link>
            <Typography variant="h2" weight="bold">
              SISRI Dashboard Maps
            </Typography>
            <Typography>
              Temukan destinasi sesuai dengan kebutuhan harianmu secara{" "}
              <span className="font-bold">cepat</span> bersama Sisri Maps
            </Typography>
          </div>

          <FormProvider {...methods}>
            <form
              className="mx-auto flex w-full flex-col gap-4 md:w-10/12"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Autocomplete>
                <Input
                  leftIcon={FaRegCircleDot}
                  id="originRef"
                  label="From"
                  placeholder="e.g. ITS Surabaya"
                  validation={{ required: "Field must be filled" }}
                />
              </Autocomplete>
              <Autocomplete>
                <Input
                  leftIcon={FaMapMarkerAlt}
                  id="destinationRef"
                  label="To"
                  placeholder="e.g. Galaxy Mall"
                  validation={{ required: "Field must be filled" }}
                />
              </Autocomplete>
              <Button
                variant="blue"
                type="submit"
                className="mt-4 flex w-full justify-center"
              >
                Go
              </Button>
            </form>
          </FormProvider>

          {/* <div className="flex items-center justify-center gap-2">
            <IconButton icon={IoMdClose} onClick={clearRoute} variant="red" />
            <IconButton
              icon={CiLocationArrow1}
              onClick={() => map?.panTo(center)}
              variant="secondary"
            />
          </div> */}

          {directionsResponse && (
            <div className="mx-auto mt-4 w-full space-y-4 md:w-10/12">
              {directionsResponse.routes.map((route: any, index: number) => (
                <div
                  key={index}
                  onClick={() => setRouteIndex(index)}
                  className={`${routeIndex === index ? "bg-blue-main/30" : "bg-blue-main/10 hover:bg-blue-main/20 active:bg-blue-main/40"} flex w-full cursor-pointer items-center gap-2 rounded p-3`}
                >
                  <IconButton
                    icon={FaCar}
                    classNames={{ icon: "text-lg text-black" }}
                  />
                  <div className="space-y-1">
                    <div>{route.summary}</div>
                    <div className="font-semibold">
                      {route.legs[0].distance.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="h-[50vh] w-full md:h-[100vh]">
          <GoogleMap
            mapContainerStyle={{
              height: "100%",
              width: "100%",
            }}
            center={center}
            zoom={10}
            // onLoad={(map) => setMap(map)}
          >
            <>
              <Marker position={center} />
              {directionsResponse && (
                <DirectionsRenderer
                  directions={directionsResponse}
                  routeIndex={routeIndex}
                />
              )}
            </>
          </GoogleMap>
        </div>
      </section>
    </>
  );
};

export default Maps;
