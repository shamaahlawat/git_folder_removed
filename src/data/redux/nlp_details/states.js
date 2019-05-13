const states = {
    nlp_details: {
        intents: [],
        entities: [],
        loaders: {
            intents_loading: false,
            intents_loaded: false,
            entities_loading: false,
            entities_loaded: false,
            intents_updating: false,
            intents_updated: false,
        }
    },
};

export default states;