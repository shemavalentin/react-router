import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  // Throwing a 404 response in the loader, when the user we are looking for doesn't exist
  // this will prevent us not breacking the call stack
  // now .......
  
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: " Not Found ",
    })
  }
  return { contact };
}


/* 
Might want to take a look at that form while we're here. As always, our form has
fields with a name prop. This form will send formData with a favorite key that's
either "true" | "false". Since it's got method="post" it will call the action. 
Since there is no <fetcher.Form action="..."> prop, it will post to the route 
where the form is rendered.

Let's first create the action that will be called
*/

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true"
  })
  
}

export default function Contact() {
  // loading data 
  const { contact } = useLoaderData();

  // const contact = {
  //   first: "Your",
  //   last: "Name",
  //   avatar: "https://robohash.org/you.png?size=200x200",
  //   twitter: "your_handle",
  //   notes: "Some notes",
  //   favorite: true,
  // };

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}

          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"   // this action will help us to delete record
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  //using the useFetcher to communicate to loaders to enable edit without changing the page.
  const fetcher = useFetcher();
  //const favorite = contact.favorite;
  // Using Optimistic UI to update the favorite(star) state with the network latency

  const favorite = fetcher.formData ? fetcher.formData.get("favorite")
    === " true" : contact.favorite;

  return (
    // returning the same page we are on by wrapping the in fetcher.com
    <fetcher.Form method = "post">
    {/* <Form method="post"> */}
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
      {/* </Form> */}
      </fetcher.Form>
  );
}