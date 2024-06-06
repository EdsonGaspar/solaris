"use client";

import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  // DrawerDescription,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useMyPosition } from "@/hooks/useMyPosition";
import { useMap } from "@/hooks/useMap";
import { getRoute, useDirection } from "@/hooks/useDirection";
import { useSetRefreshPoitMarker } from "@/hooks/useSetRefreshPointMarker";
import { useGetRefreshPoint } from "@/hooks/useGetRefreshPoint";
import { cn } from "@/lib/utils";
import PontoRefrescamento from "@/@types/PontoRefrescamento";

const token =
  "pk.eyJ1Ijoic2t5LTIwMjQiLCJhIjoiY2x3eG5lcmZpMWNpNzJucjFoN2dwYnFiMSJ9.4IEOvqX3dGRZpyHPx-MD9g";
mapboxgl.accessToken = token;

export default function Home() {
  const mapContainer = useRef(null);
  const { map } = useMap("map");
  const { setTracking, tracking } = useDirection(token, map);
  useSetRefreshPoitMarker(map);
  const [data, setData] = useState<any>();

  useMyPosition(map, (lng, lat) => {
    setTracking((prev) => ({ ...prev, start: [lng, lat] }));
  });

  const [refreshCoords, setRefreshCoords] = useState([0, 0]);

  const { pontos, setPointSelected } = useGetRefreshPoint();
  const [refrescamento, setPonto] = useState<PontoRefrescamento>();

  // useEffect(() => {
  //   if (map) {
  //     map.on("click", (evt) => {
  //       console.log({
  //         lat: evt.lngLat.lat,
  //         lng: evt.lngLat.lng,
  //       });
  //     });
  //   }
  // }, [map]);

  // useEffect(() => {
  //   if (map) {
  //     myMarker.current?.remove();
  //     myMarker.current = new mapboxgl.Marker({})
  //       .setLngLat([coords.lng, coords.lat])
  //       .addTo(map!);
  //     map.on("style.load", () => {
  //       map.addLayer({
  //         id: "route",
  //         type: "line",
  //         source: {
  //           type: "geojson",
  //           data: {
  //             type: "Feature",
  //             properties: {},
  //             geometry: {
  //               type: "LineString",
  //               coordinates: [
  //   [
  //     13.254653,
  //     -8.873806
  //   ],
  //   [
  //     13.254883,
  //     -8.874103
  //   ],
  //   [
  //     13.255078,
  //     -8.874011
  //   ],
  //   [
  //     13.255358,
  //     -8.880502
  //   ],
  //   [
  //     13.250982,
  //     -8.883253
  //   ],
  //   [
  //     13.25134,
  //     -8.883577
  //   ],
  //   [
  //     13.255401,
  //     -8.880858
  //   ],
  //   [
  //     13.26706,
  //     -8.875321
  //   ],
  //   [
  //     13.270681,
  //     -8.87544
  //   ],
  //   [
  //     13.279929,
  //     -8.878078
  //   ],
  //   [
  //     13.287619,
  //     -8.880797
  //   ],
  //   [
  //     13.28952,
  //     -8.880869
  //   ],
  //   [
  //     13.299876,
  //     -8.887382
  //   ],
  //   [
  //     13.299773,
  //     -8.887566
  //   ],
  //   [
  //     13.325042,
  //     -8.9032
  //   ],
  //   [
  //     13.320792,
  //     -8.909828
  //   ],
  //   [
  //     13.320318,
  //     -8.909506
  //   ],
  //   [
  //     13.322832,
  //     -8.911388
  //   ],
  //   [
  //     13.373022,
  //     -8.944193
  //   ],
  //   [
  //     13.373185,
  //     -8.944366
  //   ]
  // ],
  //             },
  //           },
  //         },
  //         layout: {
  //           "line-join": "round",
  //           "line-cap": "round",
  //         },
  //         paint: {
  //           "line-color": "#00f",
  //           "line-width": 4,
  //         },
  //       });
  //     });
  //   }

  //   async function getDirection() {
  //     const start = [13.2439512, -8.8272699],
  //       end = [13.373148, -8.9444];

  //     const res = await fetch(
  //       `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}.json?geometries=geojson&steps=true&access_token=${token}`
  //     );

  //     // "https://api.mapbox.com/directions/v5/mapbox/driving/13.2439512,-8.8272699;13.373148,-8.90444.json?geometries=polyline&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg";
  //     // https://api.mapbox.com/directions/v5/mapbox/driving/13.2439512%2C-8.8272699%3B13.373148%2C-8.90444.json?geometries=polyline&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg

  //     if (res.ok) {
  //       const directions = await res.json();
  //       // console.log(directions);
  //       const data = directions.routes[0];
  //       const route = data.geometry;

  //       map?.on("load", function () {
  //         map.addLayer({
  //           id: "route",
  //           type: "line",
  //           source: {
  //             type: "geojson",
  //             data: {
  //               type: "Feature",
  //               properties: {},
  //               geometry: {
  //                 type: "LineString",
  //                 coordinates: route,
  //               },
  //             },
  //           },
  //           layout: {
  //             "line-join": "round",
  //             "line-cap": "round",
  //           },
  //           paint: {
  //             "line-color": "#3887be",
  //             "line-width": 5,
  //             "line-opacity": 0.75,
  //           },
  //         });
  //         // map.fitBounds(route, { padding: 20 });
  //       });

  //       // if (map?.getSource("route")) {
  //       //   map.getSource("route").setData(geojson);
  //       // }
  //     }
  //   }
  //   // getDirection();
  // }, [map, coords]);

  return (
    <main className="h-screen w-screen sm:w-80 sm:mx-auto sm:shadow-md relative overflow-hidden bg-[url('/images/map.png')] bg-cover bg-center">
      <div
        ref={mapContainer}
        id="map"
        className="map-container w-full sm:max-w-80 h-full"
      />
      {/* top location */}
      <div className="absolute top-0 left-0 w-full p-4">
        <div className="w-full bg-white/80 backdrop-blur-sm rounded flex flex-col gap-1 p-3 shadow-md">
          <div className="">
            {/* <p className="text-slate-400 font-bold text-sm p-2 pb-0">
              Localização actual
            </p> */}
            <div className="flex flex-row items-center gap-2 p-2">
              <span
              // onClick={() => {
              //   window.navigator.geolocation.getCurrentPosition(
              //     (evt) => {
              //       setCoords(() => ({
              //         lng: evt.coords.longitude,
              //         lat: evt.coords.latitude,
              //       }));

              //       setTracking((prev) => {
              //         return {
              //           ...prev,
              //           start: [evt.coords.longitude, evt.coords.latitude],
              //           end: [13.373148, -8.9444],
              //         };
              //       });
              //     },
              //     (err) => {
              //       alert("Não possível obter sua localização");
              //     }
              //   );
              // }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-slate-400"
                  fill="currentColor"
                >
                  <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z" />
                </svg>
              </span>
              <input
                type="text"
                name="my-location"
                id="my-location"
                className="w-full bg-transparent border-b p-2 pb-0 pl-0 outline-none"
                placeholder="Localização actual"
                value={`${tracking.start ? tracking.start[0] : ""},${
                  tracking.start ? tracking.start[1] : ""
                }`}
                disabled
              />
            </div>
          </div>
          {/* <div className="border border-dashed mx-4"></div> */}
          <div className="">
            {/* <p className="text-slate-400 font-bold text-sm p-2 pb-0">
              Localização actual
            </p> */}
            <div className="flex flex-row items-center gap-2 p-2 pt-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 fill-slate-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 20H5V21C5 21.5523 4.55228 22 4 22H3C2.44772 22 2 21.5523 2 21V11L4.4805 5.21216C4.79566 4.47679 5.51874 4 6.31879 4H17.6812C18.4813 4 19.2043 4.47679 19.5195 5.21216L22 11V21C22 21.5523 21.5523 22 21 22H20C19.4477 22 19 21.5523 19 21V20ZM20 13H4V18H20V13ZM4.17594 11H19.8241L17.6812 6H6.31879L4.17594 11ZM6.5 17C5.67157 17 5 16.3284 5 15.5C5 14.6716 5.67157 14 6.5 14C7.32843 14 8 14.6716 8 15.5C8 16.3284 7.32843 17 6.5 17ZM17.5 17C16.6716 17 16 16.3284 16 15.5C16 14.6716 16.6716 14 17.5 14C18.3284 14 19 14.6716 19 15.5C19 16.3284 18.3284 17 17.5 17Z" />
              </svg>
              <input
                type="text"
                name="refresh-location"
                id="refresh-location"
                disabled
                className="w-full bg-transparent border-b p-2 pb-0 pl-0 outline-none"
                placeholder="Localização refrescamento"
                value={refreshCoords.join(",")}
              />
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 rounded-t-md bg-white/80 backdrop-blur z-10">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="block w-full px-4 py-3 bg-blue-600 rounded text-slate-50">
              Detalhes
            </button>
          </DrawerTrigger>
          <DrawerContent className="sm:w-80 sm:mx-auto">
            {/* <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader> */}
            <Tabs defaultValue="refresh" className="w-full sm:w-80 mt-2 p-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="refresh">Refrescamento</TabsTrigger>
                <TabsTrigger value="tracking">Trajecto</TabsTrigger>
              </TabsList>
              <TabsContent value="refresh">
                <ul className="max-h-40 overflow-auto">
                  {pontos.map((ponto) => (
                    <li
                      key={ponto.id}
                      className="flex flex-row items-start gap-2 py-3 px-2 border-b last:border-b-0 bg-slate-100 rounded  "
                    >
                      <svg
                        className="w-5 h-5 fill-slate-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 3.09723L7.05025 8.04697C4.31658 10.7806 4.31658 15.2128 7.05025 17.9465C9.78392 20.6801 14.2161 20.6801 16.9497 17.9465C19.6834 15.2128 19.6834 10.7806 16.9497 8.04697L12 3.09723ZM12 0.268799L18.364 6.63276C21.8787 10.1475 21.8787 15.846 18.364 19.3607C14.8492 22.8754 9.15076 22.8754 5.63604 19.3607C2.12132 15.846 2.12132 10.1475 5.63604 6.63276L12 0.268799Z" />
                      </svg>
                      <div className="w-full flex flex-col gap-2">
                        <p className="text-sm font-bold">{ponto.nome}</p>
                        <div className="flex flex-row gap-2">
                          <span className="flex flex-row items-center">
                            <svg
                              className="w-4 h-4 fill-slate-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 11C14.7614 11 17 13.2386 17 16V22H15V16C15 14.4023 13.7511 13.0963 12.1763 13.0051L12 13C10.4023 13 9.09634 14.2489 9.00509 15.8237L9 16V22H7V16C7 13.2386 9.23858 11 12 11ZM5.5 14C5.77885 14 6.05009 14.0326 6.3101 14.0942C6.14202 14.594 6.03873 15.122 6.00896 15.6693L6 16L6.0007 16.0856C5.88757 16.0456 5.76821 16.0187 5.64446 16.0069L5.5 16C4.7203 16 4.07955 16.5949 4.00687 17.3555L4 17.5V22H2V17.5C2 15.567 3.567 14 5.5 14ZM18.5 14C20.433 14 22 15.567 22 17.5V22H20V17.5C20 16.7203 19.4051 16.0796 18.6445 16.0069L18.5 16C18.3248 16 18.1566 16.03 18.0003 16.0852L18 16C18 15.3343 17.8916 14.694 17.6915 14.0956C17.9499 14.0326 18.2211 14 18.5 14ZM5.5 8C6.88071 8 8 9.11929 8 10.5C8 11.8807 6.88071 13 5.5 13C4.11929 13 3 11.8807 3 10.5C3 9.11929 4.11929 8 5.5 8ZM18.5 8C19.8807 8 21 9.11929 21 10.5C21 11.8807 19.8807 13 18.5 13C17.1193 13 16 11.8807 16 10.5C16 9.11929 17.1193 8 18.5 8ZM5.5 10C5.22386 10 5 10.2239 5 10.5C5 10.7761 5.22386 11 5.5 11C5.77614 11 6 10.7761 6 10.5C6 10.2239 5.77614 10 5.5 10ZM18.5 10C18.2239 10 18 10.2239 18 10.5C18 10.7761 18.2239 11 18.5 11C18.7761 11 19 10.7761 19 10.5C19 10.2239 18.7761 10 18.5 10ZM12 2C14.2091 2 16 3.79086 16 6C16 8.20914 14.2091 10 12 10C9.79086 10 8 8.20914 8 6C8 3.79086 9.79086 2 12 2ZM12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6C14 4.89543 13.1046 4 12 4Z" />
                            </svg>
                            <span className="ml-2 text-sm font-bold">
                              {ponto.numero_actual_pessoas}
                            </span>
                          </span>
                          <span className="border-r"></span>
                          <span className="flex flex-row items-center">
                            <svg
                              className="w-4 h-4 fill-slate-600"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" />
                            </svg>

                            <span
                              className={cn(
                                "ml-2 text-sm text-green-600 font-bold",
                                ponto.estado === "CHEIO" && "text-orange-600",
                                ponto.estado === "INDISPONÍVEL" &&
                                  "text-red-600"
                              )}
                            >
                              {ponto.estado}
                            </span>
                          </span>
                        </div>
                      </div>
                      <button
                        disabled={
                          ponto.estado !== "FUNCIONAL" ||
                          ponto.id === refrescamento?.id
                        }
                        onClick={() => {
                          const { start } = tracking;

                          if (map && start) {
                            setPonto(ponto);
                            setRefreshCoords([
                              ponto.coords.lng,
                              ponto.coords.lat,
                            ]);
                            const data = {
                              type: "FeatureCollection",
                              features: [
                                {
                                  type: "Feature",
                                  properties: {},
                                  geometry: {
                                    type: "Point",
                                    coordinates: [
                                      ponto.coords.lng,
                                      ponto.coords.lat,
                                    ],
                                  },
                                },
                              ],
                            };
                            if (map.getLayer("end")) {
                              (map.getSource("end") as any).setData(data);
                            } else {
                              map.addLayer({
                                id: "end",
                                type: "circle",
                                source: {
                                  type: "geojson",
                                  data: {
                                    type: "FeatureCollection",
                                    features: [
                                      {
                                        type: "Feature",
                                        properties: {},
                                        geometry: {
                                          type: "Point",
                                          coordinates: [
                                            ponto.coords.lng,
                                            ponto.coords.lat,
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                                paint: {
                                  "circle-radius": 10,
                                  "circle-color": "#f30",
                                },
                              });
                            }
                            getRoute(map, start, [
                              ponto.coords.lng,
                              ponto.coords.lat,
                            ]).then(setData);
                          }
                          //   && map.on("click", (event) => {
                          //   console.log("olad");

                          //   // const coords = Object.keys(event.lngLat).map(
                          //   //   (key) => event.lngLat[key]
                          //   // );

                          // });
                        }}
                        className={cn(
                          "text-xs bg-blue-600 p-2 text-slate-50 rounded self-center disabled:cursor-not-allowed disabled:bg-slate-400"
                        )}
                      >
                        Selecionar
                      </button>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              {/* rastremento de ponto */}
              <TabsContent value="tracking">
                <ul className="space-y-2 text-sm">
                  <li className="">
                    Distância:{" "}
                    <span className="font-bold">
                      {data?.distance && (data?.distance / 1000).toFixed(1)} km
                    </span>
                  </li>
                  <li className="">
                    Tempo:{" "}
                    <span className="font-bold">
                      {data?.distance && (data?.duration / 60).toFixed(0)} min
                    </span>
                  </li>
                  <li className="border-t pt-2">
                    <span className="mb-2 inline-block">Detalhe do ponto</span>
                    <ul className="pl-4 space-y-2">
                      <li>
                        Pessoas:{" "}
                        <span className="font-bold">
                          {refrescamento?.numero_actual_pessoas}
                        </span>
                      </li>
                      <li>
                        Estado:{" "}
                        <span
                          className={cn(
                            "ml-2 text-sm text-green-600 font-bold",
                            refrescamento?.estado === "CHEIO" &&
                              "text-orange-600",
                            refrescamento?.estado === "INDISPONÍVEL" &&
                              "text-red-600"
                          )}
                        >
                          {refrescamento?.estado}
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </TabsContent>
            </Tabs>

            {/* <DrawerFooter>
              <DrawerClose>
                <button>aol</button>
              </DrawerClose>
            </DrawerFooter> */}
          </DrawerContent>
        </Drawer>
      </div>
    </main>
  );
}
