'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeatmapChartProps {
  className?: string;
}

export function HeatmapChart({ className }: HeatmapChartProps) {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  // Mock data - intensidade de trading por hora/dia
  const data = days.map((day) => 
    hours.map(() => Math.random() * 100)
  );
  
  const getColor = (value: number) => {
    if (value > 80) return 'bg-green-600';
    if (value > 60) return 'bg-green-500';
    if (value > 40) return 'bg-yellow-500';
    if (value > 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Mapa de Calor - Atividade de Trading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-25 gap-1">
              <div className="col-span-1"></div>
              {hours.map((hour) => (
                <div key={hour} className="text-xs text-center text-muted-foreground">
                  {hour.split(':')[0]}
                </div>
              ))}
              
              {days.map((day, dayIndex) => (
                <>
                  <div key={day} className="text-sm font-medium pr-2 flex items-center justify-end">
                    {day}
                  </div>
                  {data[dayIndex].map((value, hourIndex) => (
                    <div
                      key={`${day}-${hourIndex}`}
                      className={`aspect-square rounded ${getColor(value)} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`}
                      title={`${day} ${hours[hourIndex]}: ${value.toFixed(0)}%`}
                    />
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Baixa</span>
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-red-500 rounded" />
            <div className="w-6 h-6 bg-orange-500 rounded" />
            <div className="w-6 h-6 bg-yellow-500 rounded" />
            <div className="w-6 h-6 bg-green-500 rounded" />
            <div className="w-6 h-6 bg-green-600 rounded" />
          </div>
          <span className="text-sm text-muted-foreground">Alta</span>
        </div>
      </CardContent>
    </Card>
  );
}