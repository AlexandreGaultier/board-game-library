import { useState, useEffect } from 'react';
import { BoardGame, BoardGameInput } from './types/types';
import { boardGameService } from './services/api';
import { GameCard } from './components/GameCard/GameCard';
import { GameForm } from './components/GameForm/GameForm';
import './App.css';

function App() {
  const [games, setGames] = useState<BoardGame[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<BoardGame | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const data = await boardGameService.getAll();
      setGames(data);
    } catch (err) {
      setError("Erreur lors du chargement des jeux");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (gameData: BoardGameInput) => {
    try {
      if (editingGame) {
        const updatedGame = await boardGameService.update(editingGame.id, gameData);
        setGames(games.map(game => game.id === editingGame.id ? updatedGame : game));
      } else {
        const newGame = await boardGameService.create(gameData);
        setGames([...games, newGame]);
      }
      setIsFormOpen(false);
      setEditingGame(undefined);
    } catch (err) {
      setError("Erreur lors de la sauvegarde du jeu");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce jeu ?')) {
      try {
        await boardGameService.delete(id);
        setGames(games.filter(game => game.id !== id));
      } catch (err) {
        setError("Erreur lors de la suppression du jeu");
      }
    }
  };

  const handleEdit = (game: BoardGame) => {
    setEditingGame(game);
    setIsFormOpen(true);
  };

  if (isLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>Ma Bibliothèque de Jeux de Société</h1>
        <button 
          className="add-button"
          onClick={() => {
            setEditingGame(undefined);
            setIsFormOpen(true);
          }}
        >
          Ajouter un jeu
        </button>
      </header>

      {isFormOpen && (
        <div className="modal">
          <div className="modal-content">
            <GameForm
              game={editingGame}
              onSubmit={handleSubmit}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingGame(undefined);
              }}
            />
          </div>
        </div>
      )}

      <div className="games-grid">
        {games.map(game => (
          <GameCard
            key={game.id}
            game={game}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
