import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

const DEFAULT_CHILD_COMPONENT_NAMES = {
  Sidebar: 'DefaultSidebar',
  Header: 'DefaultHeader',
  List: 'DefaultList',
  Record: 'DefaultRecord',
  QuickSearch: 'DefaultQuickSearch',
  LoadMoreButton: 'DefaultLoadMoreButton'
}

class App extends Component {
  constructor(props) {
    super(props);
    this._setupHandlers();
    this._setupChildComponents();
  }

  componentWillMount() {
    this.props.actions.setBaseUri(this.props.recordsPath);
    this.props.actions.fetchRecords();
  }

  render() {
    const { Sidebar, Header, List } = this.props.childComponents;

    return(
      <div>
        <Sidebar {...this.props} />

        <div className="page-wrap">
          <Header {...this.props} />
          <List {...this.props} />
        </div>
      </div>
    );
  }

  _setupHandlers() {
    this.props.handlers.deleteRecord = this._deleteRecord;
    this.props.handlers.loadNextPage = this._loadNextPage;
  }

  _setupChildComponents() {
    let names = Object.assign({}, DEFAULT_CHILD_COMPONENT_NAMES, this.props.childComponentNames);
    Object.keys(names).forEach((key) => {
      name = names[key];
      this.props.childComponents[key] = window.ResourceIndexComponents[name];
    });
  }
  _deleteRecord(e, record) {
    e.preventDefault();
    if (confirm('Are you sure?')) {
      this.props.actions.deleteRecord(record);
    }
  }

  _loadNextPage(e) {
    e.preventDefault();
    this.props.actions.loadNextPage();
  }
}

App.defaultProps = {
  childComponentNames: {},
  childComponents: {},
  handlers: {}
}

function mapStateToProps(state) {
  return {...state };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);