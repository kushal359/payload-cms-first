import { Block } from "payload";

export const BlockCompFamily: Block = {
    slug: 'Family-details',
    interfaceName: 'Family Details',
    fields: [
        {
            name: 'Mothers Name',
            type: 'text',
            required: true,
        },
        {
            name: 'Fathers Name',
            type: 'text',
            required: true,
        },
        {
            name: 'Grand Fathers Name',
            type: 'text',
            required: true,
        },        
        
    ]
}