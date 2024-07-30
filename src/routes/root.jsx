
// Creating the root layout component (the global layout)


// importing Link for Cloud side routing to allow us to update the URL without
// requesting another documrnt from the server. instead, the app can immediately
// render new UI. this is done by using <Link> and removing <a href> to <Link to>

import { Link, Outlet, useLoaderData, Form } from "react-router-dom"; // added useLoaderData to access and render data

// URL segments, layouts, and data are more often than not coupled(tripled).
// because of this natural coupling, React route has data convention to get data into
// our route components.

// using the API: loader
import { getContacts, createContact } from "../contacts"; 

// to avoid creating new user using POST method as is sends request through the body
// let's use GET in form

export async function action() {
    const contact = await createContact();
    return { contact };
}

export async function loader() {
    const contacts = await getContacts();
    return { contacts };

    // after this let's configure the loader on route in the main.js
}

export default function Root() {

    // Accessing data 
    const { contacts } = useLoaderData();
    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts </h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />

                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />

                        <div
                            className=" sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    {/* <form method="post">
                        <button type="submit">New</button> */}
                    <Form method="post">
                        <button type="submit">New</button>

                    </Form>
                </div>


                <nav>

                    {/* displaying data */}

                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                            <li key={contact.id}>
                                <Link to={`contacts/${contact.id}`}>
                                {contact.first || contact.last ? (
                                    <>
                                    {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No Name</i>
                                )} {" "}
                                {contact.favorite && <span>★</span>}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                        )}


                    {/* <ul> */}
                        {/* <li> */}
                            {/* <a href={`/contacts/1`}>Shema Valentin</a> */}
                            {/* <Link to={`/contacts/1`}>Shema Valentin</Link> */}
                        {/* </li> */}

                        {/* <li> */}
                            {/* <Link to ={`/contacts/2`}>My Friends</Link> */}
                        {/* </li> */}
                    {/* </ul> */}
                </nav>
            </div>
            {/* adding <Outlet> in the div to tell the root layout where to display its child */}
            <div id="detail">
                <Outlet/>
            </div>
        </>
    
    );
}