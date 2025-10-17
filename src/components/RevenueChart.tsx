import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4600 },
  { name: 'May', value: 6200 },
  { name: 'Jun', value: 5800 },
  { name: 'Jul', value: 7200 },
];

export const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(238, 77%, 62%)" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="hsl(238, 77%, 62%)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(238, 20%, 18%)" opacity={0.3} />
        <XAxis 
          dataKey="name" 
          stroke="hsl(220, 9%, 62%)"
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="hsl(220, 9%, 62%)"
          style={{ fontSize: '12px' }}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: 'hsl(222, 35%, 8%)',
            border: '1px solid hsl(238, 20%, 18%)',
            borderRadius: '8px',
            backdropFilter: 'blur(12px)',
          }}
          labelStyle={{ color: 'hsl(216, 12%, 90%)' }}
        />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="hsl(238, 77%, 62%)" 
          strokeWidth={2}
          fill="url(#colorValue)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
