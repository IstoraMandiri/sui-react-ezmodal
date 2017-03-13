import React, { PropTypes, Component } from 'react';
import { Icon, Message, Modal, Button, Form, Dimmer, Loader } from 'semantic-ui-react';

export default class EZModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showing: this.props.initiallyOpen, error: null, loading: false, formData: this.props.data || {} };
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleThisSubmit = this.handleThisSubmit.bind(this);
    this.handleResetFormData = this.handleResetFormData.bind(this);
    this.handleSetFormData = this.handleSetFormData.bind(this);
    this.handleSetError = this.handleSetError.bind(this);
    this.handleSetLoading = this.handleSetLoading.bind(this);
  }
  handlePromiseOrFunc(promiseOrFunc) {
    if (promiseOrFunc && typeof promiseOrFunc.then === 'function') {
      return promiseOrFunc;
    }
    return new Promise((resolve) => resolve(promiseOrFunc));
  }
  handleShowToggle(showing) {
    const update = { showing };
    if (showing) {
      update.formData = this.props.data || {};
    }
    this.setState({ ...update, error: null, loading: false });
  }
  handleSetFormData(data) {
    this.setState({ formData: data });
  }
  handleResetFormData() {
    this.setState({ formData: this.props.data, error: null, loading: false });
    if (this.props.onReset) { this.props.onReset(); }
  }
  handleChange(e) {
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
  }
  handleSetError(error, errorHeader) {
    this.setState({ error, errorHeader: error && errorHeader });
  }
  handleSetLoading(loading) {
    this.setState({ loading });
  }
  handleThisSubmit(e) {
    e.preventDefault();
    if (this.props.handleSubmit) {
      return this.handlePromiseOrFunc(this.props.handleSubmit(this.state.formData)).then((res) => {
        if (res !== false) {
          this.handleShowToggle(false);
        }
      });
    }
    return this.handleShowToggle(false);
  }
  renderCompOrFunc(compOrFunc, props) {
    // hide if not showing for less buggery
    if (!this.state.showing) { return null; }
    return typeof compOrFunc === 'function' ? compOrFunc(props) : compOrFunc;
  }
  render() {
    const {
      data,
      trigger,
      header, content,
      actions, onClose,
      handleRemove, removeHeader, removeContent,
      noCloseButton, noSubmitButton,
      closeButtonText, submitButtonText,
      /* eslint-disable no-unused-vars */
      handleSubmit, loading, error, errorHeader, initiallyOpen, // plucked so we can pass otherProps
      /* eslint-enable no-unused-vars */
      ...otherProps,
    } = this.props;
    const { showing, formData } = this.state;
    const {
      handleSetError,
      handleSetFormData,
      handleChange,
      handleThisSubmit,
      handleShowToggle,
      handleResetFormData,
      handleSetLoading,
    } = this;
    const hide = () => { if (onClose) { onClose(); } handleShowToggle(false); };
    const childProps = {
      data,
      formData,
      hide,
      setFormData: handleSetFormData,
      resetFormData: handleResetFormData,
      change: handleChange,
      submit: handleThisSubmit,
      setError: handleSetError,
      setLoading: handleSetLoading,
    };
    const notShowingClosed = typeof noCloseButton === 'function' ? noCloseButton(childProps) : noCloseButton;
    const notShowingSubmit = typeof noSubmitButton === 'function' ? noSubmitButton(childProps) : noSubmitButton;
    const submitButtonContent = typeof submitButtonText === 'function' ? submitButtonText(childProps) : submitButtonText;
    const closeButtonContent = typeof closeButtonText === 'function' ? closeButtonText(childProps) : closeButtonText;
    const defaultButtons = [
      !notShowingClosed && <Button key="close" content={closeButtonContent || 'Cancel'} onClick={hide} />,
      !notShowingSubmit && <Button type="submit" key="submit" positive icon="checkmark" labelPosition="right" content={submitButtonContent || 'OK'} onClick={handleThisSubmit} />,
    ];
    const activeLoading = loading || this.state.loading;
    const loaderContent = typeof activeLoading === 'boolean' ? undefined : activeLoading;
    const activeError = error || this.state.error;
    const activeErrorHeader = errorHeader || this.state.errorHeader;
    return (
      <Modal
        {...otherProps}
        trigger={trigger}
        open={showing}
        onOpen={() => handleShowToggle(true)}
        onClose={hide}
      >
        {activeLoading && <Dimmer active inverted><Loader content={loaderContent} /></Dimmer>}
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Content>
          {this.props.handleSubmit ? // only use a form if we expect a submit
            <Form onSubmit={handleThisSubmit}>
              {this.renderCompOrFunc(content, childProps)}
            </Form>
          :
            this.renderCompOrFunc(content, childProps)
          }
          {activeError &&
            <Message icon error>
              <Icon name="warning sign" />
              <Message.Content>
                <Message.Header>{activeErrorHeader || 'Oops, something went wrong'}</Message.Header>
                {`${activeError}`}
              </Message.Content>
            </Message>
          }
        </Modal.Content>
        {actions !== false &&
          <Modal.Actions>
            {handleRemove &&
              <EZModal
                key="delete"
                size="small"
                header={removeHeader || 'Please Confirm'}
                content={removeContent || 'Are you sure you wish to remove?'}
                handleSubmit={() => { handleRemove(formData); hide(); }}
                trigger={
                  <Button
                    negative
                    icon="trash"
                    labelPosition="left"
                    key="delete"
                    content="Remove"
                    style={{ float: 'left', marginLeft: '0' }}
                  />
                }
              />
            }
            {actions ?
              this.renderCompOrFunc(actions, childProps)
            :
              defaultButtons
            }
          </Modal.Actions>
        }
      </Modal>
    );
  }
}

EZModal.propTypes = {
  trigger: PropTypes.object,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  data: PropTypes.object,
  error: PropTypes.any,
  initiallyOpen: PropTypes.bool,
  errorHeader: PropTypes.string,
  onClose: PropTypes.func,
  onReset: PropTypes.func,
  header: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.bool]),
  handleSubmit: PropTypes.func,
  handleRemove: PropTypes.func,
  removeHeader: PropTypes.string,
  removeContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  noCloseButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  noSubmitButton: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  closeButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  submitButtonText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};
