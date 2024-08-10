type formConfig<T> = {
    id: number,
    name: keyof T,
    displayName: string,
    pattern: boolean,
    type: string,
    regex: RegExp | null,
    error?: string,
    required: boolean,
    showLabel: boolean,
    marginBottom: boolean,
}
export default formConfig;