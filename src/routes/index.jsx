// This is created for index route.
/* 
When we load up the app, you'll notice a big blank page on the right side of the
list.


To solve this, when a route has children and you are at the parent's path, 
the <Outlet> has nothing to render because no children match. You can think of
index routes as the default child route to fill in that space.
*/

export default function Index() {
    return (
        <p id=" zero-state">
            This is to test route index.
            <br />
            Check out{" "}

            <a href="https: //reactrouter.com">
                the docs at reactrouter.com
            </a>
            .
        </p>
    )
}