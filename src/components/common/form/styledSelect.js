import { useField } from 'formik';

const StyledSelect = ({ name, data, defaultValue, onSelect }) => {
    const [meta, helpers] = useField({ name });
    const { value } = meta;
    const { setValue } = helpers;
    const onItemSelect = (item) => {
        setValue(item.value);
        onSelect();
    }
    const getClassName = (item) => {
        return item.value === value ? "selected" : ""
    }
    return (
        <div>
            <ul>
                <li className={getClassName({ value: defaultValue })} onClick={() => onItemSelect({ value: defaultValue })}>선택하세요</li>
                {data.map((item, index) => <li className={getClassName(item)} onClick={() => onItemSelect(item)} key={index} data-val={item.value}>{item.label}</li>)}
            </ul>
        </div>
    )
};
StyledSelect.defaultProps = {
    data: [],
    defaultValue: null,
    onSelect: () => { }
}
export default StyledSelect;