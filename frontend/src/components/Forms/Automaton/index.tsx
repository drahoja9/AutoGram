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
  td {
    border: solid black;
    border-width: 1px;
    height: 40px;
    width: 100px;
    text-align: center;
  }
  tr:first-child td {
    background-color: #DDDDDD;
    font-weight: bold;
  }
  tr:first-child td:first-child {
    border-top-left-radius: 10px;
  }
  tr:first-child td:last-child {
    background-color: inherit;
    font-weight: inherit;
    border-top-right-radius: 10px;
    border-width: 1px 1px 0px 1px;
  }
  tbody td:first-child {
    background-color: #DDDDDD;
    font-weight: bold;
  }
  tbody td:last-child{
    border-width: 0px 1px 0px 1px;
  }
  tbody tr:nth-last-child(2) td:last-child{
    border-bottom-width: 1px;
    border-bottom-right-radius: 5px;
  }
  tbody tr:last-child td {
    border-width: 1px 0px 1px 0px;
  }
  tbody tr:last-child td:last-child{
    border-width: 1px 1px 1px 0px;
    border-radius: 0px 0px 5px 0px;
  }
  tbody tr:last-child td:first-child{
    border-width: 1px 0px 1px 1px;
    background-color: inherit;
    font-weight: inherit;
    border-bottom-left-radius: 10px; 
  }
  tbody tr:last-child td:only-child{
    border-width: 1px 1px 1px 1px;
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
  isEpsilonOn?: boolean;
}

export interface AutomatonInputProps {
  onChange: (value: any) => any;
  value: AutomatonInputValue;
  isEpsilon?: boolean;
}
//#endregion

//#region Change handling functions
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
  // Defining an index where to insert new column (and it's values) =>
  // If there's already an epsilon column, we want it at the end (for sake of clarity), 
  // so we have to insert new column before last element, hence the -1
  const idx = value.isEpsilonOn ? -1 : value.header.length;
  value.header.splice(idx, 0, '');
  for (const row of value.body) {
    row.values.splice(idx, 0, '');
  }
  props.onChange(value);
}

function addEpsilonCol(props: AutomatonInputProps) {
  const value = cloneDeep(props.value);
  value.isEpsilonOn = true;
  value.header.push('ε');
  for (const row of value.body) {
    row.values.push('');
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
  if (value.header[idx] === 'ε') {
    value.isEpsilonOn = false;
  }
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
const AutomatonInput: React.SFC<AutomatonInputProps> = (props) => (
  <div>
    <Table>
      <tbody>
        <HeaderRow
          onAddCol={() => addCol(props)}
          isEpsilon={props.isEpsilon && !props.value.isEpsilonOn}
          onAddEpsilon={() => addEpsilonCol(props)}
        >
          {
            props.value.header.map((value: string, idx: number) => (
              <HeaderCell
                key={`header-cell.${idx}`}
                onRemove={() => removeCol(props, idx)}
                onChange={(val: string) => headerValueChange(props, idx, val)}
                value={value}
                isEpsilonOn={props.value.isEpsilonOn && value === 'ε'}
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
  </div>
);


export default AutomatonInput;
