type formConfigProp = {
    id: number,
    displayName?: string,
    pattern?: boolean,
    type: string,
    regex?: RegExp | null,
    error?: string,
    required: boolean,
    value: string,
    name: string,
    showLabel: boolean,
    onChange: (name: string, value: string) => void;
    marginBottom: boolean,
}
export default formConfigProp;