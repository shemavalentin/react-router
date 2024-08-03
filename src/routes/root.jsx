
// Creating the root layout component (the global layout)

import { useEffect } from "react";

// importing Link for Cloud side routing to allow us to update the URL without
// requesting another documrnt from the server. instead, the app can immediately
// render new UI. this is done by using <Link> and removing <a href> to <Link to>

import { Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit } from "react-router-dom"; // added useLoaderData to access and render data

// URL segments, layouts, and data are more often than not coupled(tripled).
// because of this natural coupling, React route has data convention to get data into
// our route components.

// using the API: loader
import { getContacts, createContact } from "../contacts"; 

// to avoid creating new user using POST method as is sends request through the body
// let's use GET in form

export async function action() {
    const contact = await createContact();
    return redirect(`/contacts/${ contact.id }/edit`);
}

export async function loader({request}) {
    // filtering the list if there are URLSearchParams. 
    // And adding them here has a reason:  Because this is a GET, not a POST, React Router does not call the action. Submitting a GET form is the same as clicking a link: only the URL changes. That's why the code we added for filtering is in the loader, not the action of this route.

// This also means it's a normal page navigation. You can click the back button to get back to where you were.
    
    const url = new URL(request.url)
    const q = url.searchParams.get('q');
    const contacts = await getContacts(q);

    // returning the q from the loader and setting it as the search field default value
    return { contacts,q };

    // after this let's configure the loader on route in the main.js
}

export default function Root() { 

    // Accessing data 
    const { contacts, q } = useLoaderData();
    
    const navigation = useNavigation();
    // The useSubmit is the cousin to useNavigation that helps to search by keystroke without
    // submitting the form first hitting Enter key for form submission. the form 
    // is automatically submitted.
    
    const submit = useSubmit();


    // Adding a Search spinner. here I will use the useNavigation hook to fake the
    // network as it could be data comming from the database.
    
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");

    // Synchronizing input value with the URL search param. We can bring in useEffect from React to manipulate the form's state in the DOM directly.
    useEffect(() => {
        document.getElementById('q').value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Routes UI/UX Optimization</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            className={searching ? "Loading" : " "} // showing loading when no data yet
                            // Setting the q as the default value
                            defaultValue={q}

                            // Adding an event handler to handle the search input so that as we type the form is submitted automatically
                            onChange={(event) => {
                                // Unstacking the history stack when back button is clicked
                                const isFirstSearch = q == null; 
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch    // Deciding to replace the search
                                })
                            }}
                        />

                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}  // Hide the spinner no searching 
                        />

                        <div
                            className=" sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
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
                                    
                                {/* <Link to={`contacts/${contact.id}`}>
                                {contact.first || contact.last ? (
                                    <>
                                    {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No Name</i>
                                )} {" "}
                                {contact.favorite && <span>★</span>}
                                </Link> */}
                                    
                                    {/* Using the NavLink to know which record we are on in the sidebar */}
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive ? "active" : isPending
                                            ? "pending" : " "
                                        } 
                                        
                                    >

                                        {contact.first || contact.last ? (
                                    <>
                                    {contact.first} {contact.last}
                                    </>
                                ) : (
                                    <i>No Name</i>
                                )} {" "}
                                {contact.favorite && <span>★</span>}
                                    </NavLink>
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

            <div id="detail"
                
           /* used the hook useNavigation to return the current navigation state
           It can be one of 'idle' | "submitting". It was added to avoid the little 
           unresponsiveness that was happening. the CSS here will show the fade after a 
           short delay
           */
        
            className = {
                navigation.state === 'loading' ? 'loading': " "
            }
            >
                
            {/* adding <Outlet> in the div to tell the root layout where to display its child */}
                <Outlet/>
            </div>
        </>
    
    );
}