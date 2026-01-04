import { useState, useEffect } from 'react';

export const useFavourites = () => {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem('estate-favourites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('estate-favourites', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (propertyId) => {
    setFavourites(prev => {
      if (!prev.includes(propertyId)) {
        return [...prev, propertyId];
      }
      return prev;
    });
  };

  const removeFavourite = (propertyId) => {
    setFavourites(prev => prev.filter(id => id !== propertyId));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const isFavourite = (propertyId) => {
    return favourites.includes(propertyId);
  };

  return {
    favourites,
    addFavourite,
    removeFavourite,
    clearFavourites,
    isFavourite
  };
};