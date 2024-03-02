import { useState } from 'react';
import { DateRange } from "react-day-picker";
import { HotelAccommodation } from "@/types/api";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/UI/Select.tsx";
import { Button } from "@/components/UI/Button";
import { format, differenceInCalendarDays } from "date-fns";

const AccommodationCard = ({
                               accommodation,
                               isBooked,
                               guests,
                               bookedDates,
                               onCancel,
                               onUpdate,
                               onSave,
                           }: {
    accommodation: HotelAccommodation;
    isBooked: boolean;
    guests?: number | string;
    bookedDates?: DateRange;
    onCancel?: () => void;
    onUpdate?: () => void;
    onSave?: (accommodation: HotelAccommodation, guests: number) => void;
}) => {
    const [guestNumber, setGuestNumber] = useState(guests || 1);

    const handleSave = () => {
        onSave?.(accommodation, Number(guestNumber));
    };

    const formattedDates = bookedDates && bookedDates.from && bookedDates.to ? `${format(bookedDates.from, 'MM/dd/yyyy')} - ${format(bookedDates.to, 'MM/dd/yyyy')}` : '';
    const nights = bookedDates && bookedDates.from && bookedDates.to ? differenceInCalendarDays(bookedDates.to, bookedDates.from) : 0;
    const totalCost = accommodation.price * nights;

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg m-4">
            <img src={accommodation.pictureUrl} alt={accommodation.name} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h3 className="text-2xl font-bold">{accommodation.name}</h3>
                {!isBooked && <p className="text-xl text-gray-700">${accommodation.price} / night</p>}
                {!isBooked && <p>{accommodation.numberOfBeds} beds · Up to {accommodation.capacity} guests</p>}
                {isBooked && <p className="text-xl text-gray-700">${totalCost} for {nights} nights</p>}

                {isBooked && bookedDates && (
                    <div className="mt-4">
                        <p className="text-sm">Booked Dates: <span className="font-semibold">{formattedDates}</span></p>
                        <p className="text-sm">Number of guests: {guests}</p>
                    </div>
                )}

                {!isBooked && (
                    <div className="mt-4 flex items-center space-x-2">
                        <label className="block">Number of guests:</label>
                        <Select onValueChange={(v) => setGuestNumber(Number(v))}>
                            <SelectTrigger className="w-auto border rounded-md p-2">
                                <SelectValue placeholder="Guests" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(accommodation.capacity + 1).keys()].slice(1).map((number) => (
                                    <SelectItem key={number} value={`${number}`}>{number}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}

                <div className="flex space-x-2 mt-4">
                    {!isBooked && (
                        <Button onClick={handleSave}>
                            Book
                        </Button>
                    )}
                    {isBooked && (
                        <>
                            <Button onClick={onUpdate}>
                                Update
                            </Button>
                            <Button variant="destructive" onClick={onCancel}>
                                Cancel
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AccommodationCard;
