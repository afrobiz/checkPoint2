import React from 'react';
import PropTypes from 'prop-types';

class UserCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: this.props.allUsers
    };
    this.selectUser = this
      .selectUser
      .bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ allUsers: nextProps.allUsers, selectId: '' });
  }

  selectUser(id) {
    this.setState({ selectId: id });
  }
  render() {
    const { allUsers, selectId } = this.state;
    return (
      <div>

        <table className="userTable striped responsive-table">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>User Id</th>
              <th>Role Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map(users => (
              <tr key={users.id}>
                <td>{users.email}</td>
                <td>{users.id}</td>
                <td>{users.roleId}</td>
                <td>
                  <a href="#deleteModal2">
                    <i
                      className="material-icons"
                      role="button"
                      onClick={() => this.selectUser(users.id)}
                    >
                      delete
                    </i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="deleteModal2" className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this user?</p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => this.props.deleteUser(selectId)}
              className="modal-action modal-close waves-effect waves-green btn-flat">
              Yes
            </button>
            <button className="modal-action modal-close waves-effect waves-green btn-flat">
              No
            </button>
          </div>
        </div>

      </div>
    );
  }
}

UserCard.propTypes = {
  allUsers: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
};

export default UserCard;