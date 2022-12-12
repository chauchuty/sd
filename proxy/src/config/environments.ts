const environments = {
    development: {
        api: {
            server: {
                websocket: {
                    host: '10.20.8.112',
                    port: 22000
                },
            },
            client: {
                socket: {
                    host: '10.20.8.112',
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
                    host: '10.20.8.112',
                    port: 22000
                },
            }
            
        }
    }
}

export default environments.production // Development or Production