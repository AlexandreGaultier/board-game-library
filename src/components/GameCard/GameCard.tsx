import { BoardGame } from '../../types/types';
import './GameCard.css';

interface GameCardProps {
  game: BoardGame;
  onDelete: (id: number) => void;
  onEdit: (game: BoardGame) => void;
}

export const GameCard = ({ game, onDelete, onEdit }: GameCardProps) => {
  return (
    <div className="game-card">
      <img src={game.imageUrl} alt={game.name} className="game-card__image" />
      <div className="game-card__content">
        <h3>{game.name}</h3>
        <p>Éditeur: {game.publisher}</p>
        <div className="game-card__categories">
          {game.categories.map((category) => (
            <span key={category} className="game-card__category">
              {category}
            </span>
          ))}
        </div>
        <div className="game-card__rating">
          Note: {game.rating}/10
        </div>
        <div className="game-card__actions">
          <button onClick={() => onEdit(game)}>Modifier</button>
          <button onClick={() => onDelete(game.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}; 