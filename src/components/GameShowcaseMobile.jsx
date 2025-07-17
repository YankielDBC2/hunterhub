import { useState } from 'react';

const games = [
  {
    id: 'tech-generators',
    title: 'Tech Generators',
    status: 'Alpha',
    releaseDate: 'Dec 23, 2024',
    genre: 'Sci-Fi - Mining - RPG',
    description: 'Tech Generators is a sci-fi mining game developed by the Space Hunters team. It offers real-time gameplay, unique mechanics, and play-to-earn rewards.',
    tags: ['TMA', 'Browser', 'TON Chain'],
    banner: '/images/tech-banner.jpg',
    image: '/images/tech-card.jpg',
  },
  {
    id: 'chat-adventure',
    title: 'Chat Adventure',
    banner: '/images/chat-banner.jpg',
    image: '/images/chat-card.jpg',
  },
  {
    id: 'space-hunters',
    title: 'Space Hunters: The Reborn',
    banner: '/images/hunters-banner.jpg',
    image: '/images/hunters-card.jpg',
  }
];

export default function GameShowcaseMobile() {
  const [selectedGame, setSelectedGame] = useState(games[0]);

  return (
    <section
      className="block md:hidden relative text-white min-h-screen bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${selectedGame.banner})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      <div className="relative z-10 px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">{selectedGame.title}</h1>
        {selectedGame.description && (
          <p className="mb-4 text-gray-300 text-sm">{selectedGame.description}</p>
        )}
        <div className="flex justify-center flex-wrap gap-2 text-sm mb-2">
          {selectedGame.status && (
            <span className="text-yellow-400 font-bold">🟡 {selectedGame.status}</span>
          )}
          {selectedGame.releaseDate && <span>📅 {selectedGame.releaseDate}</span>}
        </div>
        {selectedGame.genre && (
          <p className="mb-2 text-sm">
            🎮 <span className="text-gray-300">{selectedGame.genre}</span>
          </p>
        )}
        {selectedGame.tags?.length && (
          <div className="flex flex-wrap justify-center gap-2 my-4">
            {selectedGame.tags.map((tag) => (
              <span key={tag} className="bg-white/10 px-3 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-center gap-3 mt-4">
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-semibold">
            Open App
          </button>
          <button className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Whitepaper
          </button>
        </div>
      </div>

      <div className="relative z-10 mt-6 px-2 pb-8">
        <div className="overflow-x-auto">
          <div className="flex gap-4 px-1">
            {games.map((game) => (
              <div key={game.id} className="text-center flex-shrink-0">
                <img
                  src={game.image}
                  alt={game.title}
                  onClick={() => setSelectedGame(game)}
                  className={`cursor-pointer rounded-xl transition-all duration-300 border-2 w-[110px] h-[160px] object-contain bg-black/20 p-1 ${
                    selectedGame.id === game.id
                      ? 'border-red-500 scale-105'
                      : 'border-transparent grayscale hover:scale-105'
                  }`}
                />
                <p className="text-xs mt-2 w-[110px] truncate">{game.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
