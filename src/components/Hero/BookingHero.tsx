import {ReactNode} from "react";

const BookingHero = ({children}: {children: ReactNode}) => (<div className="bg-gray-100">
    <div className="container mx-auto px-4 py-12 flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 px-5">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Discover Amazing Places</h1>
            <p className="text-lg mb-6">Explore the best accommodations in your favorite locations
                and make unforgettable memories.</p>
            <div className="flex space-x-2">
                {children}
            </div>
        </div>
        <div className="w-full md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img src="./hotel.png" alt="Travel"
                 className="rounded-lg shadow-lg"/>
        </div>
    </div>
</div>);

export default BookingHero;
