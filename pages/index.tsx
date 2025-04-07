import { Alert, Stack, Title, Text, Group, NumberInput } from "@mantine/core";
import { useState } from "react";
import Graph from "../components/Graph";

export default function IndexPage() {
  const [winRate, setWinRate] = useState(0.55);
  const [numGames, setNumGames] = useState(100);
  return (
    <Stack>
      <Title size='h3'>ポケポケランクマシミュレーター</Title>
      <Group>
        <NumberInput
          label="勝率"
          value={winRate}
          onChange={(val) => setWinRate(val as number)}
          min={0}
          max={1}
          step={0.01}
          w={100}
        />
        <NumberInput
          label="試合数"
          value={numGames}
          onChange={(val) => setNumGames(val as number)}
          min={1}
          w={100}
        />
      </Group>
      <Graph winRate={winRate} numGames={numGames}/>
      <Alert>
        <Text>例えば勝率0.55で100試合行った結果を見てみましょう</Text>
        <Text>70%信頼区間に注目してみると下限はちょうど0付近にありますね</Text>
        <Text>これは真の勝率が0.55のプレイヤーでも100試合程度では30%は逆にptを失ってしまうという事実を示しています</Text>
        <Text fw='bold'>ポケポケはそれなりに分散の大きいゲームだと言えるでしょう</Text>
      </Alert>
    </Stack>
  );
}
