const Country = ({ countriesList }) => {

    return (
      <div>
        <h2>{countriesList[0].name.common}</h2>
        <p>capital {countriesList[0].capital}</p>
        <p>area {countriesList[0].area}</p>
        <h4>languages:</h4>
        <ul>
          {Object.entries(countriesList[0].languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img src={countriesList[0].flags.png} alt="flag" />
      </div>
    );
};

export default Country;