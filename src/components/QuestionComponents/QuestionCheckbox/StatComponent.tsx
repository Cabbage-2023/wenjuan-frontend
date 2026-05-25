import { FC } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts'
import { QuestionCheckboxStatPropsType } from './interface';

const StatComponent: FC<QuestionCheckboxStatPropsType> = ({stat}) => {
    return (
        <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={stat}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 60
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-20} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatComponent;
