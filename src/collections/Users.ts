import type { CollectionConfig } from "payload";


interface CustomContext {
  customError?: {
    type: string;
    message: string;
  };
}

export const Users: CollectionConfig = {
  slug: "users",

  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "role",
    ],
  },

  auth: true,

  fields: [
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "User", value: "user" },
      ],  
      required: true,
      defaultValue: "user",
    },
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: { placeholder: "Enter First Name" },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: { placeholder: "Enter Last Name" },
    },
    {
      name: "phoneNumber",
      type: "text",
      required: true,
      admin: {
        components: {
          Field: "src/components/PhoneInput#PhoneInput",
        },
      },
    },
    {
      name: 'currentuser',
      type:'ui',
      admin: {
        components: {
          Field: 'src/components/CurrentLoggedUser#MyComponent',
        }
      }
    }
  ],
  /**
   * Prevents access to admin panel dashboard if users are allowed to login
   */
  access: {
    admin: ({ req: { user } }) => {
      return user?.role === "admin" || user?.role === "editor";
    },
  },
  hooks: {
    /**
     * Preventing Users with role except admin to login
     */
    //beforeLogin: [
     // async ({ user }) => {
       // if(user.role === 'user' ) {
      //    throw new Error("You are not Allowed to login");
      //  }
     // }
   // ],
    /**
     * Prevent non admin user from upgrading their role.
     */
    beforeOperation: [
        async ({args, operation, context}: {args: any; operation: string; context: CustomContext}) => {
            if (operation === 'create' || operation === 'update') {
              if (args.data?.role === 'admin') {
                if (!args.req.user || args.req.user.role !== 'admin') {
                  args.data.role = 'user';
                  /**
                   * Show error using context and passing to after error.
                   */
                  context.customError = {
                    type: 'role',
                    message: 'You are not allowed to assign admin role',
                  };
                  throw new Error("You are Not admin")
                }
              }
            }
            return args;
          },
      ],
    /**
     * Stop creating account with spam emails
     */
    beforeValidate: [
      async ({ data }) => {
          if (data?.email?.endsWith("@spam.com")) {
            throw new Error("Spam emails are not allowed");
          }
          return data;
        },
      ],
      /**
       * final data transformation preventing from upgrading role and reverting to old role
       * similar to before operation but this is final form
       */
      beforeChange: [
        ({ data, originalDoc, req }) => {
          if (req.user?.role !== 'admin' && data.role !== originalDoc?.role) {
            return {
              ...data,
              role: originalDoc?.role || 'user', 
            }
          }
          return data;
        },
      ],
      /**
       * Log error to console after Error is occured
       */
      afterError: [
          async ({error, context}: {error: Error; context: CustomContext;}) => {
            if (context.customError) {
                return {
                  response: {
                    ...error,
                    message: context.customError.message,
                    type: context.customError.type,
                  },
                  status: 400,
                };
              }
            return {
              response: {
                ...error,
                message: "A custom error occurred. Please contact support.",
              },
              status: 500,
            };
          }
        ]
  }
};