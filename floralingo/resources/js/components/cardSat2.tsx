import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CardSat2 = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-light text-gray-500">Total Cancelled Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-medium">₱2,38,485</p>
            </CardContent>
        </Card>
    );
};

export default CardSat2;
