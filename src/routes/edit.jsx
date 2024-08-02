
import {
  Form,
  useLoaderData, // used to reload data after an action may be delete action or other.
  redirect,  // used to wire up the form displayed when edit btn is clicked to the action  
  useNavigate  // added to be able to use the cancel button and navigate to the other page we wil redirect to.
} from "react-router-dom";

import { updateContact } from "../contacts";


// Adding an action to the edit module
export async function action({ request, params }) {
  const formData = await request.formData();

  // Setting the requests to be sent to actions instead.
  // const firstName = formData.get("first");
  // const lastName = formData.get("last")

  const updates = Object.fromEntries(formData);  //

  // Setting the requests to be sent to actions instead.
  updates.first;  //Some
  updates.last;  // Name

  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);

}



export default function EditContact() {
  const { contact } = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact?.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact?.last}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact?.twitter}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact?.avatar}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact?.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"    // Here we are not using the preventDefault because the type of the button is button and it is the html's way to prevent to submit defaults.
          onClick={() => {
            navigate(-1)
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}