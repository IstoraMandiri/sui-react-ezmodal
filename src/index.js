import React, { PropTypes, Component } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class EZModal extends Component {
  constructor(props) {
    super(props);
    this.state = { showing: false, formData: this.props.data || {} };
    this.handleShowToggle = this.handleShowToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleShowToggle(showing) {
    const update = { showing };
    if (showing) { update.formData = this.props.data || {}; }
    this.setState(update);
  }
  handleChange(e) {
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.handleSubmit) {
      this.props.handleSubmit(this.state.formData);
    }
    this.handleShowToggle(false);
  }
  renderCompOrFunc(compOrFunc, props) {
    return typeof compOrFunc === 'function' ? compOrFunc(props) : compOrFunc;
  }
  render() {
    const {
      data, trigger, header, content, actions,
      handleRemove, removeHeader, removeContent,
      ...modalProps,
    } = this.props;
    const { showing, formData } = this.state;
    const { handleChange, handleSubmit, handleShowToggle } = this;
    const hide = () => handleShowToggle(false);
    const childProps = {
      data,
      formData,
      hide,
      change: handleChange,
      submit: handleSubmit,
    };
    const defaultButtons = [
      <Button key="close" content="Cancel" onClick={hide} />,
      <Button key="submit" positive icon="checkmark" labelPosition="right" content="OK" onClick={handleSubmit} />,
    ];
    if (handleRemove) {
      defaultButtons.unshift(
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
      );
    }
    return (
      <Modal
        {...modalProps}
        trigger={trigger}
        open={showing}
        onOpen={() => handleShowToggle(true)}
        onClose={() => handleShowToggle(false)}
      >
        {header && <Modal.Header>{header}</Modal.Header>}
        <Modal.Content>
          {this.props.handleSubmit ? // only use a form if we expect a submit
            <Form onSubmit={handleSubmit}>
              {this.renderCompOrFunc(content, childProps)}
            </Form>
          :
            this.renderCompOrFunc(content, childProps)
          }
        </Modal.Content>
        <Modal.Actions>
          {actions ?
            this.renderCompOrFunc(actions, childProps)
          :
            defaultButtons
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

EZModal.propTypes = {
  trigger: PropTypes.object.isRequired,
  data: PropTypes.object,
  header: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  handleSubmit: PropTypes.func,
  handleRemove: PropTypes.func,
  removeHeader: PropTypes.string,
  removeContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
