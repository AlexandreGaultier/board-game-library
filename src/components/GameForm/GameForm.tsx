import { useState, useEffect } from 'react';
import { BoardGame, BoardGameInput } from '../../types/types';
import './GameForm.css';

interface GameFormProps {
  game?: BoardGame;
  onSubmit: (game: BoardGameInput) => void;
  onCancel: () => void;
}

export const GameForm = ({ game, onSubmit, onCancel }: GameFormProps) => {
  const [formData, setFormData] = useState<BoardGameInput>({
    name: '',
    publisher: '',
    categories: [],
    imageUrl: '',
    rating: 5,
    ...game
  });

  const [categoryInput, setCategoryInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addCategory = () => {
    if (categoryInput.trim()) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, categoryInput.trim()]
      }));
      setCategoryInput('');
    }
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="game-form">
      <div className="form-group">
        <label htmlFor="name">Nom du jeu</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="publisher">Éditeur</label>
        <input
          type="text"
          id="publisher"
          value={formData.publisher}
          onChange={e => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">URL de l'image</label>
        <input
          type="url"
          id="imageUrl"
          value={formData.imageUrl}
          onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="rating">Note</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="10"
          value={formData.rating}
          onChange={e => setFormData(prev => ({ ...prev, rating: Number(e.target.value) }))}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Catégories</label>
        <div className="category-input">
          <input
            type="text"
            id="category"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
          />
          <button type="button" onClick={addCategory}>Ajouter</button>
        </div>
        <div className="categories-list">
          {formData.categories.map((category, index) => (
            <span key={index} className="category-tag">
              {category}
              <button type="button" onClick={() => removeCategory(index)}>&times;</button>
            </span>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit">
          {game ? 'Modifier' : 'Ajouter'}
        </button>
        <button type="button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
}; 