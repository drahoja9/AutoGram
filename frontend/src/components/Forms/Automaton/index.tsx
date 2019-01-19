//#region imports
import * as React from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

import AddRow from './components/AddRow';
import InputRow from './components/InputRow';
import InputCell from './components/InputRow/InputCell';
import HeaderRow from './components/HeaderRow';
import HeaderCell from './components/HeaderCell';
//#endregion

//#region Styled
const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  margin-left: 28px;
  color: #666666;
  td {
    border-style: solid;
    border-color: #666666;
    border-width: 0px 2px 2px 0px;
    height: 48px;
    width: 100px;
    text-align: center;
  }
  tr:first-child td {
    background-color: #DDDDDD;
    font-weight: bold;
    border-top-width: 1px;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }
  tr:first-child td:last-child {
    background-color: inherit;
    font-weight: inherit;
    border-top-right-radius: 10px;
    border-width: 1px 1px 0px 0px;
    border-color: #999999;
    border-style: dashed;
    color: #999999;
  }
  tbody td:first-child {
    background-color: #DDDDDD;
    font-weight: bold;
    border-left-width: 1px;
  }
  tbody td:last-child{
    border-width: 0px 1px 0px 0px;
    border-color: #999999;
    border-style: dashed;
  }
  tbody tr:nth-last-child(2) td:last-child{
    border-bottom-width: 1px;
    border-bottom-right-radius: 5px;
  }
  tbody tr:last-child td {
    border-width: 0px 0px 1px 0px;
    border-color: #999999;
    border-style: dashed;
  }
  tbody tr:last-child td:last-child{
    border-width: 0px 1px 1px 0px;
    border-radius: 0px 0px 5px 0px;
  }
  tbody tr:last-child td:first-child{
    border-width: 0px 0px 1px 1px;
    background-color: inherit;
    font-weight: inherit;
    border-bottom-left-radius: 10px; 
    color: #999999;
  }
  tbody tr:last-child td:only-child{
    border-width: 0px 1px 1px 1px;
  }
`;
//#endregion

//#region Component interfaces
export interface AutomatonInputValue {
  header: string[];
  body: {
    value: string;
    isInitial: boolean;
    isFinal: boolean;
    values: string[];
  }[];
}

export interface AutomatonInputProps {
  onChange: (value: any) => any;
  value: AutomatonInputValue;
  isEpsilon?: boolean;
}
//#endregion

//#region Change handling functions
function initialize(props: AutomatonInputProps, isEpsilon: boolean | undefined) {
  const value = cloneDeep(props.value);
  value.header.push('');
  for (const row of value.body) {
    row.values.push('');
  }
  if (isEpsilon) {
    value.header.push('ε');
    for (const row of value.body) {
      row.values.push('');
    }
  }
  value.body = value.body.concat({
    value: '',
    values: value.header.map((_: string) => ''),
    isInitial: false,
    isFinal: false
  });
  props.onChange(value);
}

function addRow(props: AutomatonInputProps) {
  const value = cloneDeep(props.value);
  value.body = value.body.concat({
    value: '',
    values: value.header.map((_: string) => ''),
    isInitial: false,
    isFinal: false
  });
  props.onChange(value);
}

function addCol(props: AutomatonInputProps) {
  const value = cloneDeep(props.value);
  let lastIdx = props.isEpsilon ? -1 : value.header.length;
  value.header.splice(lastIdx, 0, '');
  for (const row of value.body) {
    row.values.splice(lastIdx, 0, '');
  }
  props.onChange(value);
}

function removeRow(props: AutomatonInputProps, idx: number) {
  const value = cloneDeep(props.value);
  value.body.splice(idx, 1);
  props.onChange(value);
}

function removeCol(props: AutomatonInputProps, idx: number) {
  const value = cloneDeep(props.value);
  value.header.splice(idx, 1);
  for (const row of value.body) {
    row.values.splice(idx, 1);
  }
  props.onChange(value);
}

function toggleInitial(props: AutomatonInputProps, idx: number) {
  const value = cloneDeep(props.value);
  value.body[idx].isInitial = !value.body[idx].isInitial;
  props.onChange(value);
}

function toggleFinal(props: AutomatonInputProps, idx: number) {
  const value = cloneDeep(props.value);
  value.body[idx].isFinal = !value.body[idx].isFinal;
  props.onChange(value);
}

function valueChange(props: AutomatonInputProps, idx: number, value: string) {
  const value_ = cloneDeep(props.value);
  value_.body[idx].value = value;
  props.onChange(value_);
}

function headerValueChange(props: AutomatonInputProps, idx: number, value: string) {
  const value_ = cloneDeep(props.value);
  if (value === 'ε') {
    value = 'ThisIsNotEpsilon';
  }
  value_.header[idx] = value;
  props.onChange(value_);
}

function inputValueChange(props: AutomatonInputProps, ridx: number, vidx: number, value: string) {
  const value_ = cloneDeep(props.value);
  value_.body[ridx].values[vidx] = value;
  props.onChange(value_);
}
//#endregion

/**
 * Top level component representing an automaton input
 */
class AutomatonInput extends React.Component<AutomatonInputProps> {
  /**
   * Adding epsilon column at the beginning for every epsilon-available automata.
   */
  public componentWillMount() {
    if (this.props.value.header.length === 0) {
      initialize(this.props, this.props.isEpsilon);
    }
  }

  public render() {
    const props = this.props;
    return (
      <div>
        <Table>
          <tbody>
            <HeaderRow
              onAddCol={() => addCol(props)}
            >
              {
                props.value.header.map((value: string, idx: number) => (
                  <HeaderCell
                    key={`header-cell.${idx}`}
                    onRemove={() => removeCol(props, idx)}
                    onChange={(val: string) => headerValueChange(props, idx, val)}
                    value={value}
                    isEpsilonOn={props.isEpsilon && value === 'ε'}
                  />
                ))
              }
            </HeaderRow>
            {
              props.value.body.map((row: any, idx: number) => (
                <InputRow
                  key={`input-row.${idx}`}
                  onInitialToggle={() => toggleInitial(props, idx)}
                  onFinalToggle={() => toggleFinal(props, idx)}
                  onRemove={() => removeRow(props, idx)}
                  onValueChange={(value: string) => valueChange(props, idx, value)}
                  value={row.value}
                  isInitial={row.isInitial}
                  isFinal={row.isFinal}

                  onAddCol={() => addCol(props)}
                >
                  {
                    row.values.map((value: string, vidx: number) => (
                      <InputCell
                        key={`input-row.${idx}.${vidx}`}
                        onChange={(val: string) => inputValueChange(props, idx, vidx, val)}
                        value={value}
                      />
                    ))
                  }
                </InputRow>
              ))
            }
            <AddRow width={props.value.header.length} onClick={() => addRow(props)} />
          </tbody>
        </Table>
      </div >
    );
  }
};


export default AutomatonInput;
