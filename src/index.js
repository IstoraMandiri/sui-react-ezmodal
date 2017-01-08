import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form, Dimmer, Loader } from 'semantic-ui-react';

export default class EZModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showing: false, formData: this.props.data || {} };
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleThisSubmit = this.handleThisSubmit.bind(this);
  }
  handlePromiseOrFunc(promiseOrFunc) {
    if (promiseOrFunc && typeof promiseOrFunc.then === 'function') {
      return promiseOrFunc;
    }
    return new Promise((resolve) => resolve(promiseOrFunc));
  }
  handleShowToggle(showing) {
    const update = { showing };
    if (showing) { update.formData = this.props.data || {}; }
    this.setState(update);
  }
  handleChange(e) {
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
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
      handleSubmit, loading, // plucked so we can pass modalProps
      /* eslint-enable no-unused-vars */
      ...modalProps,
    } = this.props;
    const { showing, formData } = this.state;
    const { handleChange, handleThisSubmit, handleShowToggle } = this;
    const hide = () => handleShowToggle(false);
    const childProps = {
      data,
      formData,
      hide,
      change: handleChange,
      submit: handleThisSubmit,
    };
    const notShowingClosed = typeof noCloseButton === 'function' ? noCloseButton(childProps) : noCloseButton;
    const notShowingSubmit = typeof noSubmitButton === 'function' ? noSubmitButton(childProps) : noSubmitButton;
    const submitButtonContent = typeof submitButtonText === 'function' ? submitButtonText(childProps) : submitButtonText;
    const closeButtonContent = typeof closeButtonText === 'function' ? closeButtonText(childProps) : closeButtonText;
    const defaultButtons = [
      !notShowingClosed && <Button key="close" content={closeButtonContent || 'Cancel'} onClick={hide} />,
      !notShowingSubmit && <Button key="submit" positive icon="checkmark" labelPosition="right" content={submitButtonContent || 'OK'} onClick={handleThisSubmit} />,
    ];
    return (
      <Modal
        {...modalProps}
        trigger={trigger}
        open={showing}
        onOpen={() => handleShowToggle(true)}
        onClose={() => { handleShowToggle(false); if (onClose) { onClose(); } }}
      >
        {this.props.loading && <Dimmer active inverted><Loader content={this.props.loading} /></Dimmer>}
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Content>
          {this.props.handleSubmit ? // only use a form if we expect a submit
            <Form onSubmit={handleThisSubmit}>
              {this.renderCompOrFunc(content, childProps)}
            </Form>
          :
            this.renderCompOrFunc(content, childProps)
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
  trigger: PropTypes.object.isRequired,
  loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  data: PropTypes.object,
  onClose: PropTypes.func,
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
