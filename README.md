# Semantic UI React EZModal

### Return of the EZ

Back in Meteor land I had a helpful package called EZModal.

Now in react land (`semantic-ui-react` land specifically), there was a need for it's return.

### Install

```bash
npm install --save sui-react-ez-modal
```

### Usage

```javascript
import React, { PropTypes, Component } from 'react';
import { Grid, Segment, Button, Header } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

class NetworkConfig extends Component {
  render() {
    return (
      <EZModal
        // required trigger element
        trigger={<Button basic icon="plus" content="Do Something Cool" />}
        // optional data to be passed to content & actions
        data={{ name: 'bobby' }}
        // required content element with props passed
        content={({ formData, change }) => {
          <Form.Group widths="equal">
            <Button type="submit" className="hidden" />
            <Form.Field>
              <label>Provider Name</label>
              <Input onChange={change} value={formData.name || ''} name="name" />
            </Form.Field>
          </Form.Group>
        }}
        // optional actions, hide/submit event handlers passed as props
        actions={({ hide, submit }) => {
          return [
            <Button onClick={hide} key="close" icon="remove" floated="left" content="Cancel" />,
            <Button onClick={submit} key="submit" icon="checkmark" color="green" content="OK" />,
          ]
        }}
        // optional title header
        header="This is my new Modal"
        // callback function after submit
        handleSubmit={(data) => console.log(data)}
      />
    );
  }
}
```

### License

MIT 2016
