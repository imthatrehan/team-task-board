function Input({ value, onChange, onKeyDown, placeholder, className }) {
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
      />
    </>
  )
}

export default Input
