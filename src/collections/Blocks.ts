import type { CollectionConfig } from "payload";
import { BlockComp } from "@/components/BlockComp";
import { BlockCompFamily } from "@/components/BlockCompFamily";

export const BlockCollection:  CollectionConfig = {
    slug: 'block-collection',
    access: {
        read: () => true,
    },
    fields: [
        {
            name:'Personal Forms',
            type: 'blocks',
            minRows: 1,
            maxRows: 20,
            blocks: [
                BlockComp,
                BlockCompFamily
            ]
        }
    ]
}