import {
    LineChart,
    BarChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

interface DataPoint {
    [key: string]: string | number
}

interface Props {
    data: DataPoint[]
    type?: 'line' | 'bar'
    xKey: string
    lines?: { key: string; color: string }[]
    bars?: { key: string; color: string }[]
    height?: number
}

const defaultColors = ['#3EBAFF', '#00ff88', '#ffd700', '#6013DE']

export default function Chart({
    data,
    type = 'line',
    xKey,
    lines,
    bars,
    height = 300,
}: Props) {
    const gridColor = '#1e2440'
    const textColor = '#9D97B3'

    if (type === 'bar') {
        const barKeys = bars || data.length > 0
            ? Object.keys(data[0]).filter((k) => k !== xKey).map((k, i) => ({
                key: k,
                color: defaultColors[i % defaultColors.length],
            }))
            : []

        return (
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={height}>
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                        <XAxis dataKey={xKey} tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
                        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
                        <Tooltip
                            contentStyle={{
                                background: '#0f1326',
                                border: '1px solid #1e2440',
                                borderRadius: '8px',
                                color: '#ffffff',
                                fontSize: '0.8rem',
                            }}
                        />
                        <Legend wrapperStyle={{ color: textColor, fontSize: '0.8rem' }} />
                        {(bars || barKeys).map((b) => (
                            <Bar key={b.key} dataKey={b.key} fill={b.color} radius={[4, 4, 0, 0]} />
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        )
    }

    const lineKeys = lines || (data.length > 0
        ? Object.keys(data[0]).filter((k) => k !== xKey).map((k, i) => ({
            key: k,
            color: defaultColors[i % defaultColors.length],
        }))
        : [])

    return (
        <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey={xKey} tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
                    <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} />
                    <Tooltip
                        contentStyle={{
                            background: '#0f1326',
                            border: '1px solid #1e2440',
                            borderRadius: '8px',
                            color: '#ffffff',
                            fontSize: '0.8rem',
                        }}
                    />
                    <Legend wrapperStyle={{ color: textColor, fontSize: '0.8rem' }} />
                    {lineKeys.map((l) => (
                        <Line
                            key={l.key}
                            type="monotone"
                            dataKey={l.key}
                            stroke={l.color}
                            strokeWidth={2}
                            dot={{ fill: l.color, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}