import { Component } from 'react';

export class FormAddContacts extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddContact(
      {
        name: this.state.name,
        number: this.state.number,
      },
      this.clean
    );
  };
  clean = () => this.setState({ name: '', number: '' });
  render() {
    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            id="name"
            onChange={e => this.handleChange(e)}
            value={this.state.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="number" className="form-label">
            Number
          </label>
          <input
            type="tel"
            className="form-control"
            name="number"
            id="number"
            value={this.state.number}
            onChange={e => this.handleChange(e)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add contact
        </button>
      </form>
    );
  }
}
