import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { H1, H3, Large, Lead, Small } from "./components/ui/typography";
import { TypeIcon, type PokemonType } from "./components/TypeIcon";
import { Button } from "./components/ui/button";
import { Plus, Trash, ZoomIn } from "lucide-react";
import { Badge } from "./components/ui/badge";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./components/ui/dialog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { Attack, PokemonCard } from "./types/card";

const TYPE_COLORS: Record<string, string> = {
  Bug: "#A8B820",
  Darkness: "#705848",
  Dragon: "#7038F8",
  Lightning: "#F8D030",
  Fairy: "#EE99AC",
  Fighting: "#C03028",
  Fire: "#F08030",
  Flying: "#A890F0",
  Ghost: "#705898",
  Grass: "#78C850",
  Ground: "#E0C068",
  Ice: "#98D8D8",
  Colorless: "#A8A878",
  Poison: "#A040A0",
  Psychic: "#F85888",
  Rock: "#B8A038",
  Metal: "#B8B8D0",
  Water: "#6890F0",
};

function App() {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [pageSize] = useState(10);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [collection, setCollection] = useState<PokemonCard[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${
            q || "tyranitar"
          }&pageSize=${pageSize}&select=id,name,rarity,set,images,types,hp,attacks,weaknesses,retreatCost,flavorText,artist,tcgplayer,cardmarket`,
          {
            headers: {
              "X-Api-Key": import.meta.env.VITE_PTCG_API_KEY,
            },
          }
        );

        const data = await res.json();
        setCards(data.data || []);
      } catch (error) {
        console.error("Error fetching cards: ", error);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [q, pageSize]);

  const selectedCard = cards.find((c: PokemonCard) => c.id === selectedId);

  const addToCollection = (card: PokemonCard) => {
    if (!collection.some((c) => c.id === card.id)) {
      setCollection([...collection, card]);
    }
  };

  const removeFromCollection = (card: PokemonCard) => {
    setCollection(collection.filter((c) => c.id !== card.id));
  };

  const emptyCollection = () => {
    setCollection([]);
  };

  // Collection data

  // Information about types
  const typeCounts: Record<string, number> = {};
  collection.forEach((card: PokemonCard) => {
    card.types?.forEach((type: string) => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });
  const typeData = Object.entries(typeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Information about numbered stats (HP, power)
  const averageHP =
    collection.reduce(
      (sum, c: PokemonCard) => sum + (c.hp ? parseInt(c.hp) : 0),
      0
    ) / collection.length || 0;

  const avgDamage =
    collection
      .map((c: PokemonCard) => {
        if (!c.attacks) return 0;
        return (
          c.attacks.reduce(
            (sum: number, atk: Attack) => sum + (parseInt(atk.damage) || 0),
            0
          ) / c.attacks.length
        );
      })
      .reduce((a, b) => a + b, 0) / collection.length || 0;

  const powerData = [{ name: "Collection", HP: averageHP, Damage: avgDamage }];

  // Energy occurrences
  const countTypes = (typesArray: string[][]) => {
    const counts: Record<string, number> = {};
    typesArray.flat().forEach((type) => {
      if (!type) return;
      counts[type] = (counts[type] || 0) + 1;
    });
    return counts;
  };

  const retreatCounts = countTypes(
    collection.map((c: PokemonCard) => c.retreatCost || [])
  );
  const attackCounts = countTypes(
    collection.flatMap(
      (c: PokemonCard) => c.attacks?.map((atk: Attack) => atk.cost || []) || []
    )
  );

  return (
    <div className="flex flex-col h-full p-3">
      {/* Collection and Stats Panels */}
      {collection.length > 0 && (
        <>
          <div className="flex justify-between mb-2">
            <H3 className=" text-white">My Collection</H3>
            <Button
              size="lg"
              className="p-3"
              variant="secondary"
              onClick={() => emptyCollection()}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-4 mb-4">
            {/* My Collection */}
            <div className="col-span-1">
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                {collection.map((card) => (
                  <Card
                    key={card.id}
                    className="flex flex-col items-center p-2 border border-border rounded-lg"
                  >
                    {card.images ? (
                      <img
                        src={card.images.small}
                        alt={card.name}
                        className="h-16 w-auto object-contain"
                      />
                    ) : (
                      <Skeleton className="h-16 w-12 mb-1 rounded-md" />
                    )}
                    <div className="flex gap-1 ">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setSelectedId(card.id)}
                      >
                        <ZoomIn size={8} />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeFromCollection(card)}
                      >
                        <Trash size={8} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="col-span-2 gap-4 md:gap-3 mt-4 md:mt-0 grid grid-cols-1 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Type Distribution</CardTitle>
                  <CardDescription>
                    Distribution of types amongst your collection
                  </CardDescription>
                </CardHeader>
                <ResponsiveContainer width="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      label
                    >
                      {typeData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={TYPE_COLORS[entry.name] || "#ffffff"}
                        />
                      ))}
                    </Pie>

                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Power Levels</CardTitle>
                  <CardDescription>
                    Average HP and Attack Power of your collection
                  </CardDescription>
                </CardHeader>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={powerData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="HP" fill="#8884d8" />
                    <Bar dataKey="Damage" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Average Energy Costs</CardTitle>
                  <CardDescription>
                    The average cost of retreat and attacks amongst your
                    collection
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Lead className="mb-2">Retreat Cost</Lead>
                  <div className="flex flex-wrap mb-2">
                    {Object.entries(retreatCounts).map(([type, count]) =>
                      Array.from({
                        length: Math.round(count / collection.length),
                      }).map((_, idx) => (
                        <TypeIcon
                          key={`retreat-${type}-${idx}`}
                          type={type as PokemonType}
                        />
                      ))
                    )}
                  </div>
                  <Lead className="mb-2">Attack Cost</Lead>
                  <div className="flex flex-wrap ">
                    {Object.entries(attackCounts).map(([type, count]) =>
                      Array.from({
                        length: Math.round(count / collection.length),
                      }).map((_, idx) => (
                        <TypeIcon
                          key={`attack-${type}-${idx}`}
                          type={type as PokemonType}
                        />
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}

      {/* Search Bar */}
      <Input
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search cards..."
        className="mb-4 text-white"
      />

      {/* Search Results */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {cards.map((card: PokemonCard) => {
          return (
            <Card
              key={card.id}
              className="relative flex flex-col items-center rounded-lg p-2 h-full w-full gap-0 border border-border"
            >
              <CardContent className="flex flex-col items-center px-1">
                {card.images ? (
                  <img
                    src={card.images.small}
                    className="max-h-32 w-auto mb-2 object-contain"
                    alt={card.name}
                  />
                ) : (
                  <Skeleton className="min-h-26 min-w-20 rounded-md mb-2" />
                )}
              </CardContent>

              <CardFooter className="flex flex-col p-0 mb-auto text-center">
                <Large>{card.name}</Large>
                <Small>{card.rarity}</Small>
                <Small>{card.set?.name}</Small>
              </CardFooter>
              <div className="flex gap-1 ml-auto pt-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSelectedId(card.id)}
                >
                  <ZoomIn size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => addToCollection(card)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Expanded Card Details */}
      <Dialog open={!!selectedCard} onOpenChange={() => setSelectedId(null)}>
        <DialogContent className="!max-w-full bg-transparent border-0 flex flex-col lg:flex-row mb-6 shadow-md max-h-[90vh] overflow-y-auto">
          {selectedCard && (
            <Card className="flex flex-col lg:flex-row p-4 w-full">
              {selectedCard.images ? (
                <img
                  src={selectedCard.images.large}
                  alt={selectedCard.name}
                  className="max-w-[400px] object-contain mb-4 rounded-md shadow"
                />
              ) : (
                <Skeleton className="max-w-[400px] rounded-md mb-4 lg:mb-0 lg:mr-6" />
              )}

              <div className="flex flex-col w-full pt-3 pb-3">
                <CardContent className="flex-1 flex flex-col gap-4 justify-center">
                  <div className="flex justify-between items-start flex-wrap">
                    <DialogHeader className="flex flex-col gap-3 flex-wrap">
                      <DialogTitle className="text-4xl lg:text-5xl text-left">
                        {selectedCard.name}
                      </DialogTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge className="rounded-md">
                          {selectedCard.rarity || "—"}
                        </Badge>
                        <span>{selectedCard.set?.name}</span>
                      </div>
                    </DialogHeader>

                    <div className="flex flex-row items-end gap-2">
                      {selectedCard.hp && <Lead>{selectedCard.hp} HP</Lead>}
                      <div className="flex items-center">
                        {selectedCard.types?.map((type, idx) => (
                          <div key={idx}>
                            <TypeIcon type={type as PokemonType} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedCard.attacks?.map((atk, idx) => (
                      <div
                        key={idx}
                        className="bg-amber-200/10 rounded-tl-2xl rounded-br-2xl -mx-3 px-3 py-3"
                      >
                        <div className="flex items-center">
                          {atk.cost?.map((type, idx) => (
                            <div key={idx}>
                              <TypeIcon type={type as PokemonType} />
                            </div>
                          ))}
                          <strong className="pl-2">{atk.name}</strong>
                          <H1 className="ml-auto !text-2xl">
                            {atk.damage || ""}
                          </H1>
                        </div>
                        <p className="pt-2`">{atk.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      Weakness:{" "}
                      {selectedCard.weaknesses?.length ? (
                        selectedCard.weaknesses.map((w, idx) => (
                          <div key={idx} className="flex items-center">
                            <TypeIcon type={w.type as PokemonType} />
                            {w.value}
                          </div>
                        ))
                      ) : (
                        <>—</>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      Resistance:{" "}
                      {selectedCard.resistances?.length ? (
                        selectedCard.resistances.map((r, idx) => (
                          <div key={idx} className="flex items-center">
                            <TypeIcon type={r.type as PokemonType} />
                            {r.value}
                          </div>
                        ))
                      ) : (
                        <>—</>
                      )}
                    </div>
                    <div className="flex items-center">
                      Retreat Cost:{" "}
                      {selectedCard.retreatCost?.length ? (
                        selectedCard.retreatCost.map((type, idx) => (
                          <div key={idx}>
                            <TypeIcon type={type as PokemonType} />
                          </div>
                        ))
                      ) : (
                        <>—</>
                      )}
                    </div>

                    <p>Artist: {selectedCard.artist}</p>
                  </div>
                </CardContent>

                {selectedCard.flavorText && (
                  <CardFooter className="bg-accent  rounded-tl-2xl rounded-br-2xl  m-3 py-3">
                    <Lead className="italic text-sm">
                      {selectedCard.flavorText}
                    </Lead>
                  </CardFooter>
                )}
              </div>
            </Card>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-12 top-8"
              >
                ✕
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;
