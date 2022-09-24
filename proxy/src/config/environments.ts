const environments = {
    development: {
        api: {
            websocketserver: {
                host: 'localhost',
                port: 8081
            },
            socketclient: {
                host: 'localhost',
                port: 8082
            },
        }
    },

    production: {
        api: {
            websocketserver: {
                host: '51.81.87.67',
                port: 8081
            },
            socketclient: {
                host: '51.81.87.67',
                port: 8082
            },
        }
    }
}

export default environments.production // Development or Production