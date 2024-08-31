document.addEventListener("click", (e) => {
    const { target } = e;
    if (!target.matches("nav e")) {
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
    }
}

const route = (event) => {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
    localHandler();
}