/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

async function fetchPokemon() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();
  return data.results;
}

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [pokemonShown, setPokemonShown] = useState(null);

  if (pokemon.length === 0) {
    fetchPokemon().then((result) => {
      console.log("Requisição realizada");
      console.log(result);
      setPokemon(result);
    });
  }

  useEffect(() => {
    fetchPokemon().then((result) => {
      console.log("Requisição realizada");
      console.log(result);
      setPokemon(result);
    });
  }, []);

  const shownDetails = async (url) => {
    const data = await fetch(url).then((res) => res.json());
    console.log("pokemon encontrado");
    console.log(data);
    setPokemonShown(data);
  };

  return (
    <>
      <Head>
        <title>Api de Pokémon</title>
        <meta name="description" content="Consumindo uma api de Pokemon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="app">
          <div>
            <h2 className="title">Pokémon</h2>
            <ul className="pokemon">
              {pokemon.map((mon) => (
                <li key={mon.name}>
                  <span>{mon.name}</span>
                  <button onClick={() => shownDetails(mon.url)}>
                    Ver detalhes
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {pokemonShown && (
            <div>
              <h2 className="pokemonShow">{pokemonShown.name}</h2>
              <img
                src={pokemonShown.sprites.front_default}
                alt={pokemonShown.name}
              />
              <div className="stat">
                <b>Tipo: </b>
                {pokemonShown.types.map(({ type }) => (
                  <span key={type.name}>{type.name} </span>
                ))}
              </div>
              <div className="stat">
                <b>Altura: </b>
                {pokemonShown.height / 10} m
              </div>
              <div className="stat">
                <b>Peso: </b>
                {pokemonShown.weight / 10} Kg
              </div>
              <div className="stat">
                <b>Atributos</b>
                <ul>
                  {pokemonShown.stats.map(({ base_stat, stat }) => (
                    <li key={stat.name}>
                      {stat.name}: {base_stat}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="stat">
                <b>Habilidades</b>
                <ul>
                  {pokemonShown.abilities.map(({ ability, is_hidden }) => (
                    <li key={ability.name}>
                      {ability.name}
                      {is_hidden && " (secreta)"}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
