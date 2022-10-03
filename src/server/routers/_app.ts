/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from "../trpc";

import { observable } from "@trpc/server/observable";
import { clearInterval } from "timers";
import { Area, readFile, Trajectory, Truck } from "../data";

export const appRouter = t.router({
    areas: t.procedure.query(async () => {
        const areas = await readFile<Area[]>("areas");
        return areas;
    }),
    trajectories: t.procedure.query(async () => {
        const trajectories = await readFile<Trajectory[]>("trajectories");
        return trajectories;
    }),
    truck: t.procedure.query(async () => {
        const truck = await readFile<Truck>("truck");
        return truck;
    }),
    play: t.procedure.subscription(async () => {
        const truck = await readFile<Truck>("truck");

        let position_log_index = 0;
        return observable<Truck>((emit) => {
            const int = setInterval(() => {
                emit.next({ ...truck, position_log: [truck.position_log[position_log_index]] });
                position_log_index++;
                if (position_log_index >= truck.position_log.length) clearInterval(int);
            }, 1000);

            return () => {
                clearInterval(int);
            };
        });
    })
});

export type AppRouter = typeof appRouter;
