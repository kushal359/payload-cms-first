'use client';

import { useField, FieldLabel } from "@payloadcms/ui";
import { useState, useEffect } from "react";

export const UsersSelect = ({ path, field }: any) => {
      const { value, setValue } = useField<string>({ path })
      const [users, setUsers] = useState<any[]>([]);
      const [Loading, setLoading] = useState(true);
    

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
            <FieldLabel label={field.name} path={path} required={field.required} />

            <select
                value={value || ""}
                onChange={(e) => setValue(e.target.value)}
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
                      {`${user["First Name"]} ${user["Last Name"]} - ${user.email} — ${user["Phone Number"]}`}
                </option>
                
                ))}
            </select>
        </div>
    );
}