import { DashboardLayout } from '@/components/DashboardLayout';
import { MetricCard } from '@/components/MetricCard';
import { ChartCard } from '@/components/ChartCard';
import { RevenueChart } from '@/components/RevenueChart';
import { ActivityChart } from '@/components/ActivityChart';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-semibold text-foreground mb-2">Overview Dashboard</h2>
          <p className="text-muted-foreground">Real-time insights and analytics at a glance</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Revenue"
            value="$45,231"
            change="+20.1%"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Active Users"
            value="1,248"
            change="+12.5%"
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="-2.4%"
            changeType="negative"
            icon={TrendingUp}
          />
          <MetricCard
            title="System Health"
            value="99.9%"
            change="Stable"
            changeType="neutral"
            icon={Activity}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard
            title="Revenue Trends"
            description="Monthly revenue performance over time"
          >
            <RevenueChart />
          </ChartCard>

          <ChartCard
            title="User Activity"
            description="Daily active users this week"
          >
            <ActivityChart />
          </ChartCard>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-panel rounded-xl p-6 glass-hover">
            <h3 className="text-lg font-semibold mb-4">Top Performing</h3>
            <div className="space-y-3">
              {[
                { name: 'Product A', value: '32%', color: 'bg-primary' },
                { name: 'Product B', value: '28%', color: 'bg-emerald-500' },
                { name: 'Product C', value: '21%', color: 'bg-blue-500' },
              ].map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className="text-foreground font-medium">{item.value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.color} transition-all duration-500`}
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 glass-hover">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New user registered', time: '2m ago' },
                { action: 'Report generated', time: '15m ago' },
                { action: 'Data sync completed', time: '1h ago' },
                { action: 'Alert triggered', time: '2h ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary indigo-glow" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6 glass-hover">
            <h3 className="text-lg font-semibold mb-4">System Status</h3>
            <div className="space-y-3">
              {[
                { service: 'API Gateway', status: 'Operational', uptime: '99.99%' },
                { service: 'Database', status: 'Operational', uptime: '99.95%' },
                { service: 'Cache Layer', status: 'Operational', uptime: '99.98%' },
              ].map((service) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-glow-pulse" />
                    <span className="text-sm text-foreground">{service.service}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{service.uptime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
