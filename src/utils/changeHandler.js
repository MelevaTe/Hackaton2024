export const changeHandler = (evt, setField, setHasError, fieldName) => {
    const value = evt.target.value;
    setField(value);
    setHasError((prev) => ({
        ...prev,
        [fieldName]: value.trim().length === 0,
    }));
}