import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CardSat4 = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-light text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-medium">33,493</p>
            </CardContent>
        </Card>
    );
};

export default CardSat4;
