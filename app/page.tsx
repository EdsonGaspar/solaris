"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function Home() {
  const [coords, setCoords] = useState<{ lng: number; lat: number }>({
    lat: 0,
    lng: 0,
  });

  return (
    <main className="h-screen w-screen sm:w-80 sm:mx-auto sm:shadow-md relative overflow-hidden bg-[url('/images/map.png')] bg-cover bg-center">
      {/* <Image src={"/images/map.png"} alt={"map"} width={600} height={600}  className="absolute aspect-square"  /> */}
      {/* top location */}
      <div className="absolute top-0 left-0 w-full p-4">
        <div className="w-full bg-white/80 backdrop-blur-sm rounded flex flex-col gap-1 p-3 shadow-md">
          <div className="">
            {/* <p className="text-slate-400 font-bold text-sm p-2 pb-0">
              Localização actual
            </p> */}
            <div className="flex flex-row items-center gap-2 p-2">
              <button
                onClick={() => {
                  window.navigator.geolocation.getCurrentPosition(
                    (evt) => {
                      setCoords(() => ({
                        lng: evt.coords.longitude,
                        lat: evt.coords.latitude,
                      }));
                    },
                    (err) => {
                      console.error("Não possível obter sua localização");
                    }
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 fill-slate-400"
                  fill="currentColor"
                >
                  <path d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z" />
                </svg>
              </button>
              <input
                type="text"
                name="my-location"
                id="my-location"
                className="w-full bg-transparent border-b p-2 pb-0 pl-0 outline-none"
                placeholder="Localização actual"
                value={`${coords?.lat},${coords?.lng}`}
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
                className="w-full bg-transparent border-b p-2 pb-0 pl-0 outline-none"
                placeholder="Localização refrescamento"
              />
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 rounded-t-md bg-white/80 backdrop-blur">
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
            <Tabs defaultValue="account" className="w-full sm:w-80 mt-2 p-3">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Refrescamento</TabsTrigger>
                <TabsTrigger value="password">Trajecto</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="password">
                Change your password here.
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
