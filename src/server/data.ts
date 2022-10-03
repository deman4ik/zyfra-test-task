import { promises as fs } from "fs";
import { join } from "path";

const DATA_PATH = join(process.cwd(), "data");

export interface Coordinates {
    lat: number;
    lon: number;
}

export interface Area {
    id: number;
    type: "load" | "unload";
    name: string;
    bounds: Coordinates[];
}

export interface Trajectory {
    id: number;
    name: string;
    points: Coordinates[];
}

export interface Truck {
    id: number;
    name: string;
    position_log: Coordinates[];
}

export async function readFile<T>(type: "areas" | "trajectories" | "truck"): Promise<T> {
    const fileData = await fs.readFile(`${DATA_PATH}/test-task-${type}.json`, "utf-8");

    const parsedData = JSON.parse(fileData);

    return parsedData as T;
}
