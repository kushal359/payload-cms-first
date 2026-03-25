'use client'
import React from 'react'
import { PatternFormat } from 'react-number-format'
import { useField, FieldLabel } from '@payloadcms/ui'

export const PhoneInput = ({ path, field }: any) => {
  const { value, setValue } = useField<string>({ path })

  return (
    <div className="field-type text">
      <FieldLabel label={field.label} path={path} required={field.required} />
      <PatternFormat
        format="(###) ###-####"
        mask=" "
        placeholder="(123) 456-7890"
        className="after-label"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '4px',
          background: 'var(--theme-input-bg)',
          color: 'var(--theme-input-color)'
        }}
        value={value || ''}
        onValueChange={(values) => {
          setValue(values.value) 
        }}
      />
    </div>
  )
}
{/* HardCoded */}
{/*
export function formatPhoneNumber(input: string | number): string {
    const digits = input.toString().replace(/\D/g, ''); // 1. Keep only numbers

    if (digits.length === 0) return ''; // 2. Empty input

    if (digits.length <= 3) {
        return `(${digits}`; // 3. Start area code
    }

    if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`; // 4. Add middle part
    }

    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`; // 5. Full format
}
    
//usage: use in collection
hooks: {
          afterChange: [(value: unknown): string => formatPhoneNumber(value as string)],
      }


*/}