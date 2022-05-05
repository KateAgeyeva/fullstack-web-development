const Persons = ({ newFilter, filterArr, persons }) => {

    return (
      <div>
        {newFilter.length < 1
          ? persons.map(({ id, name, number }) => (
              <p key={id}>
                {name} {number}
              </p>
            ))
          : filterArr.map(({ id, name, number }) => (
              <p key={id}>
                {name} {number}
              </p>
            ))}
      </div>
    );
};

export default Persons;