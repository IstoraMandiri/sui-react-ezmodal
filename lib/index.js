'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EZModal = function (_Component) {
  _inherits(EZModal, _Component);

  function EZModal(props) {
    _classCallCheck(this, EZModal);

    var _this = _possibleConstructorReturn(this, (EZModal.__proto__ || Object.getPrototypeOf(EZModal)).call(this, props));

    _this.state = { showing: false, formData: _this.props.data || {} };
    _this.handleShowToggle = _this.handleShowToggle.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleThisSubmit = _this.handleThisSubmit.bind(_this);
    _this.handleResetFormData = _this.handleResetFormData.bind(_this);
    return _this;
  }

  _createClass(EZModal, [{
    key: 'handlePromiseOrFunc',
    value: function handlePromiseOrFunc(promiseOrFunc) {
      if (promiseOrFunc && typeof promiseOrFunc.then === 'function') {
        return promiseOrFunc;
      }
      return new Promise(function (resolve) {
        return resolve(promiseOrFunc);
      });
    }
  }, {
    key: 'handleShowToggle',
    value: function handleShowToggle(showing) {
      var update = { showing: showing };
      if (showing) {
        update.formData = this.props.data || {};
      }
      this.setState(update);
    }
  }, {
    key: 'handleResetFormData',
    value: function handleResetFormData() {
      this.setState({ formData: this.props.data });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ formData: _extends({}, this.state.formData, _defineProperty({}, e.target.name, e.target.value)) });
    }
  }, {
    key: 'handleThisSubmit',
    value: function handleThisSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      if (this.props.handleSubmit) {
        return this.handlePromiseOrFunc(this.props.handleSubmit(this.state.formData)).then(function (res) {
          if (res !== false) {
            _this2.handleShowToggle(false);
          }
        });
      }
      return this.handleShowToggle(false);
    }
  }, {
    key: 'renderCompOrFunc',
    value: function renderCompOrFunc(compOrFunc, props) {
      // hide if not showing for less buggery
      if (!this.state.showing) {
        return null;
      }
      return typeof compOrFunc === 'function' ? compOrFunc(props) : compOrFunc;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          data = _props.data,
          trigger = _props.trigger,
          header = _props.header,
          content = _props.content,
          actions = _props.actions,
          _onClose = _props.onClose,
          handleRemove = _props.handleRemove,
          removeHeader = _props.removeHeader,
          removeContent = _props.removeContent,
          noCloseButton = _props.noCloseButton,
          noSubmitButton = _props.noSubmitButton,
          closeButtonText = _props.closeButtonText,
          submitButtonText = _props.submitButtonText,
          handleSubmit = _props.handleSubmit,
          loading = _props.loading,
          modalProps = _objectWithoutProperties(_props, ['data', 'trigger', 'header', 'content', 'actions', 'onClose', 'handleRemove', 'removeHeader', 'removeContent', 'noCloseButton', 'noSubmitButton', 'closeButtonText', 'submitButtonText', 'handleSubmit', 'loading']);

      var _state = this.state,
          showing = _state.showing,
          formData = _state.formData;
      var handleChange = this.handleChange,
          handleThisSubmit = this.handleThisSubmit,
          handleShowToggle = this.handleShowToggle,
          handleResetFormData = this.handleResetFormData;

      var hide = function hide() {
        return handleShowToggle(false);
      };
      var childProps = {
        data: data,
        formData: formData,
        hide: hide,
        resetFormData: handleResetFormData,
        change: handleChange,
        submit: handleThisSubmit
      };
      var notShowingClosed = typeof noCloseButton === 'function' ? noCloseButton(childProps) : noCloseButton;
      var notShowingSubmit = typeof noSubmitButton === 'function' ? noSubmitButton(childProps) : noSubmitButton;
      var submitButtonContent = typeof submitButtonText === 'function' ? submitButtonText(childProps) : submitButtonText;
      var closeButtonContent = typeof closeButtonText === 'function' ? closeButtonText(childProps) : closeButtonText;
      var defaultButtons = [!notShowingClosed && _react2.default.createElement(_semanticUiReact.Button, { key: 'close', content: closeButtonContent || 'Cancel', onClick: hide }), !notShowingSubmit && _react2.default.createElement(_semanticUiReact.Button, { key: 'submit', positive: true, icon: 'checkmark', labelPosition: 'right', content: submitButtonContent || 'OK', onClick: handleThisSubmit })];
      return _react2.default.createElement(
        _semanticUiReact.Modal,
        _extends({}, modalProps, {
          trigger: trigger,
          open: showing,
          onOpen: function onOpen() {
            return handleShowToggle(true);
          },
          onClose: function onClose() {
            handleShowToggle(false);if (_onClose) {
              _onClose();
            }
          }
        }),
        this.props.loading && _react2.default.createElement(
          _semanticUiReact.Dimmer,
          { active: true, inverted: true },
          _react2.default.createElement(_semanticUiReact.Loader, { content: this.props.loading })
        ),
        header && _react2.default.createElement(
          _semanticUiReact.Modal.Header,
          null,
          header
        ),
        _react2.default.createElement(
          _semanticUiReact.Modal.Content,
          null,
          this.props.handleSubmit ? // only use a form if we expect a submit
          _react2.default.createElement(
            _semanticUiReact.Form,
            { onSubmit: handleThisSubmit },
            this.renderCompOrFunc(content, childProps)
          ) : this.renderCompOrFunc(content, childProps)
        ),
        actions !== false && _react2.default.createElement(
          _semanticUiReact.Modal.Actions,
          null,
          handleRemove && _react2.default.createElement(EZModal, {
            key: 'delete',
            size: 'small',
            header: removeHeader || 'Please Confirm',
            content: removeContent || 'Are you sure you wish to remove?',
            handleSubmit: function handleSubmit() {
              handleRemove(formData);hide();
            },
            trigger: _react2.default.createElement(_semanticUiReact.Button, {
              negative: true,
              icon: 'trash',
              labelPosition: 'left',
              key: 'delete',
              content: 'Remove',
              style: { float: 'left', marginLeft: '0' }
            })
          }),
          actions ? this.renderCompOrFunc(actions, childProps) : defaultButtons
        )
      );
    }
  }]);

  return EZModal;
}(_react.Component);

exports.default = EZModal;


EZModal.propTypes = {
  trigger: _react.PropTypes.object.isRequired,
  loading: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  data: _react.PropTypes.object,
  onClose: _react.PropTypes.func,
  header: _react.PropTypes.string,
  content: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]).isRequired,
  actions: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func, _react.PropTypes.bool]),
  handleSubmit: _react.PropTypes.func,
  handleRemove: _react.PropTypes.func,
  removeHeader: _react.PropTypes.string,
  removeContent: _react.PropTypes.oneOfType([_react.PropTypes.node, _react.PropTypes.func]),
  noCloseButton: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
  noSubmitButton: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.func]),
  closeButtonText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  submitButtonText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func])
};