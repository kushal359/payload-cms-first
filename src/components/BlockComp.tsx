import { Block } from "payload";

export const BlockComp: Block = {
    slug: 'Personal-details',
    interfaceName: 'Personal Details',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'First Name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'Middle Name',
                    type: 'text',
                },
                {
                    name: 'Last Name',
                    type: 'text',
                    required: true,
                },

            ]
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'Age',
                    type: 'number',
                    required: true,
                },
                {
                    name: 'Blood Group',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'Phone Number',
                    type: 'text',
                    required: true,
                    admin: {
                        components: {
                            Field: 'src/components/PhoneInput#PhoneInput'
                        }
                    }
                },
            ]
        },
        {
            name: 'Gender',
            type: 'radio',
            options: [
                {
                    label: 'Male',
                    value: 'male',
                },
                {
                    label: 'Female',
                    value: 'female',
                }
            ],
            admin: {
                layout: 'horizontal',
            }
        }
             
    ]
}