import { useEffect, useState } from 'react';
import {Alert, AlertDescription, AlertTitle} from "@/components/UI/Alert.tsx";
import {useBookings} from "@/hooks/useBookings.ts";
import {Icon} from "@iconify/react";

const NotificationPopup = () => {
    const { error, clearError } = useBookings()
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (error) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                clearError();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, clearError]);

    if (!isVisible || !error) {
        return null;
    }

    return (
        <Alert variant="destructive" className="fixed bottom-1 right-1 w-auto bg-white">
            <Icon icon="codicon:error"  className="h-4 w-4"/>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                {error}
            </AlertDescription>
        </Alert>
    );
};

export default NotificationPopup;
