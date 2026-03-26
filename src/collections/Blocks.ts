import type { CollectionConfig } from "payload";
import { BlockComp } from "@/components/BlockComp";
import { BlockCompFamily } from "@/components/BlockCompFamily";

export const BlockCollection:  CollectionConfig = {
    slug: 'block-collection',
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
    ],

    /**
     * Onlly accessible and visible to admin only 
     */
    access: {
        read: ({req: {user}}) => {
            return user?.role === 'admin'
        },
        create: ({req: {user}}) => {
            return user?.role === 'admin'
        },
        update: ({req: {user}}) => {
            return user?.role === 'admin'
        },
        delete: ({req: {user}}) => {
            return user?.role === 'admin'
        }
    }
}