import { useState, useEffect } from 'react';
import { BoardGame, BoardGameInput } from './types/types';
import { boardGameService } from './services/api';
import { GameCard } from './components/GameCard/GameCard';
import { GameForm } from './components/GameForm/GameForm';
import { Stats } from './components/Stats/Stats';
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

  const featuredGame = games.find(game => game.featured);
  const newGames = games.filter(game => game.isNew).slice(0, 4);
  const popularGames = [...games].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)).slice(0, 4);

  if (isLoading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎲 Ma Bibliothèque de Jeux</h1>
        <button 
          className="add-button"
          onClick={() => {
            setEditingGame(undefined);
            setIsFormOpen(true);
          }}
        >
          + Ajouter un jeu
        </button>
      </header>

      <nav className="app-nav">
        <div className="nav-filters">
          <button className="filter-button active">Tous</button>
          <button className="filter-button">Stratégie</button>
          <button className="filter-button">Famille</button>
          <button className="filter-button">Party Games</button>
          <button className="filter-button">Expert</button>
          <button className="filter-button">moins de 30 min</button>
          <button className="filter-button">2-4 joueurs</button>
        </div>
        
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Rechercher un jeu..." 
          />
        </div>
      </nav>

      {featuredGame && (
        <div className="featured-game">
          <img 
            src={featuredGame.imageUrl} 
            alt={featuredGame.name} 
            className="featured-game__image"
          />
          <div className="featured-game__content">
            <h2>{featuredGame.name}</h2>
            <p>Éditeur: {featuredGame.publisher}</p>
            <div className="game-card__categories">
              {featuredGame.categories.map(category => (
                <span key={category} className="game-card__category">
                  {category}
                </span>
              ))}
            </div>
            <p>Note: {featuredGame.rating}/10</p>
          </div>
        </div>
      )}

      <div className="main-content">
        <section className="new-games">
          <h2 className="section-title">✨ Nouveautés</h2>
          <div className="games-row">
            {newGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </section>

        <section className="popular-games">
          <h2 className="section-title">🏆 Tendances</h2>
          <div className="games-row">
            {popularGames.map(game => (
              <GameCard
                key={game.id}
                game={game}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </section>

        <Stats games={games} />

        <section className="all-games">
          <h2 className="section-title">📚 Collection Complète</h2>
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
        </section>
      </div>

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
    </div>
  );
}

export default App;
