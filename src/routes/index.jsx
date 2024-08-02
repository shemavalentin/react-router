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
            <strong> <h2> Welcome to our Universe Cutting-edge
            Web Dev Technologies</h2></strong>
            <br />
            Check out {" "}

            <a href="https://catetecblog.netlify.app/">
                our portfolio at catetecblog.netlify.app
            </a>
            .
        </p>
    )
}