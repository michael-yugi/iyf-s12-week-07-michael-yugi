const createStore = (initialState) => {
    let state = initialState;
    const listeners = [];

    return {
        getState: () => state,

        setState: (updates) => {
            state = { ...state, ...updates };
            listeners.forEach((listener) => listener(state));
        },

        subscribe: (listener) => {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                listeners.splice(index, 1);
            };
        },
    };
};

const store = createStore({ count: 0 });

const unsubscribe = store.subscribe((state) => {
    console.log("State changed:", state);
});

store.setState({ count: 1 }); // listener runs
store.setState({ count: 2 }); // listener runs

unsubscribe();

store.setState({ count: 3 }); // nothing prints: we stopped listening