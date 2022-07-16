import { useEffect, useState } from "react";
import { fetchAllPokemon } from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [filteredPokemon, setFilteredPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState('')

    useEffect(() => {
        const fetchPokemon = async () => {
            const {results: pokemonList} = await fetchAllPokemon()

            setPokemon(pokemonList)
            setPokemonIndex(pokemonList)
        }

        fetchPokemon().then(() => {
            /** noop **/
        })
    }, [searchValue, pokemonDetails, pokemon])

    const onSearchValueChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
        console.log('searchVal: ', value.length)

        setFilteredPokemon(
            pokemon.filter(monster => monster.name.includes(value))
        )
        console.log("List of pokemon: ", filteredPokemon);
    }

    const onGetDetails = (name) => async () => {
        /** code here **/
        console.log("OnGetDetails clicked: ", name);
        setPokemonDetails(name);
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
            </div>
            <div className={pokemonDetails ? 'pokedex__content pokedex__gutter' : 'pokedex__content'}>
                {searchValue === null && (
                    <div className={'pokedex__search-results'}>
                        {
                            pokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                {filteredPokemon && (
                    <div className={'pokedex__search-results'}>
                        {
                            filteredPokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                <div className={'pokemon__details'}>
                {
                        <div className={'pokedex__details'}>
                            { pokemonDetails }
                        </div>
                }
                </div>
            </div>
        </div>
    );
}

export default App;
