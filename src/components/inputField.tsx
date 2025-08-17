export interface InputFieldProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    helperText?: string;
    errorMessage?: string;

    disabled?: boolean;
    invalid?: boolean;
    onInvalid?: (e: React.InvalidEvent<HTMLInputElement>) => void;
    loading?: boolean;
    onLoad?: () => void;

    variant?: 'filled' | 'outlined' | 'ghost';
    size?: 'sm' | 'md' | 'lg';

    type?: React.HTMLInputTypeAttribute;
    clearable?: boolean;
    showPasswordToggle?: boolean;
    darkThemeToggle?: boolean;
}

const InputField: React.FunctionComponent<{input: InputFieldProps}> = ({ input }) => {
    // Tailwind classes for variants with dark mode
    const variantClasses = {
        filled: 'bg-gray-100 border border-gray-300 focus:bg-white ',
        outlined: 'bg-white border border-gray-400 focus:border-blue-500 ',
        ghost: 'bg-transparent border-none focus:bg-gray-50 ',
    };
    // Tailwind classes for sizes
    const sizeClasses = {
        sm: 'text-sm px-2 py-1',
        md: 'text-base px-3 py-2',
        lg: 'text-lg px-4 py-3',
    };
    const invalidClass = input.invalid ? 'border-red-500  focus:border-red-500' : '';
    const disabledClass = input.disabled ? 'bg-gray-200 cursor-not-allowed opacity-60' : '';
    const loadingClass = input.loading ? 'animate-pulse bg-gray-300' : '';
    const inputClass = `rounded transition duration-150 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${variantClasses[input.variant || 'outlined']} ${sizeClasses[input.size || 'md']} ${invalidClass} ${disabledClass} ${loadingClass}`;

    return (
        <div className="flex flex-col gap-1 w-full">
            {input.label && <label className="font-medium text-gray-700 dark:text-gray-200 mb-1">{input.label}</label>}
            <input
                type={input.type || "text"}
                value={input.value}
                onChange={input.onChange}
                placeholder={input.placeholder}
                disabled={input.disabled}
                onInvalid={input.onInvalid}
                className={inputClass}
            />
            {input.loading && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">Loading...</span>}
            {input.clearable && input.value && <button
                onClick={() => input.onChange && input.onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
                className="text-blue-500 hover:text-blue-700 focus:outline-none">
                    Clear
                    </button>}
            {input.helperText && <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{input.helperText}</span>}
            {input.invalid && input.errorMessage && <span className="text-xs text-red-500 dark:text-red-400 mt-1">{input.errorMessage}</span>}
        </div>
    )
}

export default InputField;
