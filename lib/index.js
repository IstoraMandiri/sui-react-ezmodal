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
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(EZModal, [{
    key: 'handleShowToggle',
    value: function handleShowToggle(showing) {
      this.setState({ showing: showing });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState({ formData: _extends({}, this.state.formData, _defineProperty({}, e.target.name, e.target.value)) });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();
      if (this.props.handleSubmit) {
        this.props.handleSubmit(this.state.formData);
      }
      this.handleShowToggle(false);
    }
  }, {
    key: 'renderCompOrFunc',
    value: function renderCompOrFunc(compOrFunc, props) {
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
          actions = _props.actions;
      var _state = this.state,
          showing = _state.showing,
          formData = _state.formData;
      var handleChange = this.handleChange,
          handleSubmit = this.handleSubmit,
          handleShowToggle = this.handleShowToggle;

      var hide = function hide() {
        return handleShowToggle(false);
      };
      var childProps = {
        data: data,
        formData: formData,
        hide: hide,
        change: handleChange,
        submit: handleSubmit
      };
      return _react2.default.createElement(
        _semanticUiReact.Modal,
        _extends({}, this.props, {
          trigger: trigger,
          open: showing,
          onOpen: function onOpen() {
            return handleShowToggle(true);
          },
          onClose: function onClose() {
            return handleShowToggle(false);
          }
        }),
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
            { onSubmit: handleSubmit },
            this.renderCompOrFunc(content, childProps)
          ) : this.renderCompOrFunc(content, childProps)
        ),
        _react2.default.createElement(
          _semanticUiReact.Modal.Actions,
          null,
          actions ? this.renderCompOrFunc(actions, childProps) : [_react2.default.createElement(_semanticUiReact.Button, { key: 'close', content: 'Cancel', onClick: hide }), _react2.default.createElement(_semanticUiReact.Button, { key: 'submit', positive: true, icon: 'checkmark', labelPosition: 'right', content: 'OK', onClick: handleSubmit })]
        )
      );
    }
  }]);

  return EZModal;
}(_react.Component);

exports.default = EZModal;


EZModal.propTypes = {
  data: _react.PropTypes.object,
  header: _react.PropTypes.string,
  actions: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  content: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]).isRequired,
  trigger: _react.PropTypes.object.isRequired,
  handleSubmit: _react.PropTypes.func
};