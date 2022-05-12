const Persons = ({ newFilter, filterArr, persons, onClick }) => {

    return (
      <div>
        {newFilter.length < 1
          ? persons.map(({ id, name, number }) => (
              <p key={id}>
                {name} {number}
                <button onClick={() => onClick(id)}>delete</button>
              </p>
            ))
          : filterArr.map(({ id, name, number }) => (
              <div key={id}>
                <p>
                  {name} {number}
                </p>
                <button onClick={onClick}>delete</button>
              </div>
            ))}
      </div>
    );
};

export default Persons;