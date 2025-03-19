import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CardSat3 = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-light text-gray-500">Total Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-medium">84,382</p>
            </CardContent>
        </Card>
    );
};

export default CardSat3;
