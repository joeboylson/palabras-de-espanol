import { useCallback, useEffect, useRef } from "react";

// styles
import './style.scss'

const spanishAccents = ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ']

const Input = ({
  name, 
  placeholder, 
  type = "text",
  autocomplete="off",
  onChange, 
  defaultValue,
  spanish=false}) => {

  const inputRef = useRef(null)

  const appendToText = useCallback((_text) => {
    if (inputRef.current) {
      const _value = inputRef.current.value;
      inputRef.current.value = `${_value}${_text}`;
      onChange(inputRef.current.value);
      inputRef.current.focus();
    }
  }, [onChange]);

  const handleKeyPress = useCallback(event => {
    if (
      event.target.tagName.toUpperCase() === 'INPUT' &&
      isFinite(event.key) && 
      event.ctrlKey
    ) {
          const index = Number(event.key) - 1;
          const accent = spanishAccents[index];
          if (accent) appendToText(accent);
      }
    }, [appendToText])
  
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  })

  useEffect(() => {
    if (spanish) return window.addEventListener('keypress', handleKeyPress);
    return window.removeEventListener('keypress', handleKeyPress);
  }, [spanish, handleKeyPress])

  return (
    <div className="input">
      <input
        name={name}
        placeholder={placeholder}
        ref={inputRef} 
        onChange={e => onChange(e.target.value)}
        type={type}
        autoComplete={autocomplete}
        defaultValue={defaultValue}
      ></input>

      <div className="accents-wrapper">
        { spanish && spanishAccents.map( (accent, index) => {
            return <button 
              key={index} 
              type="button"
              onClick={() => appendToText(accent)} 
              tabIndex={-1}
              className={'accent-button'}
            >
              <p>{accent}</p>
              <p className={'small mono'}>Ctrl+{index+1}</p>
            </button>
        } )}

      </div>

    </div>
  )
}

export default Input;