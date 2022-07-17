import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName, fetchEvolutionChainById } from "./api";
import Results from './results';
import Details from './details';

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
            <Results seeDetail={onGetDetails} list={pokemon} />
            {typeof pokemonDetails !== 'string' &&(
                <Details details={pokemonDetails} />
            )}
            </div>
            )}
            {pokemonIndex.length > 0 && (
                <div className={pokemonDetails ? 'pokedex__content pokedex__gutter' : 'pokedex__content'}>
                <Results seeDetail={onGetDetails} list={pokemonIndex} />
                
                {typeof pokemonDetails !== 'string' &&(
                    <Details details={pokemonDetails} />
                )}
            </div>
            )}
            {searchValue.length > 0 && pokemonIndex.length === 0 &&(
                <p>No Pokemon found</p>
            )}
        </div>
    )
}

export default App;
