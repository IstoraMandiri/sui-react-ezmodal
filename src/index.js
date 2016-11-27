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
    this.setState({ showing });
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
    const { data, trigger, header, content, actions } = this.props;
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
    return (
      <Modal
        {...this.props}
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
            [
              <Button key="close" content="Cancel" onClick={hide} />,
              <Button key="submit" positive icon="checkmark" labelPosition="right" content="OK" onClick={handleSubmit} />,
            ]
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

EZModal.propTypes = {
  data: PropTypes.object,
  header: PropTypes.string,
  actions: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  trigger: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func,
};
