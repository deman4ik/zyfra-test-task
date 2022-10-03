import { trpc } from "../utils/trpc";
import { useState } from "react";
import { Truck } from "server/data";
import dynamic from "next/dynamic";
import Head from "next/head";

const LeafletMapComponent = dynamic(() => import("../components/Map"), {
    ssr: false
});

export default function Index() {
    const { data: areas } = trpc.areas.useQuery();
    const { data: trajectories } = trpc.trajectories.useQuery();
    const [truck, setTruck] = useState<Truck | null>(null);
    const [subEnabled, setSubEnabled] = useState(false);

    trpc.play.useSubscription(undefined, {
        onData(truck) {
            setTruck(truck);
        },
        enabled: subEnabled
    });

    return (
        <>
            <Head>Zyfra Test Task</Head>
            <LeafletMapComponent
                areas={areas}
                trajectories={trajectories}
                truck={truck}
                onPlayButtonClick={() => setSubEnabled(true)}
            />
        </>
    );
}
