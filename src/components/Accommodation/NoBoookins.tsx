import {ReactNode} from 'react';

const NoBookings = ({children}: { children: ReactNode }) => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">You Have No Bookings Yet</h2>
            <p className="mb-4">
                Looks like you haven't made any bookings with us yet. Start exploring available
                accommodations to make your first booking.
            </p>
            <hr className="my-3"/>
            <h3 className="text-xl font-bold mb-4">
                Find new accommodations to book
            </h3>
            <div className="flex justify-center">
                {children}
            </div>
        </div>
    );
};

export default NoBookings;
