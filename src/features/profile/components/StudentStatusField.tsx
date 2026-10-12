import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { StudentStatus } from '@/features/profile/types'

const OPTIONS: ReadonlyArray<{ value: StudentStatus; title: string; description: string }> = [
  { value: 'incoming', title: 'Incoming student', description: 'Admitted or starting soon' },
  { value: 'current', title: 'Current student', description: 'Already enrolled' },
]

type StudentStatusFieldProps<TValues extends FieldValues> = {
  control: Control<TValues>
  name: Path<TValues>
}

/** Self-reported student status picker, shared by sign-up and profile settings. */
export function StudentStatusField<TValues extends FieldValues>({
  control,
  name,
}: StudentStatusFieldProps<TValues>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet data-invalid={fieldState.invalid}>
          <FieldLegend variant="label">I am a…</FieldLegend>
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            aria-invalid={fieldState.invalid}
            className="grid-cols-1 sm:grid-cols-2"
          >
            {OPTIONS.map((option) => {
              const itemId = `${field.name}-${option.value}`
              return (
                <FieldLabel key={option.value} htmlFor={itemId}>
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>{option.title}</FieldTitle>
                      <FieldDescription>{option.description}</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value={option.value} id={itemId} />
                  </Field>
                </FieldLabel>
              )
            })}
          </RadioGroup>
          {fieldState.error && <FieldError errors={[fieldState.error]} />}
        </FieldSet>
      )}
    />
  )
}
