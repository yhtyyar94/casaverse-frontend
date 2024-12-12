import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Box, Button, Stack, Text, VStack } from "@chakra-ui/react";

// Fix for default marker icon issue with Webpack
const L = typeof window !== "undefined" ? require("leaflet") : null;

if (L) {
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  });
}

const center: [number, number] = [52.00878, 5.575974]; // Replace with your store's latitude and longitude

const MapWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const MarkerWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const PopupWithNoSSR = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const LocationOnGoogleMaps = () => {
  const ref = useRef(null);
  useEffect(() => {}, []);
  return (
    <Stack
      display={"flex"}
      flexDirection={{ base: "column", md: "row" }}
      my={5}
      w={"100%"}
    >
      <VStack
        w={{ base: "100%", md: "35%" }}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box>
          <Text fontWeight={"bold"} mb={5}>
            Casa Verse
          </Text>
          <Text mb={3}>Wageningselaan 50, 3903 LA Veenendaal</Text>
          <Text>Maandag - Vrijdag: 9:00 - 17:00</Text>
          <Text>Zaterdag: 9:00 - 12:00</Text>
          <Text>Zondag: Gesloten</Text>
          <Box mt={5}>
            <Button
              variant={"solid"}
              bg={"black"}
              color={"white"}
              _hover={{ bg: "#febd00" }}
              onClick={() =>
                window.open(
                  "https://www.google.com/maps/dir/?api=1&destination=52.00878,5.575974"
                )
              }
            >
              Routebeschrijving
            </Button>
          </Box>
        </Box>
      </VStack>
      <Stack w={{ base: "100%", md: "60%" }}>
        <MapWithNoSSR
          center={center}
          zoom={15}
          style={{
            height: "400px",
            width: "100%",
            borderRadius: "10px",
            zIndex: 40,
          }}
          ref={ref}
        >
          <TileLayerWithNoSSR url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MarkerWithNoSSR position={center}>
            <PopupWithNoSSR>
              Casa Verse <br /> Wageningselaan 50, <br /> 3903 LA Veenendaal
            </PopupWithNoSSR>
          </MarkerWithNoSSR>
        </MapWithNoSSR>
      </Stack>
    </Stack>
  );
};

export default LocationOnGoogleMaps;
