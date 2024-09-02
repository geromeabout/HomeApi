document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav a")) {
        return;
    }
    e.preventDefault();
    route();
})

const routes = {
    404: {
        template: "/error.html",
        title: "404",
        description: "Page not found"
    },
    "/": {
        template: "/home.html",
        title: "Home",
        description: "Home Page",
    },
    "/todos": {
        template: "/todo.html",
        title:"To dos",
        description: "To-Do List",
    },
    "/movies": {
        template: "/movies.html",
        title:"Movies",
        description: "Latest movies",
    },
    "/music": {
        template: "/music.html",
        title:"Music",
        description: "Vibe",
    },
};

const route = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    locationHandler();
};

const locationHandler = async () => {
    const location = window.location.pathname; // get the url path
    // if the path length is 0, set it to primary page route
    if (location.length == 0) {
        location = "/";
    }
    // get the route object from the urlRoutes object
    const route = routes[location] || routes["404"];
    // get the html from the template
    const html = await fetch(route.template).then((response) => response.text());
    // set the content of the content div to the html
    document.getElementById("content").innerHTML = html;
    // set the title of the document to the title of the route
    document.title = route.title;
    // set the description of the document to the description of the route
    document
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
};

// add an event listener to the window that watches for url changes
window.onpopstate = locationHandler;
// call the urlLocationHandler function to handle the initial url
window.route = route;
// call the urlLocationHandler function to handle the initial url
locationHandler();