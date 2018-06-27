//#region imports
import * as React from 'react';
import { Layout, Select } from 'antd';
import { Centered, Header } from 'components/Layout';
import { InputType } from './index';
//#endregion

//#region Component interfaces
export interface ViewProps extends InputSelectProps { }

interface InputSelectProps {
  onChange: (value: string) => any;
  defaultValue?: InputType;
}
//#endregion

/**
 * Renders a select component with input types.
 */
const InputSelect: React.SFC<ViewProps> = (props) => (
  <Select onChange={props.onChange} defaultValue={props.defaultValue}>
    <Select.Option value={InputType.Grammar}>Grammar</Select.Option>
    <Select.Option value={InputType.Automaton}>Automaton</Select.Option>
    <Select.Option value={InputType.Regexp}>Expression</Select.Option>
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
          defaultValue={props.defaultValue || InputType.Grammar}
        />
      </Centered>
    </Header>
    <Layout.Content>
      { props.children }
    </Layout.Content>
  </Layout>
);

export default View;
