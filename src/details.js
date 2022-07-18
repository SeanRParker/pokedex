function Details(props) {
  return (
    <div className={'pokemon__details'}>
      <div className={'pokedex__details'}>
          <div className="pokedex__details__heading">
              <h2>{ props.details.name }</h2>
          </div>
          <div className="pokedex__details__body">
              <div className="pokedex__details__body__types">
                  <h2>Types</h2>
                  <ul>
                      {
                          props.details.typeList?.map((type, i) => {
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
                    props.details.moveList?.slice(0, 4).map((type, i) => {
                          return(
                              <li className="pokedex__details__list-item" key={i}>{type}</li>
                          )
                      })
                  }
              </ul>
              </div>
          </div>
            <div className="pokedex__details__footer">
                <div className="pokedex__details__body__evolutions">
                {/* <h2>Evolutions</h2> */}
            </div>
          </div>
      </div>
    </div>
    )}


export default Details;