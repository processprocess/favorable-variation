import axios from 'axios'

function FormContainer(Form, formConfig, postURL) {
  // ...and returns another component...
  return class WrappedForm extends React.Component {

    static propTypes = {
      additionalFormData: PropTypes.object,
    }

    constructor() {
      super()
      this.state = this.freshState();
      this.setters = this.makeSetters();
    }

    freshState() {
      return Object.assign({}, this.freshSubmissionState(), this.freshFields())
    }

    freshSubmissionState() {
      return {
        posting: false,
        success: false,
        submitAttempted: false,
      }
    }

    freshFields() {
      return _.mapValues(formConfig, (item) => {
        return item.default ? item.default : '';
      })
    }

    dataFromForm() {
      return Object.assign({}, 
        this.formValues(),
        {path: window.location.href},
        this.props.additionalFormData || {},
      );
    }

    formValues() {
      return Object.assign({}, _.mapValues(formConfig, (value, field) => {
        return this.state[field];
      }))
    }

    makeSetters() {
      return Object.assign({}, _.mapValues(formConfig, (value, field) => {
        return this.makeSetterFor(field);
      }))
    }

    makeSetterFor(id) {
      return (value) => {
        const newState = {}
        newState[id] = formConfig[id].middleware(value, this.state[id]);
        if (this.state[id] !== newState[id]) {
          this.setState(newState)
        }
      }
    }

    checkForErrors() {
      return Object.assign({}, _.mapValues(formConfig, (value, field) => {
        return !this.fieldIsValid(field, formConfig);
      }))
    }

    fieldIsValid(field) {
      return formConfig[field].validation(this.state[field])
    }

    handleSubmit = (formConfig) => {
      const {posting} = this.state;
      if (postURL === '/api/v2/job-ops/') {
        if (!posting) {
          const allFieldsValid = _.every(this.checkForErrors(formConfig), error => !error)
          if (allFieldsValid) {
            const config = {
              headers: {
                'content-type': 'multipart/form-data'
              }
            }

            const data = this.dataFromForm();
            const formData = new FormData();

            Object.keys(data).forEach( k => {
              formData.append(k, data[k])
            });

            this.setState({ posting: true });
            axios.post(postURL, formData, config).then(() => {
              this.setState(Object.assign({}, {posting: false, success: true}, this.freshFields()));
            }).catch(() => {
              this.setState({ posting: false });
            });
          } else {
            this.setState({ submitAttempted: true })
          }
        }
      } else {
        if (!posting) {
          const allFieldsValid = _.every(this.checkForErrors(formConfig), error => !error)
          if (allFieldsValid) {
            const data = this.dataFromForm();
            this.setState({ posting: true });
            axios.post(postURL, data).then(() => {
              this.setState(Object.assign({}, {posting: false, success: true}, this.freshFields()))
            }).catch(() => {
              this.setState({ posting: false });
            });
          } else {
            this.setState({ submitAttempted: true })
          }
        }
      }
    }

    handleKeyDown = (e) => {
      if(e.keyCode === 13 && !this.state.posting && !this.state.success) {
        this.handleSubmit();
      }
    }

    render() {
      const { submitAttempted, success, posting } = this.state;
      if (success && formConfig.gaLabel)
        ga('send', {
          hitType: 'event',
          eventCategory: 'Form',
          eventAction: 'Completion',
          eventLabel: formConfig.gaLabel.label,
          eventValue: 0
        })
      return (
        <Form
          handleKeyDown={this.handleKeyDown}
          submitAttempted={ submitAttempted }
          isPosting={ posting }
          success={ success }
          values={ this.formValues() }
          errors={ this.checkForErrors() }
          setters={ this.setters }
          submitHandler={ this.handleSubmit }
          {...this.props}
        />
      )
    }
  } 
}

export default FormContainer;