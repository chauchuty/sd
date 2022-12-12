import { useContext, useEffect, useState } from "react"
import ProtocolRequest from "../../model/protocol.request"
import { AppContext } from "../../provider/app.provider"

type ChatProps = {
    ra: string
}

function ChatComponent(props: ChatProps) {
    const context = useContext(AppContext)

    useEffect(() => {
        context.chat = []
    }, [])

    const submitMessage = (event: any) => {
        if (event.key === 'Enter' && event.target.value !== '') {
            context.chat.push({isMine: true, message: event.target.value})
            const request = new ProtocolRequest('chat', { mensagem: event.target.value.trim(), ra: props.ra});
            event.target.value = ''
            context.socket.emit(request.toJson())
        }
    }

    return (
        <>
            <div className="modal fade show" id="exampleModal" tabIndex={-1} style={{ display: 'block' }}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Chat</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="card">

                                <div id="chat-body" style={{ height: '250' }} className="card-body">

                                    <div className="row text-white text-center">
                                        {/* <div className="col-6">
                                            <div className="bg-secondary p-2 rounded">
                                                This is some text within a card body.
                                            </div>
                                        </div> */}
                                        {
                                            context.chat &&
                                            context.chat.map((e: any, index: number) => {
                                                return (
                                                    <div className={`col-6 ${e.isMine && 'offset-6'} mt-1`} key={index}>
                                                        <div className={`bg-${e.isMine ? 'success' : 'secondary'} p-1 rounded`}>
                                                            {e.message}
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="input-group input-group-sm mb-2 mt-2">
                                <span className="input-group-text" id="basic-addon1">Mensagem:</span>
                                <input onKeyDown={submitMessage} type="text" className="form-control shadow-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatComponent