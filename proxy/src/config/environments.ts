const environments = {
    development: {
        api: {
            server: {
                websocket: {
                    host: 'localhost',
                    port: 8081
                },
            },
            client: {
                socket: {
                    host: 'localhost',
                    port: 8082
                },
            }
            
        }
    },

    production: {
        api: {
            server: {
                websocket: {
                    host: 'localhost',
                    port: 8081
                },
            },
            client: {
                socket: {
                    host: '51.81.87.67',
                    port: 8099
                },
            }
            
        }
    }
}

export default environments.production // Development or Production