import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Skeleton } from "./components/ui/skeleton";
import { H1, Large, Lead, Small } from "./components/ui/typography";
import { TypeIcon } from "./components/TypeIcon";
import { Button } from "./components/ui/button";
import { Type } from "lucide-react";

function App() {
  const [cards, setCards] = useState([]);
  const [pageSize] = useState(10);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState(null);

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

  const selectedCard = cards.find((c) => c.id === selectedId);

  return (
    <div className="flex flex-col h-full p-3">
      {selectedCard && (
        <Card className="flex flex-col lg:flex-row p-4 mb-6 shadow-md w-full">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-5 right-5"
            onClick={() => setSelectedId(null)}
          >
            ✕
          </Button>

          {selectedCard.images ? (
            <img
              src={selectedCard.images.large}
              alt={selectedCard.name}
              className="max-w-[400px] object-contain mb-4 rounded-md shadow"
            />
          ) : (
            <Skeleton className="max-w-[400px] rounded-md mb-4 lg:mb-0 lg:mr-6" />
          )}

          <div className="flex flex-col w-full pr-3 pt-3 pb-3">
            <CardContent className="flex-1 flex flex-col gap-4 justify-center">
              <div className="flex justify-between items-start">
                <div>
                  <H1>{selectedCard.name}</H1>
                  <Small>{selectedCard.rarity}</Small>
                  <Small>{selectedCard.set?.name}</Small>
                </div>

                <div className="flex flex-row items-end gap-2">
                  {selectedCard.hp && <Lead>{selectedCard.hp} HP</Lead>}
                  <div className="flex items-center">
                    {selectedCard.types?.map((type, idx) => (
                      <div key={idx}>
                        <TypeIcon type={type} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {selectedCard.attacks?.map((atk) => (
                  <div key={atk.name}>
                    <div className="flex items-center">
                      {atk.cost?.map((type, idx) => (
                        <div key={type}>
                          <TypeIcon type={type} />
                        </div>
                      ))}
                      <strong>{atk.name}</strong>
                      <H1 className="ml-auto">{atk.damage || ""}</H1>
                    </div>
                    <p>{atk.text}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  Weakness:{" "}
                  {selectedCard.weaknesses?.length ? (
                    selectedCard.weaknesses.map((w, idx) => (
                      <span key={idx} className="flex items-center">
                        <TypeIcon type={w.type} />
                        {w.value}
                      </span>
                    ))
                  ) : (
                    <>—</>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  Resistance:{" "}
                  {selectedCard.resistances?.length ? (
                    selectedCard.resistances.map((r, idx) => (
                      <span key={idx} className="flex items-center">
                        <TypeIcon type={r.type} />
                        {r.value}
                      </span>
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
                        <TypeIcon type={type} />
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
              <CardFooter className="bg-accent rounded-2xl m-3 py-3">
                <Lead className="italic text-sm">
                  {selectedCard.flavorText}
                </Lead>
              </CardFooter>
            )}
          </div>
        </Card>
      )}

      <Input
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search cards..."
        className="mb-4"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
        {cards.map((card) => {
          const isSelected = selectedId === card.id;
          return (
            <Card
              key={card.id}
              onClick={() => {
                console.log(card);
                setSelectedId(isSelected ? null : card.id);
              }}
              className={`flex flex-col items-center rounded-lg p-2 cursor-pointer transition-colors h-full w-full gap-0
                border border-border hover:bg-accent`}
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default App;
