'use client';

import { useField, FieldLabel } from "@payloadcms/ui";
import { useState, useEffect } from "react";
import { useFormFields } from "@payloadcms/ui";
import { useDocumentForm } from "@payloadcms/ui";
import { useDocumentInfo } from "@payloadcms/ui";


export const UsersSelect = ({ path, field }: any) => {
    const { value, setValue } = useField<string>({ path })
    const [users, setUsers] = useState<any[]>([]);
    const [Loading, setLoading] = useState(true);
    
    const { id} = useDocumentInfo();
    /**
     * useformfields only using selector
     */
    //const fields = useFormFields(([fields]) => fields);
    //console.log("Form Fields:",fields);

    /**
     * useformfields using dispatch
     */
    /*const { fields, dispatch } = useFormFields(([fields, dispatch]) => ({
            fields,
            dispatch,
            }));

    console.log("Fields:",fields);
    console.log("Dispatch:",dispatch);
    */

    const dispatch = useFormFields(([_, dispatch]) => dispatch);
    const { fields: parentDocumentFields } = useDocumentForm()


    useEffect(()=>{
        const fetchusers = async () => {
            try {
                const response = await fetch('/api/users?where[role][equals]=user');
                const data = await response.json()
                setUsers(data?.docs || []);
             } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchusers();
      },[]);

    if(Loading){ return(<p>Loading...</p>);}
    return(
        <div className="field-type text">
            <FieldLabel label={field.label} path={path} required={field.required} />

          
                <select
                    value={value || ""}
                    onChange={(e) => {
                        const selectedId = e.target.value;
                        setValue(selectedId);
                        
                        const selectedUser = users.find(u => u.id === selectedId);

                        if (selectedUser) {
                            dispatch({
                            type: 'UPDATE',
                            path: 'email',
                            value: selectedUser.email,
                            });

                            dispatch({
                            type: 'UPDATE',
                            path: 'phoneNumber',
                            value: selectedUser.phoneNumber,
                            });
                        }
                    }}

                    style={{
                            width: '20%',
                            padding: '10px',
                            borderRadius: '4px',
                            background: 'var(--theme-input-bg)',
                            color: 'var(--theme-input-color)'
                        }}
                >
                <option value="">Select a user</option>

                {users?.map((user) => (
                <option key={user.id} value={user.id}>
                      {`${user.firstName} ${user.lastName} - ${user.email} — ${user.phoneNumber}`}
                </option>
                
                ))}
            </select>
        </div>
    );
}