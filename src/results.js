function Results(props) {

  return (
    <ul className={'pokedex__search-results'}>
    {
        props.list.map(monster => {
            return (
                <li className={'pokedex__results__list-item'} key={monster.name}>
                    <span>
                        {monster.name}
                    </span>
                    <button onClick={props.seeDetail(monster.name)}>Get Details</button>
                </li>
            )
        })
    }
  </ul>
  )
}


export default Results;