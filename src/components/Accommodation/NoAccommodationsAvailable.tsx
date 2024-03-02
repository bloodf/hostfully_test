import {ReactNode} from 'react';
import { format } from 'date-fns';

const NoAccommodationsAvailable = ({ startDate, endDate, children }: { startDate: Date, endDate:Date, children: ReactNode }) => {
    return (
        <div className="container mx-auto p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">No Accommodations Available</h2>
            <p className="mb-4">
                Unfortunately, there are no accommodations available from{' '}
                <span className="font-semibold">{format(startDate, 'PPP')}</span> to{' '}
                <span className="font-semibold">{format(endDate, 'PPP')}</span>.
            </p>
            <div className="mb-4">
                Please try different dates or adjust your search criteria.
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default NoAccommodationsAvailable;
