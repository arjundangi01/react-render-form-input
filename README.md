react-render-form-input

A highly flexible and reusable React component for rendering form inputs dynamically using react-hook-form. This package helps simplify form management by reducing boilerplate code and enabling easy configuration of various input types.

🚀 Features

Dynamic Input Rendering – Supports multiple field types (input, textarea, file, phone, etc.).

Fully Compatible with react-hook-form – Works seamlessly with form validation and control.

Customizable & Scalable – Configure fields dynamically using fieldConfig.

Supports Nested Fields – Works with deeply nested form structures.

TypeScript Support – Provides strong type safety with FieldValues.

📦 Installation

Install via npm or yarn:

npm install react-render-form-input

or

yarn add react-render-form-input

🛠️ Usage

1. Setup useForm

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputWrapper } from "react-render-form-input";
import \* as z from "zod";

// Define schema using Zod (optional)
const formSchema = z.object({
name: z.string().min(1, "Name is required"),
email: z.string().email("Invalid email"),
});

export default function MyForm() {
const form = useForm({
resolver: zodResolver(formSchema),
mode: "onChange",
defaultValues: { name: "", email: "" },
});

return (

<form onSubmit={form.handleSubmit((data) => console.log(data))}>
<FormInputWrapper
form={form}
name="name"
fieldConfig={{
          fieldVariant: "input",
          label: "Full Name",
          name: "name",
          placeHolder: "Enter your name",
        }}
/>

      <FormInputWrapper
        form={form}
        name="email"
        fieldConfig={{
          fieldVariant: "input",
          label: "Email",
          name: "email",
          placeHolder: "Enter your email",
        }}
      />

      <button type="submit">Submit</button>
    </form>

);
}

📌 Props

FormInputWrapper<TData extends FieldValues>

Prop

Type

Description

form

UseFormReturn<TData>

Instance of react-hook-form to control fields.

name

Path<TData>

Name of the form field.

fieldConfig

FormInputFields<TData>

Configuration object for rendering the input.

🎛 Supported Field Types

input – Standard text input

textArea – Multi-line input

singleFileInput – File upload input

phoneInput – Phone number input

More types can be extended easily!

📜 License

MIT License.

🛠 Contributions & Support

Contributions are welcome! Feel free to open an issue or PR on GitHub.

For support, contact [your email or Discord].

This package is designed to simplify form handling in React projects by reducing repetitive form input boilerplate. 🚀
