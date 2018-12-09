//#region imports
import * as React from 'react';
import { Layout } from 'antd';

import {
  ResultHeader as Header
} from 'components/Layout';

//#endregion

//#region Component interfaces
export interface ResultProps<ResultType> {
  defaultValue: any;
  onBack: () => any;
  result: ResultType;
}
//#endregion

export default abstract class Controller<ResultType> extends React.Component<ResultProps<ResultType>>{
  protected abstract get headline(): string;
  protected abstract get content(): JSX.Element;

  public render() {
    return (
      <Layout>
        <Header 
          header={this.headline} 
          onBack={this.props.onBack} 
        />
        <Layout>
          {this.content}
        </Layout>
      </Layout>
    )
  }
}


