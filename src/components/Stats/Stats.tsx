import './Stats.css';
import { BoardGame } from '../../types/types';

interface StatsProps {
  games: BoardGame[];
}

export const Stats = ({ games }: StatsProps) => {
  // Calculs des statistiques
  const totalGames = games.length;
  const totalValue = games.reduce((sum, game) => sum + (game.price || 0), 0);
  const averageRating = games.reduce((sum, game) => sum + game.rating, 0) / totalGames;
  
  // Calcul des catégories les plus populaires
  const categoryCount = games.reduce((acc, game) => {
    game.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Calcul des éditeurs les plus représentés
  const publisherCount = games.reduce((acc, game) => {
    acc[game.publisher] = (acc[game.publisher] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="stats-container">
      <h2 className="section-title">📊 Statistiques de la Collection</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎲</div>
          <div className="stat-value">{totalGames}</div>
          <div className="stat-label">Jeux</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{totalValue.toFixed(2)} €</div>
          <div className="stat-label">Valeur Totale</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{averageRating.toFixed(1)}/10</div>
          <div className="stat-label">Note Moyenne</div>
        </div>
      </div>

      <div className="stats-details">
        <div className="stats-chart">
          <h3>Top Catégories</h3>
          <div className="chart-bars">
            {Object.entries(categoryCount)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => (
                <div key={category} className="chart-bar">
                  <div className="bar-label">{category}</div>
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(count / totalGames) * 100}%` }}
                  />
                  <div className="bar-value">{count}</div>
                </div>
              ))}
          </div>
        </div>

        <div className="stats-chart">
          <h3>Top Éditeurs</h3>
          <div className="chart-bars">
            {Object.entries(publisherCount)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([publisher, count]) => (
                <div key={publisher} className="chart-bar">
                  <div className="bar-label">{publisher}</div>
                  <div 
                    className="bar-fill" 
                    style={{ width: `${(count / totalGames) * 100}%` }}
                  />
                  <div className="bar-value">{count}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 