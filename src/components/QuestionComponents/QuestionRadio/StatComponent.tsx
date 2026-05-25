import { FC,useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

import { STAT_COLORS } from '../../../constant';
import { QuestionRadioStatPropsType } from './interface';

function format(n:number){
    return (n*100).toFixed(2);
}

const StatComponent: FC<QuestionRadioStatPropsType> = ({stat=[]}) => {
    const sum = useMemo(() => {
        let s = 0;
        stat.forEach(i => s += i.count);
        return s || 1;
    }, [stat]);

    return (
        <div style={{ width: '100%', height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 40, right: 80, bottom: 40, left: 80 }}>
                    <Pie
                        data={stat}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#39c5bb"
                        label={({ name, payload }) => {
                            const count = (payload?.count) ?? 0;
                            return name + ':' + format(count/sum) + '%';
                        }}
                    >
                        {
                            stat.map((i,index)=>{
                                return (
                                    <Cell key={index} fill={STAT_COLORS[index % STAT_COLORS.length]} />
                                )
                            })
                        }
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default StatComponent;
