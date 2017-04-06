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

    _this.state = { showing: _this.props.initiallyOpen, error: null, loading: false, formData: _this.props.data || {} };
    _this.handleShowToggle = _this.handleShowToggle.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleThisSubmit = _this.handleThisSubmit.bind(_this);
    _this.handleResetFormData = _this.handleResetFormData.bind(_this);
    _this.handleSetFormData = _this.handleSetFormData.bind(_this);
    _this.handleSetError = _this.handleSetError.bind(_this);
    _this.handleSetLoading = _this.handleSetLoading.bind(_this);
    _this.handleHide = _this.handleHide.bind(_this);
    return _this;
  }
  // TODO REMOVE THIS HACK
  // https://github.com/Semantic-Org/Semantic-UI-React/issues/1157


  _createClass(EZModal, [{
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.fixBody();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.fixBody();
    }
  }, {
    key: 'fixBody',
    value: function fixBody() {
      var anotherModal = document.getElementsByClassName('ui page modals').length;
      if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    }
    // END HACK

  }, {
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
      this.setState(_extends({}, update, { error: null, loading: false }));
    }
  }, {
    key: 'handleSetFormData',
    value: function handleSetFormData(data) {
      this.setState({ formData: data });
    }
  }, {
    key: 'handleResetFormData',
    value: function handleResetFormData() {
      this.setState({ formData: this.props.data, error: null, loading: false });
      if (this.props.onReset) {
        this.props.onReset();
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var name = e.target ? e.target.name : e.name;
      var value = e.target ? e.target.value : e.value;
      this.setState({ formData: _extends({}, this.state.formData, _defineProperty({}, name, value)) });
    }
  }, {
    key: 'handleSetError',
    value: function handleSetError(error, errorHeader) {
      this.setState({ error: error, errorHeader: error && errorHeader });
    }
  }, {
    key: 'handleSetLoading',
    value: function handleSetLoading(loading) {
      this.setState({ loading: loading });
    }
  }, {
    key: 'handleThisSubmit',
    value: function handleThisSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      if (this.props.handleSubmit) {
        try {
          return this.handlePromiseOrFunc(this.props.handleSubmit(this.state.formData)).then(function (res) {
            if (res !== false) {
              _this2.handleHide();
            }
          }).catch(function (error) {
            return _this2.handleSetError({ error: error });
          });
        } catch (error) {
          this.handleSetError({ error: error });
          return false;
        }
      }
      return this.handleHide();
    }
  }, {
    key: 'handleHide',
    value: function handleHide() {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.handleShowToggle(false);
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
          handleRemove = _props.handleRemove,
          removeHeader = _props.removeHeader,
          removeContent = _props.removeContent,
          noCloseButton = _props.noCloseButton,
          noSubmitButton = _props.noSubmitButton,
          closeButtonText = _props.closeButtonText,
          submitButtonText = _props.submitButtonText,
          disableHiddenSubmitButton = _props.disableHiddenSubmitButton,
          handleSubmit = _props.handleSubmit,
          loading = _props.loading,
          error = _props.error,
          errorHeader = _props.errorHeader,
          initiallyOpen = _props.initiallyOpen,
          onClose = _props.onClose,
          otherProps = _objectWithoutProperties(_props, ['data', 'trigger', 'header', 'content', 'actions', 'handleRemove', 'removeHeader', 'removeContent', 'noCloseButton', 'noSubmitButton', 'closeButtonText', 'submitButtonText', 'disableHiddenSubmitButton', 'handleSubmit', 'loading', 'error', 'errorHeader', 'initiallyOpen', 'onClose']);

      var _state = this.state,
          showing = _state.showing,
          formData = _state.formData;
      var handleSetError = this.handleSetError,
          handleSetFormData = this.handleSetFormData,
          handleChange = this.handleChange,
          handleThisSubmit = this.handleThisSubmit,
          handleShowToggle = this.handleShowToggle,
          handleResetFormData = this.handleResetFormData,
          handleSetLoading = this.handleSetLoading;

      var hide = this.handleHide;
      var childProps = {
        data: data,
        formData: formData,
        hide: hide,
        setFormData: handleSetFormData,
        resetFormData: handleResetFormData,
        formChange: handleChange,
        submit: handleThisSubmit,
        setError: handleSetError,
        setLoading: handleSetLoading
      };
      var notShowingClosed = typeof noCloseButton === 'function' ? noCloseButton(childProps) : noCloseButton;
      var notShowingSubmit = typeof noSubmitButton === 'function' ? noSubmitButton(childProps) : noSubmitButton;
      var submitButtonContent = typeof submitButtonText === 'function' ? submitButtonText(childProps) : submitButtonText;
      var closeButtonContent = typeof closeButtonText === 'function' ? closeButtonText(childProps) : closeButtonText;
      var defaultButtons = handleSubmit || handleRemove ? [!notShowingClosed && _react2.default.createElement(_semanticUiReact.Button, { key: 'close', content: closeButtonContent || 'Cancel', onClick: hide }), !notShowingSubmit && _react2.default.createElement(_semanticUiReact.Button, { type: 'submit', key: 'submit', positive: true, icon: 'checkmark', labelPosition: 'right', content: submitButtonContent || 'OK', onClick: handleThisSubmit })] : _react2.default.createElement(_semanticUiReact.Button, { content: closeButtonContent || 'Done', onClick: hide });
      var activeLoading = loading || this.state.loading;
      var loaderContent = typeof activeLoading === 'boolean' ? undefined : activeLoading;
      var activeError = error || this.state.error;
      var activeErrorHeader = errorHeader || this.state.errorHeader;
      return _react2.default.createElement(
        _semanticUiReact.Modal,
        _extends({}, otherProps, {
          trigger: trigger,
          open: showing,
          onOpen: function onOpen() {
            return handleShowToggle(true);
          },
          onClose: hide
        }),
        activeLoading && _react2.default.createElement(
          _semanticUiReact.Dimmer,
          { active: true, inverted: true },
          _react2.default.createElement(_semanticUiReact.Loader, { content: loaderContent })
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
            !disableHiddenSubmitButton && _react2.default.createElement('button', { type: 'submit', style: { position: 'absolute', visibility: 'hidden' } }),
            this.renderCompOrFunc(content, childProps)
          ) : this.renderCompOrFunc(content, childProps),
          activeError && _react2.default.createElement(
            _semanticUiReact.Message,
            { icon: true, error: true },
            _react2.default.createElement(_semanticUiReact.Icon, { name: 'warning sign' }),
            _react2.default.createElement(
              _semanticUiReact.Message.Content,
              null,
              _react2.default.createElement(
                _semanticUiReact.Message.Header,
                null,
                activeErrorHeader || 'Oops, something went wrong'
              ),
              '' + (activeError.message || activeError.error && activeError.error.message || activeError.error || activeError)
            )
          )
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
  trigger: _react.PropTypes.object,
  loading: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.string]),
  data: _react.PropTypes.object,
  error: _react.PropTypes.any,
  initiallyOpen: _react.PropTypes.bool,
  errorHeader: _react.PropTypes.string,
  onClose: _react.PropTypes.func,
  onReset: _react.PropTypes.func,
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
  submitButtonText: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
  disableHiddenSubmitButton: _react.PropTypes.bool
};