import {HotelAccommodation} from "../types/api.ts";

export function getHotelData(): HotelAccommodation[] {
    return [
        {
            id: "1",
            name: "Ocean View Suite",
            price: 250,
            numberOfBeds: 2,
            capacity: 4,
            pictureUrl: "https://via.placeholder.com/350?text=Ocean+View+Suite",
            reservedDates: ['2024-03-18',
                '2024-03-19',
                '2024-03-20',],
        },
        {
            id: "2",
            name: "Mountain Retreat",
            price: 300,
            numberOfBeds: 3,
            capacity: 6,
            pictureUrl: "https://via.placeholder.com/350?text=Mountain+Retreat",
            reservedDates: [
                '2024-04-18',
                '2024-04-19',
                '2024-04-20',
            ],
        },
        {
            id: "3",
            name: "City Loft",
            price: 200,
            numberOfBeds: 1,
            capacity: 2,
            pictureUrl: "https://via.placeholder.com/350?text=City+Loft",
            reservedDates: [
                '2024-05-18',
                '2024-05-19',
                '2024-05-20',
            ],
        },
        {
            id: "4",
            name: "Country House",
            price: 400,
            numberOfBeds: 4,
            capacity: 8,
            pictureUrl: "https://via.placeholder.com/350?text=Country+House",
            reservedDates: [
                '2024-06-18',
                '2024-06-19',
                '2024-06-20',
            ],
        },
        {
            id: "5",
            name: "Beach Bungalow",
            price: 350,
            numberOfBeds: 2,
            capacity: 4,
            pictureUrl: "https://via.placeholder.com/350?text=Beach+Bungalow",
            reservedDates: [
            ],
        }
    ];
}
