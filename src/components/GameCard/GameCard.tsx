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
      {game.isNew && <span className="new-badge">Nouveau</span>}
      <img src={game.imageUrl} alt={game.name} className="game-card__image" />
      <div className="game-card__content">
        <h3>{game.name}</h3>
        <p className="game-card__publisher">{game.publisher}</p>
        
        <div className="game-card__categories">
          {game.categories.map((category) => (
            <span key={category} className="game-card__category">
              {category}
            </span>
          ))}
        </div>

        <div className="game-card__info-grid">
          {game.minPlayers && game.maxPlayers && (
            <div className="info-item">
              <span className="info-icon">👥</span>
              <span>{game.minPlayers}-{game.maxPlayers} joueurs</span>
            </div>
          )}
          
          {game.duration && (
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <span>{game.duration.min}-{game.duration.max} min</span>
            </div>
          )}
          
          {game.complexity && (
            <div className="info-item">
              <span className="info-icon">🎲</span>
              <span>Complexité: {game.complexity}/5</span>
            </div>
          )}
          
          {game.age && (
            <div className="info-item">
              <span className="info-icon">👶</span>
              <span>{game.age}+ ans</span>
            </div>
          )}
        </div>

        {game.description && (
          <div className="game-card__description">
            {game.description.slice(0, 100)}...
          </div>
        )}

        {game.price && (
          <div className="game-card__price">
            <span className="price-tag">{game.price} €</span>
          </div>
        )}

        {game.languages && game.languages.length > 0 && (
          <div className="game-card__languages">
            {game.languages.map(lang => (
              <span key={lang} className="language-tag">{lang}</span>
            ))}
          </div>
        )}

        <div className="game-card__links">
          {game.rulesUrl && (
            <a href={game.rulesUrl} target="_blank" rel="noopener noreferrer" className="rules-link">
              📖 Règles
            </a>
          )}
          {game.videoUrl && (
            <a href={game.videoUrl} target="_blank" rel="noopener noreferrer" className="video-link">
              🎥 Vidéo
            </a>
          )}
        </div>

        <div className="game-card__rating">
          {'⭐'.repeat(Math.round(game.rating/2))}
          <span className="rating-number">{game.rating}/10</span>
        </div>

        <div className="game-card__actions">
          <button onClick={() => onEdit(game)}>Modifier</button>
          <button onClick={() => onDelete(game.id)}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}; 