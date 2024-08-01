
// Creating a destroy module to delete a record from contacts

import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

// seting an action

export async function action({ params }) {
    await deleteContact(params.contactId);
    return redirect("/")
}

// ....going to route config(main.js) to add the destroy route