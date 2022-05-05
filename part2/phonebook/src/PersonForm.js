const PersonForm = ({ valueName, valueNumber, onChangeName, onChangeNumber, onClick }) => {

    return (
      <form>
        <div>
          <div>
            name:{" "}
            <input
              value={valueName}
              onChange={onChangeName}
            />
          </div>
          <div>
            number:{" "}
            <input
              value={valueNumber}
              onChange={onChangeNumber}
            />
          </div>
        </div>
        <div>
          <button type="submit" onClick={onClick}>
            add
          </button>
        </div>
      </form>
    );
};

export default PersonForm;