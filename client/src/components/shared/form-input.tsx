import { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ClearButton } from "./clear-button";
import { RequiredSymbol } from "./required-symbol";
import { ErrorText } from "./error-text";



interface Props extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const FormInput: FC<Props> = ({name, label, required, className, ...props}) => {
    const { 
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext();

    const value = watch(name);
    const errorText = errors[name]?.message as string;
    
    const onClickClear = () => {
        setValue(name, '', {shouldValidate: true})
    } 
    return (
        <div className={className}>
            { label && (
                    <p className="font-medium mb-2">
                        {label} {required && <RequiredSymbol/>}
                </p>
                )}
            <div className="relative">
                <Input className="h-12 text-md" {...register(name)} {...props} />
               { value && <ClearButton onClick={onClickClear}/>}
            </div>
            { errorText && value && <ErrorText text={errorText} className="mt-2"/>}
        </div>
    )
}