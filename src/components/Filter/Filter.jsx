export const Filter = ({ state, handleChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Find contact by name
      </label>
      <input
        type="text"
        className="form-control"
        name="filter"
        onChange={e => handleChange(e)}
        value={state.filter}
        required
      />
    </div>
  );
};
