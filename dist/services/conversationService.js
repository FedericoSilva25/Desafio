"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const uuid_1 = require("uuid");
class ConversationService {
    constructor() {
        this.conversations = new Map();
    }
    createThread() {
        const threadId = (0, uuid_1.v4)();
        this.conversations.set(threadId, {
            id: threadId,
            messages: [],
            currentAgent: 'destination' // Comenzamos con el experto en destinos
        });
        return threadId;
    }
    addMessage(threadId, message) {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        thread.messages.push(message);
    }
    getThread(threadId) {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        return thread;
    }
    switchAgent(threadId, agent) {
        const thread = this.conversations.get(threadId);
        if (!thread) {
            throw new Error('Hilo de conversación no encontrado');
        }
        thread.currentAgent = agent;
    }
}
exports.ConversationService = ConversationService;
