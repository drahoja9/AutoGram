//#region imports
import * as React from 'react';
import { Layout, Select } from 'antd';
import { Centered, Header } from 'components/Layout';
//#endregion

//#region Component interfaces
export interface ViewProps extends InputSelectProps { }

interface InputSelectProps {
  onChange: (value: string) => any;
  defaultValue?: string;
}
//#endregion

/**
 * Renders a select component with input types.
 */
const InputSelect: React.SFC<ViewProps> = (props) => (
  <Select onChange={props.onChange} defaultValue="gr">
    <Select.Option value="gr">Grammar</Select.Option>
    <Select.Option value="au">Automaton</Select.Option>
    <Select.Option value="ex">Expression</Select.Option>
  </Select>
);

/**
 * Renders a basic layout for input form with
 * controls of input type.
 */
const View: React.SFC<ViewProps> = (props) => (
  <Layout>
    <Header>
      <Centered>
        <InputSelect
          onChange={props.onChange}
          defaultValue={props.defaultValue || 'gr'}
        />
      </Centered>
    </Header>
    <Layout.Content>
      { props.children }
    </Layout.Content>
  </Layout>
);

export default View;
