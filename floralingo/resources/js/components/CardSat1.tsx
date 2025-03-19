import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoveUp } from 'lucide-react';

const CardSat1 = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-light text-gray-500">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="inline-flex items-center">
                    <p className="text-3xl font-medium">₱12,426</p>

                    <p className="float-end">+36%</p>
                    <MoveUp />
                </div>
            </CardContent>
        </Card>
    );
};

export default CardSat1;
