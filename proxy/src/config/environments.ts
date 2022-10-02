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
                    host: '51.81.87.67',
                    port: 8082
                },
            }
            
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

export default environments.development // Development or Production