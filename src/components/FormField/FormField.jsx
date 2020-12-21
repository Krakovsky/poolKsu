import React from 'react';
import { Input, Select, Radio, Checkbox, DatePicker, Upload, InputNumber } from 'antd';
import InputMask from 'react-input-mask';

const { TextArea } = Input;

const FormField = ({
  input: { onChange, value }, type, className, placeholder,
  prefix, suffix, fieldType, rows, children, id, defaultValue,
  showSearch, options, dateOptions, fileOptions, radioOptions,
  meta: { touched, error }, disabled, defaultChecked, checked, mode, focus,
  maxLength, disabledDate
}) => {
  let fieldElement;
  const fieldProps = {
    onChange,
    className,
    placeholder,
    prefix,
    suffix,
    type,
    disabled,
    mode,
    focus,
    maxLength,
  };

  const fieldError = touched && error && (
    <div className="form-error">
      {error}
    </div>
  );

  switch (fieldType) {
    case 'textarea':
      fieldElement = (
        <TextArea
          {...fieldProps}
          rows={rows}
          value={value}
        />
      );
      break;

    case 'radioQuizzes':
      fieldElement = (
        <Radio.Group
          {...fieldProps}
          {...radioOptions}
        />
      );
      break;

    case 'select':
      fieldElement = (
        <Select
          {...fieldProps}
          showSearch={showSearch}
          defaultValue={defaultValue || undefined}
        >
          {children}
        </Select>
      );
      break;

    case 'radioInput':
      fieldElement = (
        <Radio.Group
          {...fieldProps}
          defaultValue={defaultValue}
        >
          {children}
        </Radio.Group>
      );
      break;

    case 'checkboxGroup':
      fieldElement = (
        <Checkbox.Group
          {...fieldProps}
          options={options}
        />
      );
      break;

    case 'checkbox':
      fieldElement = (
        <Checkbox
          onChange={onChange}
          checked={checked}
          className={className}
          defaultChecked={defaultChecked}
        >
          {placeholder}
        </Checkbox>
      );
      break;

    case 'datePicker':
      fieldElement = (
        <DatePicker
          format="DD.MM.YYYY"
          disabledDate={disabledDate}
          {...fieldProps}
          {...dateOptions}
        />
      );
      break;

    case 'file':
      fieldElement = (
        <Upload
          {...fieldProps}
          {...fileOptions}
          showUploadList={{ showDownloadIcon: false }}
        >
          {children}
        </Upload>
      );
      break;

    case 'inputNumber':
      fieldElement = (
        <InputNumber
          {...fieldProps}
          {...options}
          value={value || undefined}
        />
      );
      break;
    case 'phone':
      fieldElement = (
        <InputMask
          mask="+380999999999"
          maskChar="_"
          value={value}
          {...fieldProps}
        />
      );
      break;

    default:
      fieldElement = (
        <Input
          {...fieldProps}
          value={value || undefined}
        />
      );
  }

  return (
    <div className={`form-field ${fieldError ? 'error' : ''}`} id={id}>
      {fieldElement}
      {fieldError}
    </div>
  );
};

FormField.defaultProps = {
  className: '',
  type: 'text',
  placeholder: '',
  fieldType: 'input',
  rows: 4,
  children: null,
  showSearch: false,
  options: [],
  disabled: false,
  dateOptions: {},
  fileOptions: {},
  radioOptions: {},
  defaultChecked: false,
  checked: false,
  id: null,
  defaultValue: null,
};

export default FormField;
