import { useId, type HTMLInputTypeAttribute, type ReactNode } from 'react'
import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type FormTextFieldProps<TValues extends FieldValues> = {
  control: Control<TValues>
  name: Path<TValues>
  label: string
  description?: ReactNode
  placeholder?: string
  type?: HTMLInputTypeAttribute
  autoComplete?: string
  /** Render a textarea instead of a single-line input. */
  multiline?: boolean
  rows?: number
  /** Visually hide the label (it stays available to screen readers). */
  hideLabel?: boolean
}

/** Labelled text input wired to react-hook-form, with accessible error output. */
export function FormTextField<TValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  type = 'text',
  autoComplete,
  multiline = false,
  rows = 4,
  hideLabel = false,
}: FormTextFieldProps<TValues>) {
  const id = useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const describedBy =
          [description ? descriptionId : null, fieldState.error ? errorId : null]
            .filter(Boolean)
            .join(' ') || undefined
        const sharedProps = {
          ...field,
          id,
          placeholder,
          'aria-invalid': fieldState.invalid,
          'aria-describedby': describedBy,
        }

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={id} className={hideLabel ? 'sr-only' : undefined}>
              {label}
            </FieldLabel>
            {multiline ? (
              <Textarea {...sharedProps} rows={rows} />
            ) : (
              <Input {...sharedProps} type={type} autoComplete={autoComplete} />
            )}
            {description && <FieldDescription id={descriptionId}>{description}</FieldDescription>}
            {fieldState.error && <FieldError id={errorId} errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}
