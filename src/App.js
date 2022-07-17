import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName, fetchEvolutionChainById } from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState('')
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState('')

    useEffect(() => {
        const fetchPokemon = async () => {
            const {results: pokemonList} = await fetchAllPokemon()

            setPokemon(pokemonList)
        }

        fetchPokemon().then(() => {
            /** noop **/
        })
    }, [pokemonIndex, pokemon]);

    const onSearchValueChange = (event) => {
        const value = event.target.value
        setSearchValue(value)
        console.log('searchVal: ', value.length)

        if(value === '') {
            setPokemonDetails('')
        }

        setPokemonIndex(
            pokemon.filter(monster => monster.name.includes(value))
        )
        
        console.log("List of pokemon: ", pokemonIndex);
    }

    const onGetDetails = (name) => async () => {
        /** code here **/
        const fetchPokemonDetails = async (name) => {
            let detailList = await fetchPokemonDetailsByName(name)
            
            let typesList = detailList.types.map(type => type.type.name)
            
            let movesList = detailList.moves.map(move => move.move.name);
            console.log("OnGetDetails clicked: ", detailList);


            return setPokemonDetails({name: detailList.name, typeList: typesList, moveList: movesList});
        }
        const fetchEvolutionDetails = async (name) => {
            let evolutionList = await fetchEvolutionChainById(name)
            
            let evoList = evolutionList.moves.map(move => move.move.name);
            console.log("OnGetDetails clicked (evolutionList): ", evolutionList);


            return setPokemonDetails({name: detailList.name, typeList: typesList, moveList: movesList});
        }


        fetchPokemonDetails(name).then(() => {
            /** noop **/
        })

        fetchEvolutionDetails(name).then(() => {
            /** noop **/
        })

    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'}/>
                </div>
                {typeof pokemonIndex === 'string' && (
                    <div className={pokemonDetails ? 'pokedex__content pokedex__gutter' : 'pokedex__content'}>
                        <ul className={'pokedex__search-results'}>
                            {
                                pokemon.map(monster => {
                                    return (
                                        <li className={'pokedex__results__list-item'} key={monster.name}>
                                            <span>
                                                {monster.name}
                                            </span>
                                            <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )}
                {pokemonIndex.length > 0 && (
            <div className={pokemonDetails ? 'pokedex__content pokedex__gutter' : 'pokedex__content'}>
                    <ul className={'pokedex__search-results'}>
                        {
                            pokemonIndex.map(monster => {
                                return (
                                    <li className={'pokedex__results__list-item'} key={monster.name}>
                                        <span>
                                            {monster.name}
                                        </span>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {typeof pokemonDetails !== 'string' &&(
                    <div className={'pokemon__details'}>
                        <div className={'pokedex__details'}>
                            <div className="pokedex__details__heading">
                                <h2>{ pokemonDetails.name }</h2>
                            </div>
                            <div className="pokedex__details__body">
                                <div className="pokedex__details__body__types">
                                    <h2>Types</h2>
                                    <ul>
                                        {
                                            pokemonDetails.typeList?.map((type, i) => {
                                                return(
                                                    <li className="pokedex__details__list-item" key={i}>{type}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className="pokedex__details__body__moves">
                                    <h2>Moves</h2>
                                    <ul>
                                    {
                                        pokemonDetails.moveList?.slice(0, 4).map((type, i) => {
                                            return(
                                                <li className="pokedex__details__list-item" key={i}>{type}</li>
                                            )
                                        })
                                    }
                                </ul>
                                </div>
                            </div>
                            <div className="pokedex__details__footer">
                                    <div className="pokedex__details__body__moves">
                                    <h2>Evolutions</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    </div>
                    )}
        </div>
    );
}

export default App;
