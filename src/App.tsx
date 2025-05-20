import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons } from './store/pokemonSlice';
import { RootState, AppDispatch } from './store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading, error } = useSelector((state: RootState) => state.pokemon);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePokemon = list.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < list.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 0) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="bg-indigo-800 p-4 h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-extrabold text-white mb-8 text-center drop-shadow">Pokémon Gallery</h1>
      {loading && <p className="text-center text-lg text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      <div className='mx-auto'>
        {!loading && <div className="flex">
          <div className="flex justify-between items-center m-4">
            <button
              onClick={handlePrev}
              disabled={page === 0}
              className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 disabled:opacity-40"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6"
              >
                {visiblePokemon.map((pokemon) => (
                  <div
                    key={pokemon.key}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center hover:scale-105 transition-transform"
                  >
                    <img src={pokemon.sprite} alt={pokemon.species} className="w-20 h-20 mb-2" />
                    <h2 className="font-semibold text-indigo-700">{pokemon.species.split("-").join(" ")}</h2>
                    <p className="text-sm text-gray-500">Number {pokemon.num}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center m-4">
            <button
              onClick={handleNext}
              disabled={endIndex >= list.length}
              className="p-2 rounded-full bg-white shadow hover:bg-indigo-100 disabled:opacity-40"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default App;
