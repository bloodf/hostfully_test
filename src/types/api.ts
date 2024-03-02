export interface HotelAccommodation {
    id: string;
    name: string;
    price: number;
    numberOfBeds: number;
    capacity: number;
    pictureUrl: string;
    reservedDates: string[];
}
