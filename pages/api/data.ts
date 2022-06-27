import type { NextApiRequest, NextApiResponse } from "next";

import data from "../../src/__nemazat/data.json";

export interface ApiResponse {
    count: number;
    items: Product[];
}

export interface Product {
    location: string;
    instantBookable: boolean;
    name: string;
    passengersCapacity: number;
    sleepCapacity: number;
    price: number;
    vehicleType: string;
    toilet: boolean;
    shower: boolean;
    pictures: string[];
}

export function getData() {
    // The API can randomly error
    if (Math.random() < 0.2) {
        return false;
    }

    // const getRandomInt = (max: number) => {
    //     return Math.floor(Math.random() * max);
    // };

    const newData: ApiResponse = {
        count: 30,
        items: data.items.map(
            ({
                location,
                instantBookable,
                name,
                passengersCapacity,
                pictures,
                sleepCapacity,
                price,
                toilet,
                shower,
                vehicleType,
            }) => {
                return {
                    location,
                    instantBookable,
                    name,
                    passengersCapacity,
                    sleepCapacity,
                    price,
                    vehicleType,
                    toilet,
                    shower,
                    // toilet: [true, false][getRandomInt(2)],
                    // shower: [true, false][getRandomInt(2)],
                    // vehicleType: ['Campervan', 'Intergrated', 'Alcove', 'BuiltIn'][getRandomInt(4)],
                    pictures,
                };
            },
        ),
    };

    return newData;
}

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    const newData = getData();
    if (newData === false) {
        return res.status(500).end();
    }
    return res.status(200).json(newData);
}
