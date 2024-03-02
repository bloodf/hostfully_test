export interface Booking {
    id: string;
    startDate: Date | string;
    endDate: Date | string;
    price?: number;
    guests: number;
    accommodationId?: string;
    userEmail: string;
    status: 'booked' | 'updatedBooking' | 'canceled';
    createdAt: Date | string;
    updatedAt: Date | string | null;
    removedAt: Date | string | null;
}
