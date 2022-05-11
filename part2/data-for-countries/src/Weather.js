const Weather = ({ name, temp, src, alt, wind }) => {

    return (
      <div>
        <h3>Weather in {name}</h3>
        <p>temperature {temp} Celcius</p>
        <img
          src={src}
          alt={alt}
        />
        <p>wind {wind} m/s</p>
      </div>
    );
};

export default Weather;