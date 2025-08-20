import { useState, useEffect } from 'react'
import React from 'react';
import InputField from './components/inputField';
import './index.css'
import DataTable from './components/DataTable';

function App() {
  const [inputValue, setInputValue] = useState('');

  //const [inputError, setInputError] = useState('');
  //const [inputHelperText, setInputHelperText] = useState('');
  const [inputDisabled/*, setInputDisabled*/] = useState(false);
  const [inputInvalid/*, setInputInvalid*/] = useState(false);
  const [inputVariant, setInputVariant] = useState<'filled' | 'outlined' | 'ghost'>('outlined');
  const [inputSize, setInputSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [inputLabel, setInputLabel] = useState('Input Field');
  const [inputPlaceholder, setInputPlaceholder] = useState('Type something...');
  const [inputHelperTextMessage, setInputHelperTextMessage] = useState('This is a helper text');
  const [inputErrorMessage, setInputErrorMessage] = useState('This is an error message');
  const [inputDisabledState, setInputDisabledState] = useState(false);
  const [inputInvalidState, setInputInvalidState] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
  const [inputType, setInputType] = useState<React.HTMLInputTypeAttribute>('text');
  const [clearable, setClearable] = useState(false);
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [darkThemeToggle, setDarkThemeToggle] = useState(false);

  const handleInputVariantChange = (variant: 'filled' | 'outlined' | 'ghost') => {
    setInputVariant(variant);
  }
  const handleInputSizeChange = (size: 'sm' | 'md' | 'lg') => {
    setInputSize(size);
  }
  const handleInputLabelChange = (label: string) => {
    setInputLabel(label);
  }
  const handleInputPlaceholderChange = (placeholder: string) => {
    setInputPlaceholder(placeholder);
  }
  const handleInputHelperTextChange = (helperText: string) => {
    setInputHelperTextMessage(helperText);
  }
  const handleInputErrorMessageChange = (errorMessage: string) => {
    setInputErrorMessage(errorMessage);
  }
  const handleInputDisabledChange = (disabled: boolean) => {
    setInputDisabledState(disabled); 
  }
  const handleInputInvalidChange = (invalid: boolean) => {
    setInputInvalidState(invalid);
  } 
  const handleInputLoadingChange = (loading: boolean) => {
    setInputLoading(loading);
  }
  const handleInputTypeChange = (type: React.HTMLInputTypeAttribute) => {
    setInputType(type);
  }
  const handleClearInput = () => {
    setInputValue('');
  }
  const handleShowPasswordToggle = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
    setShowPasswordToggle(!showPasswordToggle);

  }
  const handleDarkThemeToggle = () => {
    document.body.classList.toggle('dark');
    setDarkThemeToggle(!darkThemeToggle);
  }

  /*Component - 2: Data table */

  const [columns, setColumns] = useState<{ key: "id" | "name" | "age"; title: string; index: number }[]>([
    { key: 'id', title: 'ID', index: 0 },
    { key: 'name', title: 'Name', index: 1 },
    { key: 'age', title: 'Age', index: 2 },
  ]);
  const [data, setData] = useState<{ id: number; name: string; age: number }[]>([
    { id: 1, name: 'John Doe', age: 28 },
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 3, name: 'Alice Johnson', age: 45 },
  ]);
  
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState<{ id: number; name: string; age: number }[]>([]);
  const [selectable, setSelectable] = useState(true);
  const [onRowSelect, setOnRowSelect] = useState<(selectedRows: { id: number; name: string; age: number }[]) => void>(() => (rows: { id: number; name: string; age: number }[]) => {
    setSelectedRows(rows);
  });

  // State for new data inputs
  const [inputNewName, setInputNewName] = useState('');
  const [inputNewAge, setInputNewAge] = useState('');
  
  const handleColumnChange = (columns: { key: "id" | "name" | "age"; title: string; index: number }[]) => {
    setColumns(columns);
  }
  const handleDataChange = (data: { id: number; name: string; age: number }[]) => {
    setData(data);
  }
  const addData = (newData: { id: number; name: string; age: number }) => {
    setData(prevData => [...prevData, newData]);
  }
  const handleLoadingChange = (loading: boolean) => {
    setTableLoading(loading);
  }
  const handleSelectableChange = (selectable: boolean) => {
    setSelectable(selectable);
    if (!selectable) {
      setSelectedRows([]);
    }
  }
  const handleRowSelectChange = (onRowSelect: (selectedRows: { id: number; name: string; age: number }[]) => void) => {
    if(selectable){
      setOnRowSelect(() => onRowSelect);
    }
    else{
      setSelectedRows([]);
    }
  }
  useEffect(() => {
    // Simulate loading data
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
    }, 1000);
  }, []);


  const handleInputChange = ( e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  return (
    <>
      {!darkThemeToggle && (
      <>
        <div className='flex flex-row gap-8'>
          <div id="input-container" className='center flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-md flex flex-row gap-8'>
            <div id="input-details-container" className='flex flex-col gap-4'>
              <div>
                <label className='inline-block w-40 text-black'> Input type: </label>
                <select
                  className='border rounded px-3 py-2 w-52'
                  value={inputType}
                  onChange={(e) => handleInputTypeChange(e.target.value as React.HTMLInputTypeAttribute)}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="tel">Telephone</option>
                  <option value="url">URL</option>
                </select>
              </div>
              
              <div>
                <label className='inline-block w-40 text-black'>Input Label: </label>
                <input
                  className='border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400'
                  type="text"
                  value={inputLabel}
                  onChange={(e) => handleInputLabelChange(e.target.value)}
                  placeholder="Input Label"
                />
              </div>
              <div>
                <label className='inline-block w-40 text-black'>Input Placeholder: </label>
                <input
                  className='border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400'
                  type="text"
                  value={inputPlaceholder}
                  onChange={(e) => handleInputPlaceholderChange(e.target.value)}
                  placeholder="Input Placeholder"
                />
              </div>
              <div>
                <label className='inline-block w-40 text-black'>Input Helper Text: </label>
                <input
                  className='border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400'
                  type="text"
                  value={inputHelperTextMessage}
                  onChange={(e) => handleInputHelperTextChange(e.target.value)}
                  placeholder="Input Helper Text"
                />
              </div>
              <div>
                <label className='inline-block w-40 text-black'>Input Error Message: </label>
                <input
                  className='border rounded px-3 py-2 bg-white text-gray-900 placeholder-gray-400'
                  type="text"
                  value={inputErrorMessage}
                  onChange={(e) => handleInputErrorMessageChange(e.target.value)}
                  placeholder="Input Error Message"
                />
              </div>
              
              <div>
                <label className='inline-block w-40 text-black'>
                  <input
                    type="checkbox"
                    checked={inputDisabledState}
                    onChange={(e) => handleInputDisabledChange(e.target.checked)}
                    className='mr-2'
                  />
                  Disabled
                </label>
              </div>
              
              <div>
                <label className='inline-block w-40 text-black'>
                  <input
                    type="checkbox"
                    checked={inputInvalidState}
                    onChange={(e) => handleInputInvalidChange(e.target.checked)}
                    className='mr-2'
                  />
                  Invalid
                </label>
              </div>

              <div>
                <div className = 'center text-gray-700'>Input variants</div>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputVariantChange('filled')}>Filled</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputVariantChange('outlined')}>Outlined</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputVariantChange('ghost')}>Ghost</button>
              </div>
              <div>
                <div className = 'center text-gray-700'>Input sizes</div>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputSizeChange('sm')}>Small</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputSizeChange('md')}>Medium</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 rounded' onClick={() => handleInputSizeChange('lg')}>Large</button>
              </div>

              <div>
                <label className='text-black'>
                  <input
                    type="checkbox"
                    checked={inputLoading}
                    onChange={(e) => handleInputLoadingChange(e.target.checked)}
                    className='mr-2'
                  />
                  Loading
                </label>
              </div>

              <div>
                <label className='text-black'>
                  <input
                    type="checkbox"
                    checked={clearable}
                    onChange={(e) => setClearable(e.target.checked)}
                    className='mr-2'
                  />
                  Clearable
                </label>
                {clearable && (
                  <button onClick={handleClearInput} className='ml-2 bg-red-500 text-white px-3 py-1 rounded'>
                    Clear Input
                  </button>
                )}
              </div>
              <div>
                <label className='text-black'>
                  <input
                    type="checkbox"
                    checked={showPasswordToggle}
                    onChange={handleShowPasswordToggle}
                    className='mr-2'
                  />
                  Show Password Toggle
                </label>
              </div>

              <div>
                <label>
                  <input
                    type="checkbox"
                    checked={darkThemeToggle}
                    onChange={handleDarkThemeToggle}
                    className='mr-2'
                  />
                  Dark Theme Toggle
                </label>
              </div>
            </div>

            <div id="input-details-display" className='flex flex-col gap-4'>
                <div className='text-black'>Input Value: {inputValue}</div>
                <div className='text-black'>Input Disabled: {inputDisabled ? 'Yes' : 'No'}</div>
                <div className='text-black'>Input Invalid: {inputInvalid ? 'Yes' : 'No'}</div>
                <div className='text-black'>Input Variant: {inputVariant}</div>
                <div className='text-black'>Input Size: {inputSize}</div>
                <div className='text-black'>Input Label: {inputLabel}</div>
                <div className='text-black'>Input Placeholder: {inputPlaceholder}</div>
                <div className='text-black'>Input Helper Text: {inputHelperTextMessage}</div>
                <div className='text-black'>Input Error Message: {inputErrorMessage}</div>
            </div>
          </div>
        
          <div>
            <InputField
              input={{
                value: inputValue,
                onChange: handleInputChange,
                label: inputLabel,
                placeholder: inputPlaceholder,
                helperText: inputHelperTextMessage,
                errorMessage: inputErrorMessage,
                disabled: inputDisabledState,
                invalid: inputInvalidState,
                variant: inputVariant,
                size: inputSize,
                type: inputType,
                loading: inputLoading,
                clearable: clearable,
                showPasswordToggle: showPasswordToggle,
                darkThemeToggle: darkThemeToggle
              }}
            />
          </div>
        </div>
        </>
      )}

        {darkThemeToggle && (
        <>
        <div className='flex flex-row gap-8'>
          <div id="input-container" className='center flex-col gap-4 p-4 bg-gray-900 rounded-lg shadow-md flex flex-row gap-8'>
            <div id="input-details-container" className='flex flex-col gap-4'>
              <div>
                <label className='text-white inline-block w-40'> Input type: </label>
                <select
                  className='border rounded bg-white px-3 py-2 w-52'
                  value={inputType}
                  onChange={(e) => handleInputTypeChange(e.target.value as React.HTMLInputTypeAttribute)}
                >
                  <option value="text">Text</option>
                  <option value="email">Email</option>
                  <option value="password">Password</option>
                  <option value="number">Number</option>
                  <option value="tel">Telephone</option>
                  <option value="url">URL</option>
                </select>
              </div>
              
              <div>
                <label className='text-white inline-block w-40'>Input Label: </label>
                <input
                  className='border rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                  type="text"
                  value={inputLabel}
                  onChange={(e) => handleInputLabelChange(e.target.value)}
                  placeholder="Input Label"
                />
              </div>
              <div>
                <label className='text-white inline-block w-40'>Input Placeholder: </label>
                <input
                  className='border rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                  type="text"
                  value={inputPlaceholder}
                  onChange={(e) => handleInputPlaceholderChange(e.target.value)}
                  placeholder="Input Placeholder"
                />
              </div>
              <div>
                <label className='text-white inline-block w-40'>Input Helper Text: </label>
                <input
                  className='border rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                  type="text"
                  value={inputHelperTextMessage}
                  onChange={(e) => handleInputHelperTextChange(e.target.value)}
                  placeholder="Input Helper Text"
                />
              </div>
              <div>
                <label className='text-white inline-block w-40'>Input Error Message: </label>
                <input
                  className='border rounded px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500'
                  type="text"
                  value={inputErrorMessage}
                  onChange={(e) => handleInputErrorMessageChange(e.target.value)}
                  placeholder="Input Error Message"
                />
              </div>
              
              <div>
                <label className='text-white inline-block w-40'>
                  <input
                    type="checkbox"
                    checked={inputDisabledState}
                    onChange={(e) => handleInputDisabledChange(e.target.checked)}
                    className='mr-2'
                  />
                  Disabled
                </label>
              </div>
              
              <div>
                <label className='text-white inline-block w-40'>
                  <input
                    type="checkbox"
                    checked={inputInvalidState}
                    onChange={(e) => handleInputInvalidChange(e.target.checked)}
                    className='mr-2'
                  />
                  Invalid
                </label>
              </div>

              <div>
                <div className = 'center text-white'>Input variants</div>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputVariantChange('filled')}>Filled</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputVariantChange('outlined')}>Outlined</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputVariantChange('ghost')}>Ghost</button>
              </div>
              <div>
                <div className = 'center text-white'>Input sizes</div>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputSizeChange('sm')}>Small</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputSizeChange('md')}>Medium</button>
                <button className='px-3 py-1 m-1 bg-gray-200 text-gray-800 dark:text-gray-100 rounded' onClick={() => handleInputSizeChange('lg')}>Large</button>
              </div>

              <div>
                <label className='text-white'>
                  <input
                    type="checkbox"
                    checked={inputLoading}
                    onChange={(e) => handleInputLoadingChange(e.target.checked)}
                    className='mr-2'
                  />
                  Loading
                </label>
              </div>

              <div>
                <label className='text-white'>
                  <input
                    type="checkbox"
                    checked={clearable}
                    onChange={(e) => setClearable(e.target.checked)}
                    className='mr-2'
                  />
                  Clearable
                </label>
                
              </div>
              <div>
                <label className='text-white'>
                  <input
                    type="checkbox"
                    checked={showPasswordToggle}
                    onChange={handleShowPasswordToggle}
                    className='mr-2'
                  />
                  Show Password Toggle
                </label>
              </div>

              <div>
                <label className='text-white'>
                  <input
                    type="checkbox"
                    checked={darkThemeToggle}
                    onChange={handleDarkThemeToggle}
                    className='mr-2'
                  />
                  Dark Theme Toggle
                </label>
              </div>
            </div>

            <div id="input-details-display" className='flex flex-col gap-4'>
                <div className='text-white'>Input Value: {inputValue}</div>
                <div className='text-white'>Input Disabled: {inputDisabled ? 'Yes' : 'No'}</div>
                <div className='text-white'>Input Invalid: {inputInvalid ? 'Yes' : 'No'}</div>
                <div className='text-white'>Input Variant: {inputVariant}</div>
                <div className='text-white'>Input Size: {inputSize}</div>
                <div className='text-white'>Input Label: {inputLabel}</div>
                <div className='text-white'>Input Placeholder: {inputPlaceholder}</div>
                <div className='text-white'>Input Helper Text: {inputHelperTextMessage}</div>
                <div className='text-white'>Input Error Message: {inputErrorMessage}</div>
            </div>
          </div>
        
          <div>
            <InputField
              input={{
                value: inputValue,
                onChange: handleInputChange,
                label: inputLabel,
                placeholder: inputPlaceholder,
                helperText: inputHelperTextMessage,
                errorMessage: inputErrorMessage,
                disabled: inputDisabledState,
                invalid: inputInvalidState,
                variant: inputVariant,
                size: inputSize,
                type: inputType,
                loading: inputLoading,
                clearable: clearable,
                showPasswordToggle: showPasswordToggle,
                darkThemeToggle: darkThemeToggle
              }}
            />
          </div>
        </div>

        </>
        )}
      <div className='w-full h-1 bg-gray-800 flex block mt-50 mb-50'/>
      {/*COMPONENT - 2: TABLE COMPNENT*/}
      <div className='flex flex-row'>
        <div className='flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg w-188 shadow-md'>
          <div className='center text-gray-700 dark:text-gray-200 mb-4'>Data Table</div>
          <div className='flex flex-col gap-4 mb-4'>
            <label className='text-gray-700 dark:text-gray-200'>Columns:</label>
            <div>
              {columns.map((col, index) => (
                <div key={index} className='border rounded w-150 px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-2 flex items-center'>
                  <span className='w-50'>{col.title} ({col.key})</span>
                  <button
                    disabled={index === 0}
                    onClick={() => {
                      if (index > 0) {
                        const newColumns = [...columns];
                        [newColumns[index - 1], newColumns[index]] = [newColumns[index], newColumns[index - 1]];
                        setColumns(newColumns);
                      }
                    }}
                    className="ml-2 px-2 py-1 bg-gray-300 rounded"
                  >↑</button>
                  <button
                    disabled={index === columns.length - 1}
                    onClick={() => {
                      if (index < columns.length - 1) {
                        const newColumns = [...columns];
                        [newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]];
                        setColumns(newColumns);
                      }
                    }}
                    className="ml-2 px-2 py-1 bg-gray-300 rounded"
                  >↓</button>
                </div>
              ))}
            </div>
          </div>
          <div className='flex flex-col gap-4 mb-4'>
            <label className='text-gray-700 dark:text-gray-200'>Data:</label>
            <div>
              {data.map((row, index) => (
                <div key={index} className='border rounded w-150 px-3 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-2'>
                  {JSON.stringify(row)}
                </div>
              ))}
            </div>
            <div className="flex gap-2 items-center">
              <input
              type="text"
              placeholder="Name"
              className="border rounded px-2 py-1"
              value={inputNewName}
              onChange={e => setInputNewName(e.target.value)}
              />
              <input
              type="number"
              placeholder="Age"
              className="border rounded px-2 py-1"
              value={inputNewAge}
              onChange={e => setInputNewAge(e.target.value)}
              />
              <button
              onClick={() => {
                if (inputNewName.trim() && inputNewAge.trim()) {
                addData({
                  id: data.length + 1,
                  name: inputNewName,
                  age: Number(inputNewAge),
                });
                setInputNewName('');
                setInputNewAge('');
                }
              }}
              className="bg-blue-500 text-black px-3 py-1 rounded"
              >
              Add Data
              </button>
            </div>
          </div>
          <div className='flex flex-col gap-4 mb-4'>
            <label className='text-gray-700 dark:text-gray-200'>
            <input
              type="checkbox"
              checked={tableLoading}
              onChange={(e) => handleLoadingChange(e.target.checked)}
              className='mr-2'
            />
            Table Loading</label>
          </div>
          <div className='flex flex-col gap-4 mb-4'>
            <label className='text-gray-700 dark:text-gray-200'>
            <input
              type="checkbox"
              checked={selectable}
              onChange={(e) => handleSelectableChange(e.target.checked)}
              className='mr-2'
            />
            Selectable</label>
          </div>
          {selectable && (
            <>
              <div className='flex flex-col gap-4 mb-4'>
                <label className='text-gray-700 dark:text-gray-200'>Selected Rows:</label>
                <div>{selectedRows.map(row => {return(<div>{row.id}, {row.name}, {row.age}</div>)})}</div>
              </div>
              <div className='flex flex-col gap-4 mb-4'>
                Click on a row to select it.
              </div>
            </>
          )
          }
        </div>
        
        <div className='flex-1 px-4 py-4 rounded-lg shadow-lg w-188'>  
          <DataTable
            tableProps={{
              data: data,
              columns: columns,
              loading: tableLoading,
              selectable: selectable,
              onRowSelect: onRowSelect,
              onColumnChange: handleColumnChange,
              onDataChange: handleDataChange,
              onLoadingChange: handleLoadingChange,
              onSelectableChange: handleSelectableChange,
              onRowSelectChange: handleRowSelectChange,
              }}
          />
        </div>
      </div>
    </>
  )


}

export default App;
