import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', users: 320 },
  { name: 'Tue', users: 450 },
  { name: 'Wed', users: 380 },
  { name: 'Thu', users: 520 },
  { name: 'Fri', users: 600 },
  { name: 'Sat', users: 280 },
  { name: 'Sun', users: 240 },
];

export const ActivityChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
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
          cursor={{ fill: 'hsl(238, 50%, 15%)' }}
        />
        <Bar 
          dataKey="users" 
          fill="hsl(238, 77%, 62%)" 
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
