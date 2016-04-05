/* global React */
/* global ReactDOM */
/* global classNames */

() => {
  class ModalForm extends React.Component {
    componentDidMount() {
      window.addEventListener('keydown', this._closeOnEsc.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this._closeOnEsc.bind(this));
    }

    componentDidUpdate() {
      if (this.props.ui.modalFormActive) {
        const node = ReactDOM.findDOMNode(this._form);

        node.querySelectorAll(':scope input[type=text]')[0].focus();
      }
    }

    _closeOnEsc(e) {
      if (e.which === 27) {
        this.props.actions.toggleModalForm('off');
      }
    }

    _onSubmit(e) {
      const { currentRecord } = this.props.data;
      const { updateRecordInModal, createRecordInModal } = this.props.actions;

      e.preventDefault();
      if (currentRecord.update_path) {
        updateRecordInModal(currentRecord);
      } else {
        createRecordInModal(currentRecord);
      }
    }

    _updateValue(e) {
      const { updateCurrentRecord } = this.props.actions;

      updateCurrentRecord({ [e.target.name]: e.target.value });
    }

    render() {
      const { ModalFields } = this.props.childComponents;
      const { modalFormActive } = this.props.ui;
      const { toggleModalForm } = this.props.handlers;
      const { currentRecordErrors } = this.props.data;
      const baseErrors = currentRecordErrors.base || [];

      const modalClassNames = classNames({
        'modal': true,
        'modal--is-active': modalFormActive
      });
      const overlayClassNames = classNames({
        'modal-overlay': true,
        'modal-overlay--is-active': modalFormActive
      });

      return (
        <div>
          <div className={modalClassNames}>
            <form
                onSubmit={(e) => this._onSubmit(e)}
                ref={(f) => this._form = f}>
              <div className="modal__content">
                <div
                  className={baseErrors.length && 'input-block' }>
                  {baseErrors.map((error) => {
                    return (
                      <label className="input-block__error-message">
                        {error}
                      </label>
                    );
                  })}
                </div>

                <ModalFields
                  { ...this.props }
                  onChange={(e) => this._updateValue(e)} />
              </div>

              <div className="modal__footer">
                <button
                  onClick={(e) => toggleModalForm(e, 'off')}
                  className="modal__action">
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal__action">
                  Save
                </button>
              </div>
            </form>

          </div>
          <div
            onClick={(e) => toggleModalForm(e, 'off')}
            className={overlayClassNames}>
          </div>
        </div>
      );
    }
  }

  window.ResourceIndexComponents.DefaultModalForm = ModalForm;
}();
