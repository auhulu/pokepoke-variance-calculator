import { AspectRatio } from "@mantine/core";
import { CompositeChart } from "@mantine/charts";


function calculate(winRate: number, numGames: number) {
    const z70 = 1.036;
    const z90 = 1.645;

    const data = []
    for (let n = 1; n <= numGames; n++) {
        const meanWins = n * winRate;
        const stdWins = Math.sqrt(n * winRate * (1 - winRate));

        const lower70 = (2 * (meanWins - z70 * stdWins) - n) * 10;
        const upper70 = (2 * (meanWins + z70 * stdWins) - n) * 10;
        const lower90 = (2 * (meanWins - z90 * stdWins) - n) * 10;
        const upper90 = (2 * (meanWins + z90 * stdWins) - n) * 10;

        data.push({ lower70, upper70, lower90, upper90 });
    }
    return {
        lower70: data.map(d => d.lower70),
        upper70: data.map(d => d.upper70),
        lower90: data.map(d => d.lower90),
        upper90: data.map(d => d.upper90),
    }
}

function simulate(winRate: number, numGames: number) {
    const samples: number[][] = [];
    for (let i = 0; i < 100; i++) {
        const sample: number[] = [];
        let points = 0;
        for (let n = 1; n <= numGames; n++) {
            const win = Math.random() < winRate;
            points += win ? 10 : -10;
            sample.push(points);
        }
        samples.push(sample);
    }
    const maxSample = samples.reduce((a, b) => (b.at(-1)! > a.at(-1)! ? b : a));
    const minSample = samples.reduce((a, b) => (b.at(-1)! < a.at(-1)! ? b : a));
    const randomSample1 = samples[Math.floor(Math.random() * samples.length)];
    const randomSample2 = samples[Math.floor(Math.random() * samples.length)];
    const randomSample3 = samples[Math.floor(Math.random() * samples.length)];
    return { maxSample, minSample, randomSample1, randomSample2, randomSample3 };
}

function format(values: Record<string, number[]>) {
    const length = Object.values(values)[0].length;
    const result: Array<Record<string, number>> = [];
    const keys = Object.keys(values);
    for (let i = 0; i < length; i++) {
        const entry: Record<string, number> = {};
        for (const key of keys) {
            entry[key] = values[key][i];
        }
        entry["n"] = i + 1;
        result.push(entry);
    }
    return result;
}

export default function Graph({ winRate, numGames }: { winRate: number, numGames: number }) {
    const samples = simulate(winRate, numGames);
    const areas = calculate(winRate, numGames);
    const data = format({ ...samples, ...areas });
    return (
        <AspectRatio ratio={16 / 9}>
            <CompositeChart
                data={data}
                dataKey="n"
                dotProps={{ r: 0 }}
                h='100%'
                mih={400}
                xAxisLabel="試合数"
                yAxisLabel="pt"
                valueFormatter={(value) => String(Math.round(Number(value)))}
                series={[
                    { name: "maxSample", color: "blue", label: "100回のシミュレーションで最高の上振れ", type: "line" },
                    { name: "minSample", color: "red", label: "100回のシミュレーションで最低の下振れ", type: "line" },
                    { name: "randomSample1", color: "gray", label: "ランダムサンプリング1", type: "line" },
                    { name: "randomSample2", color: "gray", label: "ランダムサンプリング2", type: "line" },
                    { name: "randomSample3", color: "gray", label: "ランダムサンプリング3", type: "line" },
                    { name: "upper70", color: "green", label: "70%信頼区間(上限)", type: "line" },
                    { name: "lower70", color: "green", label: "70%信頼区間(下限)", type: "line" },
                    { name: "upper90", color: "yellow", label: "90%信頼区間(上限)", type: "line" },
                    { name: "lower90", color: "yellow", label: "90%信頼区間(下限)", type: "line" },
                ]}
            />
        </AspectRatio>
    );
}