import {useSearchParams} from "react-router-dom";
import {getHotelData} from "@/api/fakeHotel.ts";
import {isWithinInterval, parseISO, startOfDay} from "date-fns";
import {useBookings} from "@/hooks/useBookings.ts";

export const useAccommodations = () => {
    const [searchParams] = useSearchParams();

    const startDate = startOfDay(parseISO(searchParams.get('start') || ''));
    const endDate = startOfDay(parseISO(searchParams.get('end') || ''));
    const {getUserBookings} = useBookings();

    const userBookings = getUserBookings();

    const accommodations = getHotelData().filter((acc) => {
        if (!acc.reservedDates || acc.reservedDates.length === 0) {
            return true;
        }

        const isReservedInDateRange = acc.reservedDates.some((reservedDate) => {
            const parsedReservedDate = parseISO(reservedDate);
            return isWithinInterval(parsedReservedDate, {start: startDate, end: endDate});
        });

        return !isReservedInDateRange;
    });

    const getAvailableAccommodations = () =>  accommodations.filter((accommodation) => {
        return !userBookings?.some((booking) => {
            const bookingStartDate = startOfDay(new Date(booking.startDate));
            const bookingEndDate = startOfDay(new Date(booking.endDate));

            const selectedStartDate = startOfDay(new Date(startDate));
            const selectedEndDate = startOfDay(new Date(endDate));

            const selectedInterval = {start: selectedStartDate, end: selectedEndDate};

            return booking.accommodationId === accommodation.id &&
                (isWithinInterval(bookingStartDate, selectedInterval) ||
                    isWithinInterval(bookingEndDate, selectedInterval));
        });
    });

    return {
        accommodations,
        getAvailableAccommodations,
        startDate,
        endDate,
    }
}
